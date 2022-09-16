import React from "react";
import PropTypes from "prop-types";

import {
  InQueueButton,
  Name,
  ButtonContainer,
  NameContainer,
  Amount,
  Frame
} from "./styles.ts";

const RequestItem = ({name, onClickAccept, onClickRefuse, people}) => {
  RequestItem.propTypes = {
    name: PropTypes.string,
    people: PropTypes.number,
    onClickRefuse: PropTypes.func,
    onClickAccept: PropTypes.func
  }

  return(
    <Frame>
      <NameContainer>
        <Name>{name}</Name>
        <Amount>{people} {people === 1 ? "pessoa" : "pessoas"} </Amount>
      </NameContainer>
      <ButtonContainer>
        <InQueueButton color="light" onClick={onClickAccept}><b>Aceitar</b></InQueueButton>
        <InQueueButton color="danger" onClick={onClickRefuse}><b>Recusar</b></InQueueButton>
      </ButtonContainer>
  </Frame>
);
}

export default RequestItem;
