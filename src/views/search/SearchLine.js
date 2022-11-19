import React, {useState} from 'react'
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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilCalendar, cilListNumbered, cilLockLocked, cilMap, cilPhone, cilUser } from '@coreui/icons'
import Map from '../../components/custom/Map/Map';

const Range = () => {

  const isCompany = sessionStorage.getItem("userType");
  const [validated, setValidated] = useState(false);
  const [visibleAlert, setAlert] = useState(false);

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

    try{
      fetchQueue(address, myHeaders, numberOfPeople);
    } catch(e) {
      fetchQueue(address, myHeaders, numberOfPeople);
    }
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
      } 
    }).finally(() => {
      console.log("finalizou reserva");
    })
  }

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

export default Range
