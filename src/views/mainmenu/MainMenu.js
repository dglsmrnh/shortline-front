import React, { useState } from "react";
import NewQueueModal from "src/components/custom/NewQueueModal/NewQueueModal";

import theme from "src/components/global/theme";
import swal from "sweetalert";

import CIcon from "@coreui/icons-react";
import { cilHamburgerMenu } from "@coreui/icons";
import { CModal, CContainer, CButton, CCard, CCardBody, CCardHeader, CCardText, CCardTitle } from "@coreui/react";
import { CChart } from "@coreui/react-chartjs";

const MainMenu = () => {

  let [isCompany, setIsCompany] = useState(false); //Vem do backend
  let [modalVisible, setModalVisible] = useState(false);
  let [queue, setQueue] = useState({peopleAmount: 0, active: false});

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

  function handleManageQueueClick() {
    window.location.href = '/#/queue';
  }

  function handleCloseQueueClick() {
    let tempQueue = queue;
    tempQueue.active = false;
    setQueue(tempQueue);
  }

  const saveNewQueue = (maxAmount) => {
    if(maxAmount <= 0 || !maxAmount) {
      swal("Erro", "Insira um tamanho máximo válido", "error");
    }
    else {
      setModalVisible(false);
      let tempQueue = queue;
      tempQueue.maxAmount = maxAmount;
      tempQueue.active = true;
      setQueue(tempQueue);
    }
  }

  if(isCompany) {
    return(
      <div>
        <CContainer style={{  width: '100%', height: '100%', maxWidth: '1000px'}}>
          <CContainer style={{fontFamily: 'Poppins', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <CCard style={{width: '45%'}}>
              <CCardHeader style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                <CIcon style={{marginRight: '10px'}} icon={cilHamburgerMenu} height={36} width={36} size="custom-size"></CIcon>
                <CCardTitle style={{margin: '0px', fontFamily: 'Poppins', fontSize: '24px'}}>Minha fila</CCardTitle>
              </CCardHeader>
              <CCardBody style={{paddingLeft: '30px', paddingRight: '30px', paddingTop: '20px', paddingBottom: '20px'}}>
                <CCardText style={{fontSize: '20px', marginBottom: '5px'}}>• Sua fila está <b>{queue.active ? "aberta" : "fechada"}</b></CCardText>
                <CCardText style={{marginLeft: '15px', marginBottom: '5px', fontSize: '14px', opacity: '0.7'}}>{queue.active ? ("Há " + queue.peopleAmount + (queue.peopleAmount !== 1 ? " grupos na fila" : " grupo na fila")) : ("Clique no botão para abrir a fila")}</CCardText>
                <CCardText style={{marginLeft: '15px', marginBottom: '5px', fontSize: '14px', opacity: '0.7'}}>{queue.active ? ("A capacidade máxima é de " + queue.maxAmount + " grupos") : ""}</CCardText>
                <CCardText style={{marginLeft: '15px', marginBottom: '5px', fontSize: '14px', opacity: '0.7'}}>{(!queue.active && queue.peopleAmount >= 1) ? ("Ainda há " + queue.peopleAmount + (queue.peopleAmount !== 1 ? " grupos na fila" : " grupo na fila")) : ""}</CCardText>
              </CCardBody>
              {!queue.active ?
              <CButton style={{height: "6vh", margin: '10px'}} color='success' onClick={handleNewQueueClick}>Abrir fila</CButton> :
              <CCard style={{borderColor: '#FFF'}}>
                <CButton style={{height: "6vh", margin: '10px'}} color='success' onClick={handleManageQueueClick}>Gerenciar fila</CButton>
                <CButton style={{height: "6vh", margin: '10px'}} color='danger' onClick={handleCloseQueueClick}>Fechar fila</CButton>
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
          <CModal visible={modalVisible} onClose={() => setModalVisible(false)}>
            <NewQueueModal saveNewQueue={saveNewQueue} closeModal={() => setModalVisible(false)}>
            </NewQueueModal>
          </CModal>
        </CContainer>
      </div>
    )
  }
  else {
    return(
      <div>
      <CContainer style={{width: '100%', height: '100%', maxWidth: '1000px'}}>
          <CContainer style={{fontFamily: 'Poppins', width: '90vw', height: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <CButton color="success" style={{height: '12%', width: '90%', margin: '15px'}}>
              Entrar em uma fila/ver a fila atual
            </CButton>
            <CButton color="success" style={{height: '12%', width: '90%', margin: '15px'}}>
              Histórico
            </CButton>
          </CContainer>
          <CIcon style={{marginRight: '10px'}} icon={cilHamburgerMenu} onClick={handleIconClick} height={36} width={36} size="custom-size"></CIcon>
      </CContainer>
    </div>
    )
  }

}

export default MainMenu;
