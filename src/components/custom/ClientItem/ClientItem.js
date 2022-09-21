import React from "react";
import PropTypes from "prop-types";

import {
  InQueueButton,
  Name,
  NameContainer,
  ButtonContainer,
  Amount,
  Frame
} from "./styles.ts";

const ClientItem = ({name, onClickCall, onClickRemove, people}) => {
  ClientItem.propTypes = {
    name: PropTypes.string,
    people: PropTypes.number,
    onClickRemove: PropTypes.func,
    onClickCall: PropTypes.func
  }

  return(
    <Frame>
      <NameContainer>
        <Name>{name}</Name>
        <Amount>{people} {people === 1 ? "pessoa" : "pessoas"} </Amount>
      </NameContainer>
      <ButtonContainer>
        <InQueueButton color="light" onClick={onClickCall}><b>Chamar</b></InQueueButton>
        <InQueueButton color="danger" onClick={onClickRemove}><b>Remover da fila</b></InQueueButton>
      </ButtonContainer>
  </Frame>
);
}

export default ClientItem;
