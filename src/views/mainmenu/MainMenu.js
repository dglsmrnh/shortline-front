import React, { useState, useRef } from "react";
import NewQueueModal from "src/components/custom/NewQueueModal/NewQueueModal";

import { QRCodeCanvas } from "qrcode.react";
 
import theme from "src/components/global/theme";
import swal from "sweetalert";

import CIcon from "@coreui/icons-react";
import { cilHamburgerMenu } from "@coreui/icons";
import { CModal, CContainer, CButton, CCard, CCardBody, CCardHeader, CCardText, CCardTitle } from "@coreui/react";
import { CChart } from "@coreui/react-chartjs";

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
  let [isCompany, setIsCompany] = useState(localStorage.getItem("isCompany") === "true"); //Vem do backend
  let [modalVisible, setModalVisible] = useState(false);
  let [queue, setQueue] = useState(getQueue());
  let [reserveInfo, setReserveInfo] = useState(
    {
      name: "Giuseppe Kadura",
      queue: 3,
      posicao: 4
    }
  )
  let queueLocal = getQueue();

  function getQueue() {
    if(localStorage.getItem("queue") !== undefined && localStorage.getItem("queue") !== null){
      return JSON.parse(localStorage.getItem("queue"));
    } else if (localStorage.getItem("idQueue") !== undefined && localStorage.getItem("idQueue") !== null){
      var headers = new Headers();
      headers.append("Content-Type", "application/json");

      
      fetch("http://shortline-app.herokuapp.com/queues/" + localStorage.getItem("idQueue"),{
        method: 'GET',
        headers: headers
      })
      .then((res) => {
          if(res.ok) {
            res.json().then(jsonQueue => {

            })
            
          }
      }).catch((e) => {
        console.log(e)
      }).finally (() => {
        console.log("terminou GET queues")
      })
    }

    return {peopleAmount: 0, active: false};
  }

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
    if(localStorage.getItem("username") != null)
      window.location.href = '/#/queue';
    else
      window.location.href = '/#/';
  }

  function handleCloseQueueClick() {
    let tempQueue = queue;
    tempQueue.peopleAmount = 0;
    tempQueue.active = false;
    queueLocal = tempQueue;
    localStorage.removeItem("queue");
    setQueue(tempQueue);
    window.location.reload(true);
  }

  const saveNewQueue = async (maxAmount) => {
    if(maxAmount <= 0 || !maxAmount) {
      swal("Erro", "Insira um tamanho máximo válido", "error");
    } else if (localStorage.getItem(isCompany) === 'false') {
      swal("Erro", "Usuário consumidor tentando criar uma fila nova", "error");
    }
    else {
      setModalVisible(false);

      var headers = new Headers();
      headers.append("Content-Type", "application/json");

      await fetch("http://shortline-app.herokuapp.com/queues",{
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          "maxSize": maxAmount,
          "idCompany": localStorage.getItem("idCompany") 
        })
      }).then((res) => {
          if(res.ok) {
            res.json().then(jsonj => {
              localStorage.setItem("idQueue", jsonj.id)
              console.log(jsonj)
              localStorage.setItem("queue", JSON.stringify({
                active: true,
                peopleAmount: 0,
                maxAmount: maxAmount,
                maxSize: maxAmount,
                idCompany: localStorage.getItem("idCompany") 
              }));
              setQueue({
                active: true,
                peopleAmount: 0,
                maxAmount: maxAmount,
                maxSize: maxAmount,
                idCompany: localStorage.getItem("idCompany") 
              })
            }) 
            
          }
      }).catch((e) => {
        console.log(e)
      }).finally (() => {
        console.log("terminou")
      })
    }
  }

  if (localStorage.getItem("username") === null || localStorage.getItem("username") === undefined){
    window.location.href = '/';
  } else if (localStorage.getItem("isCompany") === "true") {
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
                <CCardText style={{fontSize: '20px', marginBottom: '5px'}}>• Sua fila está <b>{queueLocal.active ? "aberta" : "fechada"}</b></CCardText>
                <CCardText style={{marginLeft: '15px', marginBottom: '5px', fontSize: '14px', opacity: '0.7'}}>{queueLocal.active ? ("Há " + queueLocal.peopleAmount + (queueLocal.peopleAmount !== 1 ? " grupos na fila" : " grupo na fila")) : ("Clique no botão para abrir a fila")}</CCardText>
                <CCardText style={{marginLeft: '15px', marginBottom: '5px', fontSize: '14px', opacity: '0.7'}}>{queueLocal.active ? ("A capacidade máxima é de " + queueLocal.maxAmount + " grupos") : ""}</CCardText>
                <CCardText style={{marginLeft: '15px', marginBottom: '5px', fontSize: '14px', opacity: '0.7'}}>{(!queueLocal.active && queueLocal.peopleAmount >= 1) ? ("Ainda há " + queueLocal.peopleAmount + (queueLocal.peopleAmount !== 1 ? " grupos na fila" : " grupo na fila")) : ""}</CCardText>
              </CCardBody>
              {!queueLocal.active ?
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
          <CContainer onClick={handleIconClick} style={{fontFamily: 'Poppins', width: '90vw', height: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <CButton color="success" style={{height: '12%', width: '90%', margin: '15px'}}>
              Entrar em uma fila/ver a fila atual
            </CButton>
            <CButton color="success" style={{height: '12%', width: '90%', margin: '15px'}}>
              Histórico
            </CButton>
          </CContainer>
      </CContainer>
    </div>
    )
  }

}

export default MainMenu;
