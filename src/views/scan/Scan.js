import React, { useState } from "react";

import { CContainer } from "@coreui/react";

import { QrReader } from "react-qr-reader";

const Scan = () => {
  let [qrResponse, setQrResponse] = useState('No Response');

  return (
    <CContainer>
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
        style={{ width: '100%' }}
      />
      <p>{qrResponse}</p>
    </CContainer>
  )
}

export default Scan;
