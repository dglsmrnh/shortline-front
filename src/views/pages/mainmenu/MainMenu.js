import React from "react";

import {
  Container,
  Header,
  MainIcon,
  Title,
  UserIcon,
  Body,
  QueueList
} from "./styles.ts";
import QueueItem from '../../../components/custom/QueueItem/QueueItem';

const MainMenu = () => {
  let isCompany; //Vem do backend
  let queueList = [ //Vem do backend
      {
        name: 'Fila 1',
        people: 3
    },
      {
        name: 'Fila 2',
        people: 0
    }
  ]

  if(isCompany) {
    return(
      <Container>
        <Header>
          <MainIcon></MainIcon>
          <Title>ShortLine</Title>
          <UserIcon></UserIcon>
        </Header>
        <Body>
          <QueueList>
            {queueList.forEach(element => {
              <>
                <QueueItem title={element.title} people={element.people}></QueueItem>
              </>
            })}
          </QueueList>
        </Body>
      </Container>
    )
  }
  else {
    return(
      <Container></Container>
    )
  }

}

export default MainMenu
