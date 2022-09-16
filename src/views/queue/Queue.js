import React, { useState } from "react";

import {
  Container,
  Header,
  MainIcon,
  Title,
  UserIcon,
  TitleContainer,
  ListTitle,
  SubTitle,
  QueueInsideList,
  Body,
  QueueContainer,
  RightSideContainer,
  RequestsContainer,
  Placeholder,
  RightButton
} from "./styles.ts";

import ClientItem from '../../components/custom/ClientItem/ClientItem';
import RequestItem from "../../components/custom/RequestItem/RequestItem";

const Queue = () => {
  let queueInfo = {
    opening: new Date('2022-09-16T15:30:00'),
    closing: new Date('2022-09-16T16:30:00')
  };
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
    <Container>
      <Header>
        <MainIcon></MainIcon>
        <Title>ShortLine</Title>
        <UserIcon></UserIcon>
      </Header>
      <Body>
        <QueueContainer>
          <TitleContainer>
            <ListTitle>{"{Nome da fila}"}</ListTitle>
            <SubTitle>{queueInfo.opening.toLocaleString("pt-BR")} - {queueInfo.closing.toLocaleString("pt-BR")}</SubTitle>
          </TitleContainer>
            <QueueInsideList>
              {
                clientList.length > 0 ? clientList.map((element, i) => {
                  return(
                    <ClientItem onClickRemove={() => removeClientFromQueue(element)} onClickCall={() => callClientFromQueue(element)} key={element.name} name={element.name} people={element.peopleAmount}></ClientItem>
                  )
                }) : <Placeholder>Fila vazia</Placeholder>
              }
            </QueueInsideList>
        </QueueContainer>
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
      </Body>
    </Container>
  )
}

export default Queue;
