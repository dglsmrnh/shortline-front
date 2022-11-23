import React, {useState} from "react";

import { CContainer } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilArrowLeft } from "@coreui/icons";

import { QrReader } from "react-qr-reader";
import swal from "sweetalert";

const Scan = () => {

  let [pendingRead, setPendingRead] = useState(true);

  function handleGoBack() {
    window.location.href = '/#/queue';
  }

  if(pendingRead) {
    return (
      <CContainer style={{display: "flex", justifyContent: "space-between"}}>
        <CIcon onClick={handleGoBack} style={{border: '1px solid #000', marginRight: '10px'}} icon={cilArrowLeft} height={36} width={36} size="custom-size"></CIcon>
        <CContainer >
          <QrReader videoStyle={{height: "50%"}}
            onResult={(result, error) => {
              if (!!result) {
                console.log('1');
                const reserveId = JSON.parse(result?.text).id;
                let reserve = {};

                var headers = new Headers();
                headers.append("Content-Type", "application/json");

                fetch("http://shortline-app.herokuapp.com/reserves/" + reserveId,{
                  method: 'GET',
                  headers: headers,
                })
                .then((res) => {
                    if(res.ok) {
                      res.json().then(json => {
                      setPendingRead(false);
                      reserve = json;
                        console.log(reserve);
                        console.log("Reserva GET OK");
                        reserve.status = "O";

                        fetch("http://shortline-app.herokuapp.com/reserves/" + reserveId,{
                          method: 'PUT',
                          headers: headers,
                          body: JSON.stringify(reserve)
                        })
                        .then((res) => {
                            if(res.ok) {
                              console.log('QRCode consumido');
                              swal('Sucesso', 'Usuário escaneado com sucesso. Você será redirecionado(a) para a tela de gerenciamento', 'success');
                              setInterval(function() {
                                window.location.href = '/#/queue';
                              }, 3500)
                            }
                            else {
                              swal('Erro', 'Houve um erro ao ler seu QRCode', 'failure');
                            }
                        }).catch((e) => {
                          swal('Erro', 'Houve um erro ao ler seu QRCode', 'failure');
                          console.log(e)
                        })

                      })
                    }
                    else {
                      swal('Erro', 'Houve um erro ao ler seu QRCode', 'failure');
                    }
                }).catch((e) => {
                  swal('Erro', 'Houve um erro ao ler seu QRCode', 'failure');
                  console.log(e);
                })


              }
            }}
          />
        </CContainer>
      </CContainer>
    )
  }
  else {
    return (
      <CContainer style={{display: "flex", justifyContent: "space-between"}}>
        <CIcon onClick={handleGoBack} style={{border: '1px solid #000', marginRight: '10px'}} icon={cilArrowLeft} height={36} width={36} size="custom-size"></CIcon>
        <CContainer >
        </CContainer>
      </CContainer>
    )
  }

}

export default Scan;
