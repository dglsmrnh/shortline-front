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
    let document = data?.cpf;
    let subName = data?.sobrenome;
    if(data?.cpf === undefined){
      document = data.cnpj;
      isCompany = true
      subName = data.razao;
    }

    let wat = data.localmap?.value;

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
      postalCode: data.postal_code?.value, 
      cpfCnpj: document?.value,
      email: data.email?.value,
      lastname: subName.value,
      gender: data.gender?.value,
      telephone: data.telephone?.value,
      address: data.local?.value,
      date: data.date?.value
    })

    if(data.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();      
    }
    e.preventDefault();
    setValidated(true);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    fetch("http://shortline-app.herokuapp.com/users", {
      method: 'POST',
      body: body,
      headers: myHeaders
    })
    .then(res => {
      if(isCompany && res.ok){
        fetch("http://shortline-app.herokuapp.com/companies", {
          method: 'POST',
          body: body,
          headers: myHeaders
        })
        .then(res => {
          if(res.ok){
            console.log("empresa salva");
            window.location.href = "/#/";

          }
        })
      } else {
        window.location.href = "/#/";
      }
    })
    .catch(e => {
      console.log(e)
    }).finally(() => {
      console.log("oi");
    }) //snackbar
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">                
                <h1>Crie sua conta</h1>
                <p className="text-medium-emphasis">E aproveite nosso servi??o</p>                
                  <CAccordion>
                    <CAccordionItem itemKey={1}>
                      <CAccordionHeader onClick={handleChangeUser}>Como cliente</CAccordionHeader>
                      <CAccordionBody>
                      <CForm className="needs-validation" noValidate validated={validated} onSubmit={handleSubmit}>
                        <CInputGroup className="mb-3">
                          <CInputGroupText>
                            <CIcon icon={cilUser} />
                          </CInputGroupText>
                          <CFormInput name='username' placeholder="Username" autoComplete="username" required feedbackInvalid="Por favor, informe um nome de usu??rio."/>
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
                          <CFormInput name="date" type="date" placeholder="Data de Nascimento" autoComplete="email" required feedbackInvalid="Por favor, informe sua data de nascimento."/>
                        </CInputGroup>
                        <CInputGroup className="mb-3">
                        <CInputGroupText>
                            <CIcon icon={cilPhone} />
                          </CInputGroupText>
                          <CFormInput name="telephone" placeholder="Celular" autoComplete="email" required feedbackInvalid="Por favor, informe seu celular."/>
                        </CInputGroup>
                        <div className="mb-3">
                          <CFormLabel className="fw-bold">Identidade de g??nero</CFormLabel>                    
                          <CFormSelect
                            name="gender" 
                            aria-label="Identidade de g??nero"
                            required
                            feedbackInvalid="Por favor, informe sua identidade de g??nero."
                            options={[
                              { label: 'Homem cisg??nero', value: '1' },
                              { label: 'Mulher cisg??nero', value: '2' },
                              { label: 'Homem transg??nero', value: '3' },
                              { label: 'Mulher transg??nero', value: '4' },
                              { label: 'N??o bin??rio', value: '5' },
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
                          <CFormInput name='username' placeholder="Username" autoComplete="username" required feedbackInvalid="Por favor, informe um nome de usu??rio."/>
                        </CInputGroup>
                        <CInputGroup className="mb-3">
                          <CInputGroupText>
                            <CIcon icon={cilUser} />
                          </CInputGroupText>
                          <CFormInput name='razao' placeholder="Raz??o social" autoComplete="username" required feedbackInvalid="Por favor, informe a raz??o social da empresa."/>
                        </CInputGroup>
                        <CInputGroup className="mb-3">
                          <CInputGroupText>
                            <CIcon icon={cilUser} />
                          </CInputGroupText>
                          <CFormInput name='nome' placeholder="Nome fantasia" autoComplete="username" required feedbackInvalid="Por favor, informe o nome fantasia."/>
                        </CInputGroup>
                        <CInputGroup className="mb-3">
                          <CInputGroupText>@</CInputGroupText>
                          <CFormInput name="email" type="email" placeholder="Email" autoComplete="email" required feedbackInvalid="Por favor, informe seu email."/>
                        </CInputGroup>
                        <CInputGroup className="mb-3">
                          <CInputGroupText>
                            <CIcon icon={cilBraille} />
                          </CInputGroupText>
                          <CFormInput name="cnpj" placeholder="CNPJ" autoComplete="email" required feedbackInvalid="Por favor, informe seu CNPJ."/>
                        </CInputGroup>
                        <CInputGroup className="mb-3">
                          <CInputGroupText>
                            <CIcon icon={cilPhone} />
                          </CInputGroupText>
                          <CFormInput name="telephone" placeholder="Telefone" autoComplete="email" required feedbackInvalid="Por favor, informe seu celular."/>
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
                        <CInputGroup className="mb-3">
                          <CInputGroupText>
                            <CIcon icon={cilMap} />
                          </CInputGroupText>
                          <CFormInput name="local" id="map-autocomplete" placeholder="Selecione o seu endere??o" autoComplete="username" required feedbackInvalid="Por favor, informe um endere??o."/>
                        </CInputGroup>
                        <div className="mb-3">
                          <Map name="localmap" id="map" height="400px"></Map>
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
