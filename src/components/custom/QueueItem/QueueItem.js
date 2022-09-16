import React from "react";
import PropTypes from 'prop-types'

import {
  Title,
  AmountContainer,
  Amount,
  Icon,
  Button
} from "./styles.ts";

const QueueItem = (props) => {
  QueueItem.propTypes = {
    name: PropTypes.string,
    people: PropTypes.number,
    onClick: PropTypes.func
  }

  return(
    <Button onClick={props.onClick}>
      <Title>{props.name}</Title>
      <AmountContainer>
        <Icon></Icon>
        <Amount>{props.people}</Amount>
      </AmountContainer>
    </Button>
  )
}

export default QueueItem
