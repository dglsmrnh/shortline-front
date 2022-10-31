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

  let maxAmount = 0;

  function handleMaxAmountChange(e) {
    maxAmount = e.target.value;
  }

  return(
    <div>
      <ModalHeader>
          Nova fila
      </ModalHeader>
      <ModalBody>
        <Form>
          <FormLabel>Tamanho máximo</FormLabel>
          <Input onChange={(e) => handleMaxAmountChange(e)} type="Number"></Input>
        </Form>
      </ModalBody>
      <ModalFooter>
        <ModalButton onClick={closeModal} color="failed">Cancelar</ModalButton>
        <ModalButton onClick={() => saveNewQueue(maxAmount)} color="success">Salvar</ModalButton>
      </ModalFooter>
    </div>
  )
}

export default NewQueueModal
