import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  Container,
  OuterCard,
  QueueInfoContainer,
  EnterButton,
  EstablishmentName,
  PeopleAmount,
  WaitAmount
} from './styles.ts';

const Establishment = () => {
  let [queueInfo, setQueueInfo] = useState({
    name: 'Fila 1',
    peopleAmount: 3
  });

  function enterQueue() {
    //Enviar informações para o backend
    window.location.href = ''; //Mandar para a tela de fila atual do usuário
  }

  return (
    <Container>
      <OuterCard>
        <QueueInfoContainer>
          <EstablishmentName>Nome do estabelecimento</EstablishmentName>
          <PeopleAmount>14 pessoas</PeopleAmount>
          <WaitAmount>Cerca de 45 minutos de espera</WaitAmount>
        </QueueInfoContainer>
        <EnterButton onClick={enterQueue}>Entrar</EnterButton>
      </OuterCard>
    </Container>
  )
}

export default Establishment;
