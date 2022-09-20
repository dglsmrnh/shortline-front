import React, { useState, useRef } from "react";
import { Link } from 'react-router-dom'
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
  Modal,
  QrCodeContainer,
  GenerateQrContainer,
  DownloadQrCodeButton,
  CardText
} from "./styles.ts";

import { CButton, CCard, CCardBody, CCardTitle, CCardSubtitle,
  CCardLink, CCardText
} from "@coreui/react";
import QueueItem from '../../components/custom/QueueItem/QueueItem';
import NewQueueModal from "src/components/custom/NewQueueModal/NewQueueModal";

import { QRCodeCanvas } from "qrcode.react";
 
import theme from "src/components/global/theme";
import swal from "sweetalert";

const MainMenu = () => {

  const downloadQRCode = (e) => {
    e.preventDefault();
    let canvas = qrRef.current.querySelector("canvas");
    let image = canvas.toDataURL("image/png");
    let anchor = document.createElement("a");
    anchor.href = image;
    anchor.download = `qr-code.png`;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };
  
  const qrRef = useRef();

  const qrcode = (
    <QRCodeCanvas
      id="qrCode"
      value={JSON.stringify(() => reserveInfo)}
      size={250}
      level={"H"}
      includeMargin = {true}
    />
   ); 
  
  let [isInfoEnable, setIsInfoEnable] = useState(false); //Vem do backend
  let [isCompany, setIsCompany] = useState(false); //Vem do backend
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
  let [reserveInfo, setReserveInfo] = useState(
    {
      name: "Giuseppe Kadura",
      queue: 3,
      posicao: 4
    }
  )

  function handleIconClick() {
    if(isCompany) {
      setIsCompany(false);
    }
    else {
      setIsCompany(true);
    }
  }

  function handleNewQueueClick() {
    setModalVisible(true);
  }


  const saveNewQueue = (newQueue) => {
    console.log(newQueue);
    if(!newQueue.name || newQueue.name.trim() === '') {
      swal("Erro", "Insira um nome para a nova fila", "error");
    }
    else if(newQueue.maxAmount <= 0 || !newQueue.maxAmount) {
      swal("Erro", "Insira uma quantidade máxima válida", "error");
    }
    else if(newQueue.openingDate < Date.now() || !newQueue.openingDate) {
      swal("Erro", "Insira uma data de abertura válida", "error");
    }
    else if(newQueue.closingDate < Date.now() || !newQueue.closingDate || newQueue.closingDate < newQueue.openingDate) {
      swal("Erro", "Insira uma data de fechamento válida", "error");
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
                    <Link to="/queue" key={element}>
                      <QueueItem name={element.name} people={element.peopleOnIt}></QueueItem>
                    </Link>
                    
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
        
        {isInfoEnable &&
          <QrCodeContainer>
            <CCard style={{ width: '18rem' }}>
              <GenerateQrContainer ref={qrRef}>{qrcode}</GenerateQrContainer>
              <CCardBody>
                <CCardTitle>Reserva</CCardTitle>
                <CCardSubtitle className="mb-2 text-medium-emphasis">Informações</CCardSubtitle>
                
                <CardText>Nome: {reserveInfo.name}</CardText>
                <CardText>Fila: {reserveInfo.queue}</CardText>
                <CardText>Posição: {reserveInfo.posicao}</CardText>
                
                <GenerateQrContainer class="mx-auto">
                  <Button variant="outline" onClick={downloadQRCode}>
                    Download QR code
                  </Button>
                </GenerateQrContainer>
              </CCardBody>
            </CCard>
          </QrCodeContainer>
        }

        <UserButtonsContainer>
          <Button onClick={() => setIsInfoEnable(true)}>
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
