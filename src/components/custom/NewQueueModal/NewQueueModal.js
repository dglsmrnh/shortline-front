import React from "react";
import PropTypes from 'prop-types'

import {
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
  Form,
  FormLabel,
  Input
} from "./styles.ts";

const NewQueueModal = ({closeModal, saveNewQueue}) => {
  NewQueueModal.propTypes = {
    closeModal: PropTypes.func,
    saveNewQueue: PropTypes.func
  }

  let newQueue = {
    peopleOnIt: 0
  };

  function handleNameChange(e) {
    newQueue.name = e.target.value;
  }

  function handleMaxAmountChange(e) {
    newQueue.maxAmount = e.target.value;
  }

  function handleOpeningDateChange(e) {
    newQueue.openingDate = e.target.value;
  }

  function handleOpeningTimeChange(e) {
    newQueue.openingTime = e.target.value;
  }

  function handleClosingDateChange(e) {
    newQueue.closingDate = e.target.value;
  }

  function handleClosingTimeChange(e) {
    newQueue.closingTime = e.target.value;
  }

  return(
    <div>
      <ModalHeader>
          Nova fila
      </ModalHeader>
      <ModalBody>
        <Form>
          <FormLabel>Nome</FormLabel>
          <Input onChange={(e) => handleNameChange(e)} type="Text" placeholder="Nova Fila"></Input>
        </Form>
        <Form>
          <FormLabel>Tamanho máximo</FormLabel>
          <Input onChange={(e) => handleMaxAmountChange(e)} type="Number"></Input>
        </Form>
        <Form>
          <FormLabel>Data de abertura</FormLabel>
          <Input onChange={(e) => handleOpeningDateChange(e)} type="Date" defaultValue={Date.now}></Input>
        </Form>
        <Form>
          <FormLabel>Hora de abertura</FormLabel>
          <Input onChange={(e) => handleOpeningTimeChange(e)} type="Time" defaultValue={Date.now}></Input>
        </Form>
        <Form>
          <FormLabel>Data de fechamento</FormLabel>
          <Input onChange={(e) => handleClosingDateChange(e)} type="Date" defaultValue={Date.now}></Input>
        </Form>
        <Form>
          <FormLabel>Hora de fechamento</FormLabel>
          <Input onChange={(e) => handleClosingTimeChange(e)} type="Time" defaultValue={Date.now}></Input>
        </Form>
      </ModalBody>
      <ModalFooter>
        <ModalButton onClick={closeModal} color="failed">Cancelar</ModalButton>
        <ModalButton onClick={() => saveNewQueue(newQueue)} color="success">Salvar</ModalButton>
      </ModalFooter>
    </div>
  )
}

export default NewQueueModal
