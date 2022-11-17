import React, {useState} from 'react'
import {
  CButton,
  CCard,
  CCardHeader,
  CCardBody,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilBraille, cilCalendar, cilLockLocked, cilMap, cilPhone, cilUser } from '@coreui/icons'
import Map from '../../components/custom/Map/Map';

const Range = () => {

  const isCompany = sessionStorage.getItem("userType");
  const [validated, setValidated] = useState(false);

  function handleSubmit(e) {
    const data = e.currentTarget;

    if(data.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();      
    }
    setValidated(true);
  }

  if(isCompany !== 'S'){
    return (
      <CRow className="justify-content-center">
        <CCol md={9} lg={7} xl={6}>
          <CCard className="mx-4">
            <CCardHeader>
              <strong>Informações do usuário</strong>
            </CCardHeader>
            <CCardBody className="p-4">                
            <CForm className="needs-validation" noValidate validated={validated} onSubmit={handleSubmit}>
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
                <CFormInput placeholder="Razão social" autoComplete="username" required feedbackInvalid="Por favor, informe a razão social da empresa."/>
              </CInputGroup>
              <CInputGroup className="mb-3">
                <CInputGroupText>
                  <CIcon icon={cilUser} />
                </CInputGroupText>
                <CFormInput placeholder="Nome fantasia" autoComplete="username" required feedbackInvalid="Por favor, informe o nome fantasia."/>
              </CInputGroup>
              <CInputGroup className="mb-3">
                <CInputGroupText>@</CInputGroupText>
                <CFormInput type="email" placeholder="Email" autoComplete="email" required feedbackInvalid="Por favor, informe seu email."/>
              </CInputGroup>
              <CInputGroup className="mb-3">
                <CInputGroupText>
                  <CIcon icon={cilBraille} />
                </CInputGroupText>
                <CFormInput placeholder="CNPJ" autoComplete="email" required feedbackInvalid="Por favor, informe seu CNPJ."/>
              </CInputGroup>
              <CInputGroup className="mb-3">
                <CInputGroupText>
                  <CIcon icon={cilPhone} />
                </CInputGroupText>
                <CFormInput placeholder="Telefone" autoComplete="email" required feedbackInvalid="Por favor, informe seu celular."/>
              </CInputGroup>                        
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
              <CInputGroup className="mb-3">
                <CInputGroupText>
                  <CIcon icon={cilMap} />
                </CInputGroupText>
                <CFormInput id="map-autocomplete" placeholder="Selecione o seu endereço" autoComplete="username" required feedbackInvalid="Por favor, informe um endereço."/>
              </CInputGroup>
              <div className="mb-3">
                <Map id="map" height="400px"></Map>
              </div>
              <div className="d-grid">
                <CButton color="success" type="submit">Confirmar edição</CButton>
              </div>
              </CForm>                                   
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    )
  }
  else {
    return (
      <CRow className="justify-content-center">
            <CCol md={9} lg={7} xl={6}>
              <CCard className="mx-4">
                <CCardHeader>
                  <strong>Informações do usuário</strong>
                </CCardHeader>
                <CCardBody className="p-4">                              
                    <CForm className="needs-validation" noValidate validated={validated} onSubmit={handleSubmit}>
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
                    <CInputGroup className='mb-3'>
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
                    <div className="d-grid">
                      <CButton color="success" type="submit">Confirmar edição</CButton>
                    </div>
                    </CForm>  
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
    )
  }
}

export default Range
