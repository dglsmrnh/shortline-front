import React, {useState} from 'react'
import {
  CContainer,
  CCardText,
  CCard,
  CButton,
  CCardHeader,
  CCardTitle,
  CCardSubtitle,
  CCardBody,
  CCardGroup
} from '@coreui/react'
import { cilArrowLeft } from "@coreui/icons";
import CIcon from '@coreui/icons-react'
import { cilCalendar, cilListNumbered, cilLockLocked, cilMap, cilPhone, cilUser } from '@coreui/icons'

const History = () => {

  const [validated, setValidated] = useState(false);
  const [visibleAlert, setAlert] = useState(false);
  const [reserves, setReserves] = useState([]);


  let retry = 0;

  function handleSubmit() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    fetchReserve(myHeaders)
    return false;
  }

  function fetchReserve(myHeaders) {
    fetch("http://shortline-app.herokuapp.com/reserves?pending=false&username="+localStorage.getItem("username"), {
      method: 'GET',
      headers: myHeaders
    })
    .then(res => {
      if(res.ok) {
        res.json().then(jsonReserves => {
            setReserves(jsonReserves);
        })
      }
    })
    .catch(() => {
      if(retry < 2){
        retry += 1;
        fetchReserve(myHeaders)
      } 
    }).finally(() => {
      console.log("buscou reservas");
    })
  }

  function handleReserves(){
    return reserves.length > 0 || handleSubmit(); 
  }

  function handleGoBack() {
    window.location.href = "/#/mainmenu";
  }

  return (
    handleReserves() &&
    <CContainer style={{width: '100%', height: '100%'}}>
    <CContainer style={{fontFamily: 'Poppins', display: 'flex', flexDirection: 'row', alignContent: "center", justifyContent: 'center'}}>
      <CCard style={{width: '42vw', height: '60vh'}}>
        <CCardHeader>
          <CCardGroup style={{justifyContent: 'space-between'}}>
            <CCardTitle style={{fontSize: "24px", fontWeight: "bold", marginBottom: "10px"}}>Historico de Reservas</CCardTitle>
            <CCardGroup>
              <CIcon onClick={handleGoBack}  style={{border: '1px solid #000', alignContent: 'flex-end', marginTop: '10px', cursor: 'pointer'}} icon={cilArrowLeft} height={36} width={36} size="custom-size"></CIcon>
            </CCardGroup>
          </CCardGroup>
          <CCardGroup>
            <CCardSubtitle>{reserves.length + (reserves.length == 1 ? " reserva" : " reservas")} </CCardSubtitle>
          </CCardGroup>
        </CCardHeader>
        <CCardBody style={{overflow: "scroll", paddingTop: "22px"}}>
          {
            reserves.length > 0 ? reserves.map((item, i) => {
              return (
                  <CCardHeader key={item.id} style={{maxHeight: '30vh'}}>
                    <CCardGroup style={{justifyContent: 'space-between', paddingTop: "15px"}}>
                      <CCardText>Estabelecimento: {item.nameCompany}</CCardText>
                      |
                      <CCardText>Numero de pessoas na mesa: {item.numberOfPeople}</CCardText>
                      |
                      <CCardText>Situação: {item.situation}</CCardText>
                    </CCardGroup>
                  </CCardHeader>
              )
            }) : <CCardText style={{textAlign: "center", fontFamily: "Poppins", fontSize: "24px", marginTop: "13px", marginBottom: "25px", opacity: "70%"}}>Historico vazio</CCardText>                
          }
        </CCardBody>
      </CCard>
     </CContainer>
     </CContainer> 
    )
}

export default History
