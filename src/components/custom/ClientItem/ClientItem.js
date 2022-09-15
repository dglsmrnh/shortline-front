import React from "react";
import PropTypes from "prop-types";

import {
  InQueueButton,
  Title,
  AmountContainer,
  Amount,
  Icon,
  Frame
} from "./styles.ts";

const ClientItem = ({name, onClickAccept, onClickRemove, people}) => {
  ClientItem.propTypes = {
    name: PropTypes.string,
    people: PropTypes.number,
    onClickRemove: PropTypes.func,
    onClickAccept: PropTypes.func
  }

  return(
    <Frame>
      <Title>{name}</Title>
      <AmountContainer>
        <InQueueButton color="info" onClick={onClickAccept}><b>Chamar</b></InQueueButton>
        <InQueueButton color="danger" onClick={onClickRemove}><b>Remover da fila</b></InQueueButton>
        <Amount>{people}</Amount>
        <Icon></Icon>
      </AmountContainer>
  </Frame>
);
}

export default ClientItem;
