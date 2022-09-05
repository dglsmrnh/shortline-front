import React from "react";
import {
  Container,
  Title,
  AmountContainer,
  Amount,
  Icon
} from "./styles.ts";

const QueueItem = (title, people) => {
  return(
    <Container>
      <Title>{title}</Title>
      <AmountContainer>
        <Amount>{people}</Amount>
        <Icon></Icon>
      </AmountContainer>
    </Container>
  )
}

export default QueueItem
