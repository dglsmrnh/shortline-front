import React, { useState } from "react";
import { Link } from 'react-router-dom';
import {
  Header,
  MainIcon,
  Title,
  UserIcon,
  Button,
  UserButtonsContainer,
  Modal,
} from "./styles.ts";
import NewQueueModal from "src/components/custom/NewQueueModal/NewQueueModal";

import theme from "src/components/global/theme";
import swal from "sweetalert";

import CIcon from "@coreui/icons-react";
import { cilHamburgerMenu } from "@coreui/icons";
import { CContainer, CButton, CCard, CCardBody, CCardHeader, CCardText, CCardTitle } from "@coreui/react";
import { CChart } from "@coreui/react-chartjs";

const MainMenu = () => {

  let [isCompany, setIsCompany] = useState(false); //Vem do backend
  let [modalVisible, setModalVisible] = useState(false);
  let [activeQueue, setActiveQueue] = useState(false);

  const queuePeopleAmount = 5;

  function handleIconClick() {
    if(isCompany) {
      setIsCompany(false);
    }
    else {
      setIsCompany(true);
    }
  }

  function handleNewQueueClick() {
    setActiveQueue(true);
    setModalVisible(true);
  }

  function handleCloseQueueClick() {
    setActiveQueue(false);
  }

  if(isCompany) {
    return(
      <div>
        <CContainer style={{  width: '100%', height: '100%', maxWidth: '1000px'}}>
          <CContainer style={{fontFamily: 'Poppins', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <CCard style={{width: '45%'}}>
              <CCardHeader style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                <CIcon style={{marginRight: '10px'}} icon={cilHamburgerMenu} height="36" width="36" size="custom-size"></CIcon>
                <CCardTitle style={{margin: '0px', fontFamily: 'Poppins', fontSize: '24px'}}>Minha fila</CCardTitle>
              </CCardHeader>
              <CCardBody style={{paddingLeft: '30px', paddingRight: '30px', paddingTop: '20px', paddingBottom: '20px'}}>
                <CCardText style={{fontSize: '20px', marginBottom: '5px'}}>• Sua fila está <b>{activeQueue ? "aberta" : "fechada"}</b></CCardText>
                <CCardText style={{marginLeft: '15px', fontSize: '14px', opacity: '0.7'}}>{activeQueue ? ("Há " + queuePeopleAmount + (queuePeopleAmount > 1 ? " pessoas na fila" : " pessoa na fila")) : ("Clique no botão para abrir a fila")}</CCardText>
              </CCardBody>
              {!activeQueue ?
              <CButton style={{margin: '10px'}} color='success' onClick={handleNewQueueClick}>Abrir fila</CButton> :
              <CCard style={{borderColor: '#FFF'}}>
                <CButton style={{margin: '10px'}} color='success'>Escanear QRCode</CButton>
                <Link style={{display: 'inline-block'}} to="/queue"><CButton style={{margin: '10px'}} color='danger' onClick={handleCloseQueueClick}>Fechar fila</CButton></Link>
              </CCard>
              }
            </CCard>
            <CCard  style={{width: '45%'}}>
              <CCardBody>
                <CChart
                  height={window.innerHeight * 0.22}
                  width={window.innerWidth * 0.20}
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
                  }}></CChart>
                <CChart
                  height={window.innerHeight * 0.22}
                  width={window.innerWidth * 0.20}
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
                  }}></CChart>
              </CCardBody>
            </CCard>
          </CContainer>
          <Modal visible={modalVisible} onClose={() => setModalVisible(false)}>
            <NewQueueModal closeModal={() => setModalVisible(false)}>
            </NewQueueModal>
          </Modal>
        </CContainer>
      </div>
    )
  }
  else {
    return(
      <div>
      <CContainer style={{  width: '100%', height: '100%', maxWidth: '1000px'}}>
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
      </CContainer>
    </div>
    )
  }

}

export default MainMenu
