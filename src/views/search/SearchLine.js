import React, {useState, useRef} from 'react'
import {
  CButton,
  CCard,
  CCardHeader,
  CCardBody,
  CCol,
  CForm,
  CFormInput,
  CAlert,
  CInputGroup,
  CInputGroupText,
  CRow,
  CContainer,
  CCardText,
  CCardTitle,
  CCardSubtitle,
  CCardGroup
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import Map from '../../components/custom/Map/Map';
import { cilCalendar, cilListNumbered, cilLockLocked, cilMap, cilPhone, cilUser , cilArrowLeft} from '@coreui/icons'
import { QRCodeCanvas } from "qrcode.react";


const Range = () => {

  const isCompany = sessionStorage.getItem("userType");
  const [validated, setValidated] = useState(false);
  const [visibleAlert, setAlert] = useState(false);
  const [hasReserve, setHasReserve] = useState("default");
  const [reserves, setReserves] = useState([]);


  let retry = 0;

  function handleSubmit(e) {
    const data = e.currentTarget;

    if(data.checkValidity() === false) {
      e.stopPropagation();
    }
    e.preventDefault();

    setValidated(true);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const address = data.local.value;
    const numberOfPeople = data.numberOfPeople?.value;

    fetchQueue(address, myHeaders, numberOfPeople);
  }

  function fetchQueue(address, myHeaders, numberOfPeople){
    fetch("http://shortline-app.herokuapp.com/queues?address=" + address, {
      method: 'GET',
      headers: myHeaders
    })
    .then(res => {
      if(res.ok) {
        res.json().then(jsonQueue => {
          let body = JSON.stringify({
            idQueue: jsonQueue.id,
            idUser: localStorage.getItem("userId"),
            numberOfPeople: numberOfPeople
          })
          fetchReserve(body, myHeaders)
        })
      }
    })
    .catch(() => {
      if(retry < 1) {
        retry += 1;
        fetchQueue(address, myHeaders, numberOfPeople)
      } else {
        retry = 0;
      }
    }).finally(() => {
      console.log("buscou queue");
    })
  }

  function fetchReserve(body, myHeaders) {
    fetch("http://shortline-app.herokuapp.com/reserves", {
      method: 'POST',
      body: body,
      headers: myHeaders
    })
    .then(res => {
      if(res.ok) {
        window.location.href = "/#/mainmenu"
      }
    })
    .catch(() => {
      if(retry < 2){
        retry += 1;
        fetchReserve(body, myHeaders)
      } else {
        retry = 0;
      }
    }).finally(() => {
      console.log("finalizou reserva");
    })
  }

  function getReserve(){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    fetch("http://shortline-app.herokuapp.com/reserves?pending=false&has_reserve_search_logic=true&username="+localStorage.getItem("username"), {
      method: 'GET',
      headers: myHeaders
    })
    .then(res => {
      if(res.ok && hasReserve === "default") {
        res.json().then(jsonReserve => {
          setReserves(jsonReserve)
          setHasReserve(true)
        })
      } else if (hasReserve === "default") {
        setHasReserve(false)
      }
    })
    .catch(() => {
      if(retry < 2){
        retry += 1;
        getReserve();
      } else {
        retry = 0;
      }
    }).finally(() => {
      console.log("buscou reserva");
    })
  }

  function cancelReserve(){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let body = reserves.find(e => e !== null);
    body.status = "O";

    fetch("http://shortline-app.herokuapp.com/reserves/"+body.id, {
      method: 'PUT',
      headers: myHeaders,
      body: JSON.stringify(body)
    })
    .then(res => {
      if(res.ok) {
        setReserves([])
      }
    })
    .catch(() => {
      if(retry < 2){
        retry += 1;
        cancelReserve();
      } else {
        retry = 0;
      }
    }).finally(() => {
      console.log("cancelou reserva");
    })
  }

  function handleGoBack() {
    window.location.href = "/#/mainmenu";
  }


  const downloadQRCode = (e) => {
    e.preventDefault();
    let canvas = qrRef.current.querySelector("canvas");
    let image = canvas.toDataURL("image/png");
    let anchor = document.createElement("a");
    anchor.href = image;
    anchor.download = `qr-code.png`;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  const qrRef = useRef();

  const qrcode = (
    <QRCodeCanvas
      id="qrCode"
      value={reserves !== [] ? JSON.stringify(reserves.find(e => e !== null)) : JSON.stringify({id: 1})}
      size={250}
      level={"H"}
      includeMargin = {true}
    />
   );

  getReserve()
  if(hasReserve === "default") {
    return (
      <CContainer style={{width: '100%', height: '100%'}}>
      </CContainer>
    );
  }
  else if(hasReserve){
    return (
    <CContainer style={{width: '100%', height: '100%'}}>
      <CContainer style={{fontFamily: 'Poppins', display: 'flex', flexDirection: 'row', alignContent: "center", justifyContent: 'center'}}>
        <CCard style={{width: '42vw', height: '70vh'}}>
          <CCardHeader>
            <CCardGroup style={{justifyContent: 'space-between'}}>
              <CCardTitle style={{fontSize: "24px", fontWeight: "bold", marginBottom: "10px"}}>Minha Reserva Ativa</CCardTitle>
              <CCardGroup>
                <CIcon onClick={handleGoBack}  style={{border: '1px solid #000', alignContent: 'flex-end', marginTop: '10px', cursor: 'pointer'}} icon={cilArrowLeft} height={36} width={36} size="custom-size"></CIcon>
              </CCardGroup>
            </CCardGroup>
            <CCardGroup>
              <CCardSubtitle>Informações</CCardSubtitle>
            </CCardGroup>
          </CCardHeader>
          <CCardBody style={{overflow: "scroll", paddingTop: "22px", border: '1px'}}>
            {
              reserves.length > 0 ? reserves.map((item, i) => {
                return (
                  <CContainer key={item.id} style={{border: '5px'}}>

                    <CCardHeader style={{maxHeight: '50vh'}}>
                      <CCardGroup style={{justifyContent: 'space-between', paddingTop: "15px"}}>
                        <CCardText>Estabelecimento: {item.nameCompany}</CCardText>
                        |
                        <CCardText>Numero de pessoas na mesa: {item.numberOfPeople}</CCardText>
                        |
                        <CCardText>Situação: {item.situation}</CCardText>
                      </CCardGroup>
                      <CCardGroup style={{justifyContent: 'space-between', paddingTop: "2px"}}>
                        <CCardText>Solicitado em: {item.registerIn}</CCardText>
                      </CCardGroup>

                      <CCardGroup style={{justifyContent: 'space-between', paddingTop: "20px"}}>
                        <CCardText>Check-In: { item.checkIn !== null && item.checkIn !== undefined ? item.checkIn : "Não realizado" }</CCardText>
                      </CCardGroup>

                      <CCardGroup style={{justifyContent: 'space-between', paddingTop: "10px"}}>
                        <CCardText style={{paddingTop: "10px"}}>Check-Out: { item.checkOut !== null && item.checkOut !== undefined ? item.checkOut : "Não realizado" }</CCardText>
                        <CButton onClick={cancelReserve} style={{color:"danger"}}>Cancelar Reserva</CButton>
                      </CCardGroup>

                    </CCardHeader>
                    <CContainer style={{display: "flex", justifyContent: "space-between"}}>
                      <CContainer>
                        <CContainer style={{display: 'flex', flexDirection: 'row', alignContent: "center", justifyContent: 'center'}}>
                          <CCardGroup>
                            <CCardText style={{paddingTop: "10px", fontSize: '90px'}}>{item.code}</CCardText>
                          </CCardGroup>
                        </CContainer>
                        <CContainer style={{display: 'flex', flexDirection: 'row', alignContent: "center", justifyContent: 'center'}}>
                          <CCardGroup>
                            <CCardText style={{paddingTop: "10px", fontSize: '30px'}}>{item.code !== undefined ? "Posição na fila" : "Fora da fila"}</CCardText>
                          </CCardGroup>
                        </CContainer>
                      </CContainer>
                      <CContainer style={{display: 'flex', flexDirection: 'row', alignContent: "center", justifyContent: 'center'}}>
                        { true ?
                          <CContainer style={{alignContent: "center", justifyContent: 'center'}}>
                            <CContainer ref={qrRef}>{qrcode}</CContainer>
                            <CContainer style={{marginLeft: '35px'}}>
                                <CButton variant="outline" onClick={downloadQRCode}>
                                  Download QR code
                                </CButton>
                            </CContainer>
                          </CContainer> : ""
                        }
                      </CContainer>
                    </CContainer>
                </CContainer>
                )
              }) : <CCardText style={{textAlign: "center", fontFamily: "Poppins", fontSize: "24px", marginTop: "13px", marginBottom: "25px", opacity: "70%"}}>Sem Reservas</CCardText>
            }
          </CCardBody>
        </CCard>
      </CContainer>
     </CContainer>
    );
  } else {
    return (
      <CRow className="justify-content-center">
        <CCol md={9} lg={7} xl={6}>
          <CCard className="mx-4">
            <CCardHeader>
              <strong>Procurar seu estabelecimento</strong>
            </CCardHeader>
            <CCardBody className="p-4">
            <CAlert color="warning" visible={visibleAlert} onClose={() => setAlert(false)}>
              Estabelecimento não está em funcionamento.
            </CAlert>
            <CForm className="needs-validation" noValidate validated={validated} onSubmit={handleSubmit}>
              <CInputGroup className="mb-3">
                <CInputGroupText>
                  <CIcon icon={cilListNumbered} />
                </CInputGroupText>
                <CFormInput name='numberOfPeople' type='Number' required placeholder="Número de pessoas na mesa" autoComplete="username" feedbackInvalid="Por favor, informe um número de pessoas."/>
              </CInputGroup>
              <CInputGroup className="mb-3">
                <CInputGroupText>
                  <CIcon icon={cilMap} />
                </CInputGroupText>
                <CFormInput name="local" id="map-autocomplete" placeholder="Selecione o endereço do estabelecimento" autoComplete="username" required feedbackInvalid="Por favor, informe um endereço."/>
              </CInputGroup>
              <div className="mb-3">
                <Map id="map" height="400px"></Map>
              </div>
              <div className="d-grid">
                <CButton color="success" type="submit">Fazer reserva</CButton>
              </div>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    )
  }
}

export default Range
