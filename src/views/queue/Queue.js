import React, { useEffect, useState } from "react";

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
import CIcon from "@coreui/icons-react";
import { cilArrowLeft } from "@coreui/icons";

const Queue = () => {

  let [isActive, setIsActive] = useState(true);
  let [queueMembers, setQueueMembers] = useState([]);
  let [acceptedMembers, setAcceptedMembers] = useState([]);
  let [pendingMembers, setPendingMembers] = useState([]);

  var headers = new Headers();
  headers.append("Content-Type", "application/json");

  function loadQueue() {

    if(localStorage.getItem("queueMembers") != null) {
      fetch("http://shortline-app.herokuapp.com/reserves?username=" + localStorage.getItem("username") + "&is_company=true",{
        method: 'GET',
        headers: headers
      })
      .then((res) => {
          if(res.ok) {
            res.json().then(jsonQueue => {
              console.log(jsonQueue);
              let auxAccepted = 0;
              let auxPending = 0;

              setQueueMembers(jsonQueue);
              localStorage.setItem("queueMembers", JSON.stringify(jsonQueue));

              for(let i = 0; i < jsonQueue.length; i++) {
                if(jsonQueue[i].status === 'P') {
                  auxPending++;
                }
                else if(jsonQueue[i].status === 'A') {
                  auxAccepted++;
                }
              }
              setAcceptedMembers(auxAccepted);
              setPendingMembers(auxPending);
            })
          }
      }).catch((e) => {
        console.log(e)
      }).finally (() => {
        console.log("terminou GET loadQueue()")
      })
    }
    else {
      setQueueMembers(JSON.parse(localStorage.getItem("queueMembers")));
      console.log("queueMembers carregado do localStorage");
      console.log(queueMembers);
    }
  }

  useEffect(function() {
    loadQueue();
  }, [])

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
        let auxAccepted = 0;
        let auxPending = 0;
        let tempQueueMembers = queueMembers;
        tempQueueMembers.splice(tempQueueMembers.indexOf(element), 1);
        element.status = 'O';
        tempQueueMembers.push(element);
        setQueueMembers(tempQueueMembers);
        localStorage.setItem("queueMembers", JSON.stringify(queueMembers));

        for(let i = 0; i < queueMembers.length; i++) {
          if(queueMembers[i].status === 'P') {
            auxPending++;
          }
          else if(queueMembers[i].status === 'A') {
            auxAccepted++;
          }
        }
        setAcceptedMembers(auxAccepted);
        setPendingMembers(auxPending);

        fetch("http://shortline-app.herokuapp.com/reserves/" + element.id,{
          method: 'PUT',
          headers: headers,
          body: JSON.stringify(element)
        })
        .then((res) => {
            if(res.ok) {
              res.json().then(json => {
                console.log(json);
              })
              console.log('Removido')
            }
        }).catch((e) => {
          console.log(e)
        }).finally (() => {
          console.log("terminou UPDATE queueMembers")
        })
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
        let auxAccepted = 0;
        let auxPending = 0;
        let tempQueueMembers = queueMembers;
        tempQueueMembers.splice(tempQueueMembers.indexOf(element), 1);
        element.status = 'O';
        tempQueueMembers.push(element);
        setQueueMembers(tempQueueMembers);
        localStorage.setItem("queueMembers", JSON.stringify(queueMembers));

        for(let i = 0; i < queueMembers.length; i++) {
          if(queueMembers[i].status === 'P') {
            auxPending++;
          }
          else if(queueMembers[i].status === 'A') {
            auxAccepted++;
          }
        }

        fetch("http://shortline-app.herokuapp.com/reserves/" + element.id,{
          method: 'PUT',
          headers: headers,
          body: JSON.stringify(element)
        })
        .then((res) => {
            if(res.ok) {
              console.log('Removido')
            }
        }).catch((e) => {
          console.log(e)
        }).finally (() => {
          console.log("terminou UPDATE queueMembers")
        })
      }
    })
  }

  function acceptClientRequest(element) {
    let auxAccepted = 0;
    let auxPending = 0;
    let tempQueueMembers = queueMembers;
    console.log(tempQueueMembers);
    tempQueueMembers.splice(tempQueueMembers.indexOf(element), 1);
    console.log('Apos splice');
    console.log(tempQueueMembers);
    element.status = 'A';
    tempQueueMembers.push(element);
    console.log('Apos push');
    console.log(tempQueueMembers);
    setQueueMembers(tempQueueMembers);
    localStorage.setItem("queueMembers", JSON.stringify(queueMembers));

    for(let i = 0; i < queueMembers.length; i++) {
      if(queueMembers[i].status === 'P') {
        auxPending++;
      }
      else if(queueMembers[i].status === 'A') {
        auxAccepted++;
      }
    }

    fetch("http://shortline-app.herokuapp.com/reserves/" + element.id,{
      method: 'PUT',
      headers: headers,
      body: JSON.stringify(element)
    })
    .then((res) => {
        if(res.ok) {
          console.log('Removido')
        }
    }).catch((e) => {
      console.log(e)
    }).finally (() => {
      console.log("terminou UPDATE queueMembers")
    })
  }

  function redirectScan() {
    window.location.href = '/#/scan';
  }

  function closeQueue() {
    setIsActive(false);
  }

  function openQueue() {
    setIsActive(true);
  }

  function handleGoBack() {
    window.location.href = '/#/home';
  }

  return(
    <CContainer style={{width: '100%', height: '100%'}}>
      <CContainer style={{fontFamily: 'Poppins', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
        <CIcon onClick={handleGoBack} style={{border: '1px solid #000', marginRight: '10px'}} icon={cilArrowLeft} height={36} width={36} size="custom-size"></CIcon>
        <CCard style={{width: '42vw', height: '60vh', display: 'flex', flexDirection: 'column'}}>
          <CCardHeader>
            <CCardTitle style={{fontSize: "24px", fontWeight: "bold", marginBottom: "10px"}}>Minha fila</CCardTitle>
            <CCardSubtitle>Há {acceptedMembers + (acceptedMembers === 1 ? " grupo na fila" : " grupos na fila")} </CCardSubtitle>
          </CCardHeader>
          <CCardBody style={{overflow: "scroll", paddingTop: "0px"}}>
            {
              queueMembers.length > 0 ? queueMembers.map((element, i) => {
                if(element.status === "A") {
                  return(
                    <ClientItem onClickRemove={() => removeClientFromQueue(element)} key={element.id} name={element.user} numberOfPeople={element.numberOfPeople}></ClientItem>
                  )
                }
              }) : <CCardText style={{textAlign: "center", fontFamily: "Poppins", fontSize: "24px", marginTop: "13px", marginBottom: "25px", opacity: "70%"}}>Fila vazia</CCardText>
            }
          </CCardBody>
        </CCard>
        <CContainer style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", width: "42vw", height: "60vh"}}>
          <CCard style={{width: "100%", height: "30vh"}}>
            <CCardHeader>
              <CCardTitle style={{fontSize: "24px", fontWeight: "bold", marginBottom: "10px"}}>Requisições</CCardTitle>
              <CCardSubtitle>Há {pendingMembers + (pendingMembers === 1 ? " grupo solicitando entrada" : " grupos solicitando entrada")} </CCardSubtitle>
            </CCardHeader>
            <CCardBody style={{overflow: "scroll", paddingTop: "0px"}}>
              {
                queueMembers.length > 0 ? queueMembers.map((element, i) => {
                  if(element.status === "P") {
                    return(
                      <RequestItem onClickRefuse={() => removeClientRequest(element)} onClickAccept={() => acceptClientRequest(element)} key={element.id} name={element.user} numberOfPeople={element.numberOfPeople}></RequestItem>
                    )
                  }
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
