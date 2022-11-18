import React, { useState } from "react";

import { CContainer } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilArrowLeft } from "@coreui/icons";

import { QrReader } from "react-qr-reader";

const Scan = () => {
  let [qrResponse, setQrResponse] = useState('No Response');

  function handleGoBack() {
    window.location.href = '/#/queue';
  }

  return (
    <CContainer >
      <CIcon onClick={handleGoBack} style={{border: '1px solid #000', marginRight: '10px'}} icon={cilArrowLeft} height={36} width={36} size="custom-size"></CIcon>
      <QrReader
        onResult={(result, error) => {
          if (!!result) {
            setQrResponse(result?.text);
            window.open(result?.text, '_blank').focus();
          }

          if (!!error) {
            console.info(error);
          }
        }}
        style={{ width: '80%' }}
      />
      <p>{qrResponse}</p>
    </CContainer>
  )
}

export default Scan;
