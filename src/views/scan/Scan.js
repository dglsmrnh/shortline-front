import React from "react";

import { CContainer } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilArrowLeft } from "@coreui/icons";

import { QrReader } from "react-qr-reader";

const Scan = () => {

  function handleGoBack() {
    window.location.href = '/#/queue';
  }

  return (
    <CContainer style={{display: "flex", justifyContent: "space-between"}}>
      <CIcon onClick={handleGoBack} style={{border: '1px solid #000', marginRight: '10px'}} icon={cilArrowLeft} height={36} width={36} size="custom-size"></CIcon>
      <CContainer >
        <QrReader videoStyle={{height: "50%"}}
          onResult={(result, error) => {
            if (!!result) {
              const reserveId =  result?.text;
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
                      reserve = json;
                      console.log("Reserva GET OK");
                      console.log(reserve);
                    })
                  }
              }).catch((e) => {
                console.log(e);
              })

              reserve.status = "O";

              fetch("http://shortline-app.herokuapp.com/reserves/" + reserveId,{
                method: 'PUT',
                headers: headers,
                body: JSON.stringify(reserve)
              })
              .then((res) => {
                  if(res.ok) {
                    console.log('QRCode consumido')
                  }
              }).catch((e) => {
                console.log(e)
              })
            }

            if (!!error) {
              console.info(error);
            }
          }}
        />
      </CContainer>
    </CContainer>
  )
}

export default Scan;
