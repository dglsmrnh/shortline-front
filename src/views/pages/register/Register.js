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
  CAccordion,
  CAccordionHeader,
  CAccordionItem,
  CAccordionBody,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilBraille, cilCalendar, cilLockLocked, cilMap, cilPhone, cilUser } from '@coreui/icons'
import Map from '../../../components/custom/Map/Map';

const Register = () => {

  const [validated, setValidated] = useState(false);

  
  function handleChangeUser() {
    setValidated(false);
  }

  function handleSubmit(e) {
    const data = e.currentTarget;
    
    let isCompany = false
    if(data?.cpf?.value === null){
      isCompany = true
    }

    const body = JSON.stringify({
      username: data.username?.value,
      password: data.password?.value,
      type: "basic",
      key: "none",
      isCompany: isCompany,
      idUser: null,
      addressNumber: data.address_number?.value,
      latitude: data.latitude?.value,
      longitude: data.longitude?.value, 
      name: data.nome?.value,
      postalCode: data.postal_code?.value 
    })

    if(data.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();      
    }
    e.preventDefault();
    setValidated(true);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    try{
      fetch("http://shortline-app.herokuapp.com/users", {
        method: 'POST',
        body: body,
        headers: myHeaders
      })
      .then(() => {
        if(isCompany){
          fetch("http://shortline-app.heroku.com/users", {
            method: 'POST',
            body: body
            })  
        }
        window.location.href = "/#/home";
      })
      .catch(e => {
        console.log(e)
      }).finally(() => {
        console.log("oi");
      }) //snackbar
    } catch (e){
      console.log(e);
    }
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">                
                <h1>Crie sua conta</h1>
                <p className="text-medium-emphasis">E aproveite nosso serviço</p>                
                  <CAccordion>
                    <CAccordionItem itemKey={1}>
                      <CAccordionHeader onClick={handleChangeUser}>Como cliente</CAccordionHeader>
                      <CAccordionBody>
                      <CForm className="needs-validation" noValidate validated={validated} onSubmit={handleSubmit}>
                        <CInputGroup className="mb-3">
                          <CInputGroupText>
                            <CIcon icon={cilUser} />
                          </CInputGroupText>
                          <CFormInput name='username' placeholder="Username" autoComplete="username" required feedbackInvalid="Por favor, informe um nome de usuário."/>
                        </CInputGroup>
                        <CInputGroup className="mb-3">
                          <CInputGroupText>
                            <CIcon icon={cilUser} />
                          </CInputGroupText>
                          <CFormInput name='nome' placeholder="Nome" autoComplete="username" required feedbackInvalid="Por favor, informe seu nome."/>
                        </CInputGroup>
                        <CInputGroup className="mb-3">
                          <CInputGroupText>
                            <CIcon icon={cilUser} />
                          </CInputGroupText>
                          <CFormInput name='sobrenome' placeholder="Sobrenome" autoComplete="username" required feedbackInvalid="Por favor, informe seu sobrenome."/>
                        </CInputGroup>
                        <CInputGroup className="mb-3">
                          <CInputGroupText>@</CInputGroupText>
                          <CFormInput name='email' type="email" placeholder="Email" autoComplete="email" required feedbackInvalid="Por favor, informe seu email."/>
                        </CInputGroup>
                        <CInputGroup className="mb-3">
                          <CInputGroupText>
                            <CIcon icon={cilBraille} />
                          </CInputGroupText>
                          <CFormInput name='cpf' placeholder="CPF" autoComplete="email" required feedbackInvalid="Por favor, informe seu CPF."/>
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
                            name='password'
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
                      </CAccordionBody>
                    </CAccordionItem>
                    <CAccordionItem itemKey={2}>
                      <CAccordionHeader onClick={handleChangeUser}>Como uma empresa</CAccordionHeader>
                      <CAccordionBody>
                      <CForm className="needs-validation" noValidate validated={validated} onSubmit={handleSubmit}>
                        <CInputGroup className="mb-3">
                          <CInputGroupText>
                            <CIcon icon={cilUser} />
                          </CInputGroupText>
                          <CFormInput name='username' placeholder="Username" autoComplete="username" required feedbackInvalid="Por favor, informe um nome de usuário."/>
                        </CInputGroup>
                        <CInputGroup className="mb-3">
                          <CInputGroupText>
                            <CIcon icon={cilUser} />
                          </CInputGroupText>
                          <CFormInput name='razao' placeholder="Razão social" autoComplete="username" required feedbackInvalid="Por favor, informe a razão social da empresa."/>
                        </CInputGroup>
                        <CInputGroup className="mb-3">
                          <CInputGroupText>
                            <CIcon icon={cilUser} />
                          </CInputGroupText>
                          <CFormInput name='nome' placeholder="Nome fantasia" autoComplete="username" required feedbackInvalid="Por favor, informe o nome fantasia."/>
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
                            name='password'
                            type="password"
                            placeholder="Senha"
                            autoComplete="new-password"
                            required
                            feedbackInvalid="Por favor, informe uma senha."
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
                          <CButton color="success" type="submit">Criar conta</CButton>
                        </div>
                        </CForm>  
                      </CAccordionBody>
                    </CAccordionItem>
                  </CAccordion>                                  
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
