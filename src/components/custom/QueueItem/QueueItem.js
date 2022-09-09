import React from "react";
import PropTypes from 'prop-types'

import {
  Container,
  Title,
  AmountContainer,
  Amount,
  Icon
} from "./styles.ts";



const QueueItem = (props) => {
  QueueItem.propTypes = {
    title: PropTypes.string,
    people: PropTypes.number
  }

  return(
    <Container>
      <Title>{props.title}</Title>
      <AmountContainer>
        <Amount>{props.people}</Amount>
        <Icon></Icon>
      </AmountContainer>
    </Container>
  )
}

export default QueueItem
