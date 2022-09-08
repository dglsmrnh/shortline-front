import React from "react";

import {
  Container,
  Header,
  MainIcon,
  Title,
  UserIcon,
  Body,
  QueueListContainer,
  ListTitle,
  QueueInsideList,
  Graphic,
  Button
} from "./styles.ts";
import QueueItem from '../../../components/custom/QueueItem/QueueItem';

import theme from "src/components/global/theme";

const MainMenu = () => {
  let isCompany = true; //Vem do backend
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
  const btnTheme = {
    '--cui-btn-bg': theme.colors.button
  }

  if(isCompany) {
    return(
      <div>
        <Container>
          <Header>
            <MainIcon ></MainIcon>
            <Title>ShortLine</Title>
            <UserIcon></UserIcon>
          </Header>
          <Body>
            <QueueListContainer>
              <ListTitle>Minhas filas</ListTitle>
              <QueueInsideList>
                <QueueItem title={queueList[0].name} people={queueList[0].people}></QueueItem>
              </QueueInsideList>
              <Button style={btnTheme}>Nova fila</Button>
            </QueueListContainer>
            <Graphic></Graphic>
          </Body>
        </Container>
      </div>

    )
  }
  else {
    return(
      <div>
      <Container>
        <Header>
          <MainIcon ></MainIcon>
          <Title>ShortLine</Title>
          <UserIcon></UserIcon>
        </Header>
        <Body>
          <Button>
            Entrar em uma fila/ver a fila atual
          </Button>
          <Button>
            Histórico
          </Button>
        </Body>
      </Container>
    </div>
    )
  }

}

export default MainMenu
