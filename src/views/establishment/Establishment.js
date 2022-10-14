import React, { useState } from "react";

import {
  EnterButton
} from './styles.ts';

import { CContainer, CCard, CCardHeader, CCardText, CCardBody, CImage, CButton } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilBurger, cilArrowLeft } from "@coreui/icons";

const Establishment = () => {
  let [queueInfo, setQueueInfo] = useState({ //Vem do backend
    averageTimePerPerson: 12,
    peopleAmount: 3
  });

  function enterQueue() {
    //Enviar informações para o backend
    window.location.href = ''; //Mandar para a tela de fila atual do usuário
  }

  function goBack() {
    window.location.href = ''; //Mandar para a tela de pesquisa de estabelecimentos
  }

  return (
    <CContainer style={{height: "100%", width: "100%"}}>
      <CContainer style={{display: "inline-block", marginBottom: "10px", width: "auto", backgroundColor: "white", border: "1px solid rgba(0,0,0,0.3)"}}>
        <CIcon onClick={goBack} icon={cilArrowLeft} width={35} height={35}></CIcon>
      </CContainer>
      <CCard>
        <CCardHeader style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
          <CIcon icon={cilBurger} width={25} height={25} style={{marginRight: "10px"}}></CIcon>
          <CCardText style={{fontFamily: "Poppins", fontSize: "20px"}}>The Burger Mountain</CCardText>
        </CCardHeader>
        <CCardBody>
          <CCardText style={{opacity: "80%", fontFamily: "Poppins", fontSize: "16px"}}>{queueInfo.peopleAmount} {queueInfo.peopleAmount === 1 ? "pessoa" : "pessoas"}</CCardText>
          <CCardText style={{opacity: "80%", fontFamily: "Poppins", fontSize: "12px"}}>Cerca de {queueInfo.averageTimePerPerson * queueInfo.peopleAmount} minutos de espera</CCardText>
          <CCardText style={{opacity: "80%", fontFamily: "Poppins", fontSize: "12px"}}>Fecha às 23:00</CCardText>
        </CCardBody>
        <CContainer style={{display: "inline-block", height: "10%", textAlign: "center"}}>
          <CButton color="success" onClick={enterQueue} style={{width: "95%", margin: "10px 0px"}}>Entrar</CButton>
        </CContainer>
      </CCard>
    </CContainer>
  )
}

export default Establishment;
