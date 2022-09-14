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
    people: PropTypes.number
  }

  return(
    <Button>
      <Title>{props.name}</Title>
      <AmountContainer>
        <Amount>{props.people}</Amount>
        <Icon></Icon>
      </AmountContainer>
    </Button>
  )
}

export default QueueItem