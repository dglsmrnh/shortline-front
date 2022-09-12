import React, { useState } from "react";

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
  ChartsContainer,
  Chart,
  Button,
  UserButtonsContainer
} from "./styles.ts";
import QueueItem from '../../../components/custom/QueueItem/QueueItem';

import theme from "src/components/global/theme";

const MainMenu = () => {

  let [isCompany, setIsCompany] = useState(false);
  let queueList = [ //Vem do backend
      {
        title: 'Fila 1',
        people: 3
    },
      {
        title: 'Fila 2',
        people: 0
    }
  ];

  function handleIconClick() {
    if(isCompany) {
      setIsCompany(false);
    }
    else {
      setIsCompany(true);
    }
  }

  if(isCompany) {
    return(
      <div>
        <Container>
          <Header>
            <MainIcon ></MainIcon>
            <Title>ShortLine</Title>
            <UserIcon onClick={handleIconClick}></UserIcon>
          </Header>
          <Body>
            <QueueListContainer>
              <ListTitle>Minhas filas</ListTitle>
              <QueueInsideList>
                {queueList.map((element, i) => {
                  return(
                    <QueueItem key={element.title} title={element.title} people={element.people}></QueueItem>
                  )
                })}
              </QueueInsideList>
              <Button>Nova fila</Button>
            </QueueListContainer>
            <ChartsContainer>
              <Chart
                width={530}
                height={300}
                labels="Meses"
                type="bar"
                data={{
                  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                  datasets: [
                    {
                      label: 'Pessoas atendidas',
                      backgroundColor: theme.colors.primaryLight,
                      data: [40, 20, 12, 39, 10, 40, 39, 80, 40],
                    }
                  ]
                }}></Chart>
              <Chart
                width={530}
                height={300}
                type="bar"
                data={{
                  labels: ["Janeiro", "Fevereiro", "Março", "Abril"],
                  datasets: [
                    {
                      label: 'Ótimo',
                      backgroundColor: '#41B883',
                      data: [40, 20, 80, 10],
                    },
                    {
                      label: 'Bom',
                      backgroundColor: '#E46651',
                      data: [30, 50, 10, 60]
                    },
                    {
                      label: 'Regular',
                      backgroundColor: '#00D8FF',
                      data: [40, 70, 10, 80]
                    },
                    {
                      label: 'Ruim',
                      backgroundColor: '#DD1B16',
                      data: [10, 10, 10, 10]
                    }
                  ],
                }}></Chart>
            </ChartsContainer>
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
          <UserIcon onClick={handleIconClick}></UserIcon>
        </Header>
          <UserButtonsContainer>
            <Button>
              Entrar em uma fila/ver a fila atual
            </Button>
            <Button>
              Histórico
            </Button>
          </UserButtonsContainer>
      </Container>
    </div>
    )
  }

}

export default MainMenu
