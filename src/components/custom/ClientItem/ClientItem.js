import React, { useState } from "react";
import PropTypes from "prop-types";

import {
  CContainer,
  CCardText,
  CButton
} from "@coreui/react";

const ClientItem = ({name, onClickRemove, people}) => {
  ClientItem.propTypes = {
    name: PropTypes.string,
    people: PropTypes.number,
    onClickRemove: PropTypes.func,
  }

  let [called, setCalled] = useState(false);

  function onClickCall() {
    setCalled(true);
  }

  return(
    <CContainer style={{paddingBottom: "15px", borderBottom: "1px solid rgba(0, 0, 0, 0.2)"}}>
      <CContainer>
        <CCardText style={{fontSize: "20px", marginTop: "10px", marginBottom: "0px", fontWeight: "bold"}}>• {name}</CCardText>
        <CCardText style={{fontSize: "14px", opacity: "70%", paddingLeft: "14px"}}>{people} {people === 1 ? "pessoa" : "pessoas"} </CCardText>
      </CContainer>
      <CContainer style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "auto"}}>
        <CButton color="light" disabled={called} onClick={onClickCall}><b>{called ? "Chamado" : "Chamar"}</b></CButton>
        <CButton color="danger" onClick={onClickRemove}><b>Remover da fila</b></CButton>
      </CContainer>
  </CContainer>
);
}

export default ClientItem;
