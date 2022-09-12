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
    title: PropTypes.string,
    people: PropTypes.number
  }

  return(
    <Button>
      <Title>{props.title}</Title>
      <AmountContainer>
        <Amount>{props.people}</Amount>
        <Icon></Icon>
      </AmountContainer>
    </Button>
  )
}

export default QueueItem
