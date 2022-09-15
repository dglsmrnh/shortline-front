import React, { useState } from "react";

import {
  Container,
  Header,
  MainIcon,
  Title,
  UserIcon,
  ListTitle,
  QueueInsideList,
  Body,
  QueueContainer,
  RightSideContainer,
  RequestsContainer,
  CloseButton,
  DeleteButton
} from "./styles.ts";

import ClientItem from '../../../components/custom/ClientItem/ClientItem';

const Queue = () => {
  let [clientList, setClientList] = useState([
    {
      name: "Maria",
      peopleAmount: 3
    },
    {
      name: "João",
      peopleAmount: 2
    }
  ]);

  function removeClientFromQueue(element) {
    setClientList(clientList.splice(clientList.indexOf(element),1));
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
          <ListTitle>{"{Nome da fila}"}</ListTitle>
          <QueueInsideList>
                {clientList.map((element, i) => {
                  return(
                    <ClientItem onClickRemove={(element) => removeClientFromQueue(element)} key={element.name} name={element.name} people={element.peopleAmount}></ClientItem>
                  )
                })}
              </QueueInsideList>
        </QueueContainer>
        <RightSideContainer>
          <RequestsContainer>
          </RequestsContainer>
          <CloseButton></CloseButton>
          <DeleteButton></DeleteButton>
        </RightSideContainer>
      </Body>
    </Container>
  )
}

export default Queue;
