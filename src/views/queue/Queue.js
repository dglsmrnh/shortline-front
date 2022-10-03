import React, { useState } from "react";

import {
  TitleContainer,
  ListTitle,
  SubTitle,
  QueueInsideList,
  QueueContainer,
  RightSideContainer,
  RequestsContainer,
  Placeholder,
  RightButton
} from "./styles.ts";

import {
  CContainer,
  CImage,
  CCardText,
  CCard,
  CButton,
  CCardHeader,
  CCardTitle,
  CCardSubtitle
} from "@coreui/react";

import theme from "src/components/global/theme";
import iconPng from '../../assets/images/iconpng.png';
import avatar7 from '../../assets/images/avatars/7.jpg';

import ClientItem from '../../components/custom/ClientItem/ClientItem';
import RequestItem from "../../components/custom/RequestItem/RequestItem";

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

  function removeClientFromQueue(element) {
    if(clientList.length === 1) {
      setClientList([]);
    }
    else {
      setClientList(clientList.filter(value => value !== element));
    }
  }

  function callClientFromQueue(element) {
    if(clientList.length === 1) {
      setClientList([]);
    }
    else {
      setClientList(clientList.filter(value => value !== element));
    }
  }

  function removeClientRequest(element) {
    if(waitingList.length === 1) {
      setWaitingList([]);
    }
    else {
      setWaitingList(waitingList.filter(value => value !== element));
    }
  }

  function acceptClientRequest(element) {
    setWaitingList(waitingList.filter(value => value !== element));
    setClientList([...clientList,element]);
  }

  return(
    <CContainer style={{width: '100%', height: '100%'}}>
      <CContainer style={{fontFamily: 'Poppins', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
        <CCard style={{width: '42vw', height: '60vh', display: 'flex', flexDirection: 'column'}}>
          <CCardHeader>
            <CCardTitle>Minha fila</CCardTitle>
            <CCardSubtitle>Há {clientList.length + (clientList.length === 1 ? " pessoa na fila" : " pessoas na fila")} </CCardSubtitle>
          </CCardHeader>
          <QueueInsideList>
            {
              clientList.length > 0 ? clientList.map((element, i) => {
                return(
                  <ClientItem onClickRemove={() => removeClientFromQueue(element)} onClickCall={() => callClientFromQueue(element)} key={element.name} name={element.name} people={element.peopleAmount}></ClientItem>
                )
              }) : <Placeholder>Fila vazia</Placeholder>
            }
          </QueueInsideList>
        </CCard>
        <RightSideContainer>
          <RequestsContainer>
            <ListTitle>Requisições</ListTitle>
            <QueueInsideList>
              {
                waitingList.length > 0 ? waitingList.map((element) => {
                  return(
                    <RequestItem onClickRefuse={() => removeClientRequest(element)} onClickAccept={() => acceptClientRequest(element)} key={element} name={element.name} people={element.peopleAmount}></RequestItem>
                  )
                }) : <Placeholder>Sem requisições</Placeholder>
              }
            </QueueInsideList>
          </RequestsContainer>
          <RightButton color="light">Fechar fila</RightButton>
          <RightButton color="danger">Deletar fila</RightButton>
        </RightSideContainer>
      </CContainer>
    </CContainer>
  )
}

export default Queue;
