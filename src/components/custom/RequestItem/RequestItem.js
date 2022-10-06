import React from "react";
import PropTypes from "prop-types";

import { CContainer, CCardText, CButton } from "@coreui/react";

const RequestItem = ({name, onClickAccept, onClickRefuse, people}) => {
  RequestItem.propTypes = {
    name: PropTypes.string,
    people: PropTypes.number,
    onClickRefuse: PropTypes.func,
    onClickAccept: PropTypes.func
  }

  return(
    <CContainer style={{paddingBottom: "15px", borderBottom: "1px solid rgba(0, 0, 0, 0.2)"}}>
      <CContainer>
        <CCardText style={{fontSize: "20px", marginTop: "10px", marginBottom: "0px", fontWeight: "bold"}}>• {name}</CCardText>
        <CCardText style={{fontSize: "14px", opacity: "70%", paddingLeft: "14px"}}>{people} {people === 1 ? "pessoa" : "pessoas"} </CCardText>
      </CContainer>
      <CContainer style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "auto"}}>
        <CButton color="light" onClick={onClickAccept}><b>Aceitar</b></CButton>
        <CButton style={{marginRight: "4vw"}} color="danger" onClick={onClickRefuse}><b>Recusar</b></CButton>
      </CContainer>
  </CContainer>
);
}

export default RequestItem;
