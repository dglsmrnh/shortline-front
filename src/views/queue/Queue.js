import React, { useState } from "react";

import {
  CContainer,
  CCardText,
  CCard,
  CButton,
  CCardHeader,
  CCardTitle,
  CCardSubtitle,
  CCardBody
} from "@coreui/react";

import ClientItem from '../../components/custom/ClientItem/ClientItem';
import RequestItem from "../../components/custom/RequestItem/RequestItem";
import swal from "sweetalert";

const Queue = () => {

  let [clientList, setClientList] = useState([
    {
      name: "Maria",
      peopleAmount: 3
    },
    {
      name: "João",
      peopleAmount: 2
    },
    {
      name: "Carlos",
      peopleAmount: 5
    },
    {
      name: "Pedro",
      peopleAmount: 1
    }
  ]);

  let [waitingList, setWaitingList] = useState([
    {
      name: "Julia",
      peopleAmount: 4
    },
    {
      name: "Ana",
      peopleAmount: 8
    },
    {
      name: "Leonardo",
      peopleAmount: 4
    }
  ])

  let [isActive, setIsActive] = useState(true);

  function removeClientFromQueue(element) {
    swal({
      title: "Aviso",
      text: "Tem certeza que quer remover este grupo?",
      icon: "warning",
      buttons: [
        "Sim, remover",
        "Cancelar"
      ],
      dangerMode: true
    }).then(function(isConfirm) {
      if(!isConfirm) {
        if(clientList.length === 1) {
          setClientList([]);
        }
        else {
          setClientList(clientList.filter(value => value !== element));
        }
      }
    })
  }

  function removeClientRequest(element) {
    swal({
      title: "Aviso",
      text: "Tem certeza que quer remover este grupo?",
      icon: "warning",
      buttons: [
        "Sim, remover",
        "Cancelar"
      ],
      dangerMode: true
    }).then(function(isConfirm) {
      if(!isConfirm) {
        if(waitingList.length === 1) {
          setWaitingList([]);
        }
        else {
          setWaitingList(waitingList.filter(value => value !== element));
        }
      }
    })
  }

  function acceptClientRequest(element) {
    setWaitingList(waitingList.filter(value => value !== element));
    setClientList([...clientList,element]);
  }

  function redirectScan() {

  }

  function closeQueue() {
    setIsActive(false);
  }

  function openQueue() {
    setIsActive(true);
  }

  return(
    <CContainer style={{width: '100%', height: '100%'}}>
      <CContainer style={{fontFamily: 'Poppins', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
        <CCard style={{width: '42vw', height: '60vh', display: 'flex', flexDirection: 'column'}}>
          <CCardHeader>
            <CCardTitle style={{fontSize: "24px", fontWeight: "bold", marginBottom: "10px"}}>Minha fila</CCardTitle>
            <CCardSubtitle>Há {clientList.length + (clientList.length === 1 ? " grupo na fila" : " grupos na fila")} </CCardSubtitle>
          </CCardHeader>
          <CCardBody style={{overflow: "scroll", paddingTop: "0px"}}>
            {
              clientList.length > 0 ? clientList.map((element, i) => {
                return(
                  <ClientItem onClickRemove={() => removeClientFromQueue(element)} key={element.name} name={element.name} people={element.peopleAmount}></ClientItem>
                )
              }) : <CCardText style={{textAlign: "center", fontFamily: "Poppins", fontSize: "24px", marginTop: "13px", marginBottom: "25px", opacity: "70%"}}>Fila vazia</CCardText>
            }
          </CCardBody>
        </CCard>
        <CContainer style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", width: "42vw", height: "60vh"}}>
          <CCard style={{width: "100%", height: "30vh"}}>
            <CCardHeader>
              {}
              <CCardTitle style={{fontSize: "24px", fontWeight: "bold", marginBottom: "10px"}}>Requisições</CCardTitle>
              <CCardSubtitle>Há {waitingList.length + (waitingList.length === 1 ? " grupo solicitando entrada" : " grupos solicitando entrada")} </CCardSubtitle>
            </CCardHeader>
            <CCardBody style={{overflow: "scroll", paddingTop: "0px"}}>
              {
                waitingList.length > 0 ? waitingList.map((element) => {
                  return(
                    <RequestItem onClickRefuse={() => removeClientRequest(element)} onClickAccept={() => acceptClientRequest(element)} key={element} name={element.name} people={element.peopleAmount}></RequestItem>
                  )
                }) : <CCardText style={{textAlign: "center", fontFamily: "Poppins", fontSize: "24px", marginTop: "13px", marginBottom: "25px", opacity: "70%"}}>Sem requisições</CCardText>
              }
            </CCardBody>
          </CCard>
          <CButton style={{height: "6vh", width: "90%", alignItems: "flex-start"}} color="success" onClick={redirectScan}>Escanear QRCode</CButton>
          {isActive ?
          <CButton style={{height: "6vh", marginBottom: "20px", width: "90%", alignItems: "flex-start"}} color="danger" onClick={closeQueue}>Fechar fila</CButton> :
          <CButton style={{height: "6vh", marginBottom: "20px", width: "90%", alignItems: "flex-start"}} color="outline" onClick={openQueue}>Abrir fila</CButton>
        }
        </CContainer>
      </CContainer>
    </CContainer>
  )
}

export default Queue;
