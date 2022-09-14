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
  UserButtonsContainer,
  Modal
} from "./styles.ts";
import QueueItem from '../../../components/custom/QueueItem/QueueItem';
import NewQueueModal from "src/components/custom/NewQueueModal/NewQueueModal";

import theme from "src/components/global/theme";
import swal from "sweetalert";

const MainMenu = () => {

  let [isCompany, setIsCompany] = useState(false);
  let [modalVisible, setModalVisible] = useState(false);
  let [queueList, setQueueList] = useState([ //Vem do backend
      {
        name: 'Fila 1',
        peopleOnIt: 3
    },
      {
        name: 'Fila 2',
        peopleOnIt: 0
    }
  ]);

  function handleIconClick() {
    if(isCompany) {
      setIsCompany(false);
    }
    else {
      setIsCompany(true);
    }
  }

  function handleSelectQueueClick(){
    window.location.href = ""
  }

  function handleNewQueueClick() {
    setModalVisible(true);
  }

  const saveNewQueue = (newQueue) => {
    console.log(newQueue);
    if(newQueue.name.trim() === '') {
      swal("Insira um nome para a nova fila");
    }
    else if(newQueue.maxAmount <= 0) {
      swal("Insira uma quantidade máxima válida");
    }
    else if(newQueue.openingDate < Date.now()) {
      swal("Insira uma data de abertura válida");
    }
    else if(newQueue.closingDate < Date.now() || newQueue.closingDate < newQueue.openingDate) {
      swal("Insira uma data de fechamento válida");
    }
    else {
      setModalVisible(false);
      setQueueList([...queueList, newQueue]);
    }

  }

  if(isCompany) {
    return(
      <div>
        <Container>
          <Header>
            <MainIcon></MainIcon>
            <Title>ShortLine</Title>
            <UserIcon onClick={handleIconClick}></UserIcon>
          </Header>
          <Body>
            <QueueListContainer>
              <ListTitle>Minhas filas</ListTitle>
              <QueueInsideList>
                {queueList.map((element, i) => {
                  return(
                    <QueueItem onClick={handleSelectQueueClick} key={element.title} name={element.name} people={element.peopleOnIt}></QueueItem>
                  )
                })}
              </QueueInsideList>
              <Button onClick={handleNewQueueClick}>Nova fila</Button>
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
          <Modal visible={modalVisible} onClose={() => setModalVisible(false)}>
            <NewQueueModal saveNewQueue={saveNewQueue} closeModal={() => setModalVisible(false)}>
            </NewQueueModal>
          </Modal>
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
