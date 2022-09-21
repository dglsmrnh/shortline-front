import React, {useState} from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilBraille, cilCalendar, cilLockLocked, cilPhone, cilUser } from '@coreui/icons'

const Register = () => {

  const [validated, setValidated] = useState(false);

  function handleSubmit(e) {
    const data = e.currentTarget;

    if(data.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();      
    }
    setValidated(true);
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm className="needs-validation" noValidate validated={validated} onSubmit={handleSubmit}>
                  <h1>Crie sua conta</h1>
                  <p className="text-medium-emphasis">E faça sua reserva</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput placeholder="Username" autoComplete="username" required feedbackInvalid="Por favor, informe um nome de usuário."/>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput placeholder="Nome" autoComplete="username" required feedbackInvalid="Por favor, informe seu nome."/>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput placeholder="Sobrenome" autoComplete="username" required feedbackInvalid="Por favor, informe seu sobrenome."/>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput type="email" placeholder="Email" autoComplete="email" required feedbackInvalid="Por favor, informe seu email."/>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilBraille} />
                    </CInputGroupText>
                    <CFormInput placeholder="CPF" autoComplete="email" required feedbackInvalid="Por favor, informe seu CPF."/>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilCalendar} />
                    </CInputGroupText>
                    <CFormInput type="date" placeholder="Data de Nascimento" autoComplete="email" required feedbackInvalid="Por favor, informe sua data de nascimento."/>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                  <CInputGroupText>
                      <CIcon icon={cilPhone} />
                    </CInputGroupText>
                    <CFormInput placeholder="Celular" autoComplete="email" required feedbackInvalid="Por favor, informe seu celular."/>
                  </CInputGroup>
                  <div className="mb-3">
                    <CFormLabel className="fw-bold">Identidade de gênero</CFormLabel>                    
                    <CFormSelect 
                      aria-label="Identidade de gênero"
                      required
                      feedbackInvalid="Por favor, informe sua identidade de gênero."
                      options={[
                        { label: 'Homem cisgênero', value: '1' },
                        { label: 'Mulher cisgênero', value: '2' },
                        { label: 'Homem transgênero', value: '3' },
                        { label: 'Mulher transgênero', value: '4' },
                        { label: 'Não binário', value: '5' },
                      ]}
                    />
                  </div>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Senha"
                      autoComplete="new-password"
                      required
                      feedbackInvalid="Por favor, informe uma sonha."
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Repita a senha"
                      autoComplete="new-password"
                      required
                      feedbackInvalid="Por favor, repita a senha corretamente."
                    />
                  </CInputGroup>
                  <div className="mb-3">
                    <CFormLabel htmlFor="formFile">Selecione uma imagem de perfil</CFormLabel>
                    <CFormInput type="file" id="formFile"/>
                  </div>
                  <div className="d-grid">
                    <CButton color="success" type="submit">Criar conta</CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
