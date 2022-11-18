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
  const [user, setUser] = useState(false);

  function getUser() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var username = localStorage.getItem("username");
    var password = localStorage.getItem("password");
    
    fetch("http://shortline-app.herokuapp.com/users/" + username, {
      method: 'GET',
      headers: {'Authorization' : 'Basic ' + btoa(username + ':' + password)}
    })
    .then((res) => {
      if(res.ok && user === false){
        res.json().then(json => {
          setUser(json);
        });
      }
    })
    .catch(e => {
      console.log(e)
    }).catch(() => {console.log("buscou usuário")});
  }

  function atualiza(e) {
    const data = e.currentTarget;
    
    let isCompany = false
    let document = data?.cpf;
    let subName = data?.sobrenome;
    if(data?.cpf === undefined){
      document = data.cnpj;
      isCompany = true
      subName = data.razao;
    }

    const body = JSON.stringify({
      username: data.username?.value,
      password: data.password?.value,
      type: "basic",
      key: "none",
      isCompany: isCompany,
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
      address: data.local?.value
    })

    if(data.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();      
    }
    e.preventDefault();
    setValidated(true);

    var username = localStorage.getItem("username");

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    fetch("http://shortline-app.herokuapp.com/users/" + username, {
      method: 'PUT',
      body: body,
      headers: myHeaders
    })
    .then(res => {
      if(res.ok) {
        setUser(false)  
      }
    })
    .catch(e => {
      console.log(e)
    }).finally(() => {
      console.log("finalizou atualização");
    }) //snackbar
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

    const body = JSON.stringify({
      username: data.username?.value,
      password: data.password?.value,
      type: "basic",
      key: "none",
      isCompany: isCompany,
      addressNumber: data.address_number?.value,
      latitude: data.latitude?.value,
      longitude: data.longitude?.value, 
      name: data.nome?.value,
      postalCode: data.postal_code?.value, 
      cpfCnpj: document?.value,
      email: data.email?.value,
      lastname: subName?.value,
      gender: data.gender?.value,
      telephone: data.telephone?.value,
      address: data.local?.value
    })

    if(data.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();      
    }
    e.preventDefault();
    setValidated(true);

    var username = localStorage.getItem("username");

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    fetch("http://shortline-app.herokuapp.com/users/" + username, {
      method: 'PUT',
      body: body,
      headers: myHeaders
    })
    .then(res => {
      if(res.ok) {
        setUser(false)  
      }
    })
    .catch(e => {
      console.log(e)
    }).finally(() => {
      console.log("finalizou atualização");
    })
  }

  if(isCompany !== 'S'){
    getUser()
    return ( user !== false &&
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
                <CFormInput name="username" placeholder="Username" defaultValue={user.username} autoComplete="username" required feedbackInvalid="Por favor, informe um nome de usuário."/>
              </CInputGroup>
              <CInputGroup className="mb-3">
                <CInputGroupText>
                  <CIcon icon={cilUser} />
                </CInputGroupText>
                <CFormInput name="razao" placeholder="Razão social" defaultValue={user.name} autoComplete="username" required feedbackInvalid="Por favor, informe a razão social da empresa."/>
              </CInputGroup>
              <CInputGroup className="mb-3">
                <CInputGroupText>
                  <CIcon icon={cilUser} />
                </CInputGroupText>
                <CFormInput name="nome" placeholder="Nome fantasia" defaultValue={user.lastname} autoComplete="username" required feedbackInvalid="Por favor, informe o nome fantasia."/>
              </CInputGroup>
              <CInputGroup className="mb-3">
                <CInputGroupText>@</CInputGroupText>
                <CFormInput name="email" type="email" placeholder="Email" defaultValue={user.email} autoComplete="email" required feedbackInvalid="Por favor, informe seu email."/>
              </CInputGroup>
              <CInputGroup className="mb-3">
                <CInputGroupText>
                  <CIcon icon={cilBraille} />
                </CInputGroupText>
                <CFormInput name="cnpj" placeholder="CNPJ" autoComplete="email" defaultValue={user.cpfCnpj} required feedbackInvalid="Por favor, informe seu CNPJ."/>
              </CInputGroup>
              <CInputGroup className="mb-3">
                <CInputGroupText>
                  <CIcon icon={cilPhone} />
                </CInputGroupText>
                <CFormInput name="telephone" placeholder="Telefone" defaultValue={user.telephone} autoComplete="email" required feedbackInvalid="Por favor, informe seu celular."/>
              </CInputGroup>                        
              <CInputGroup className="mb-3">
                <CInputGroupText>
                  <CIcon icon={cilLockLocked} />
                </CInputGroupText>
                <CFormInput
                  name="password"
                  type="password"
                  defaultValue={"**********"}
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
                  defaultValue={"**********"}
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
                <CFormInput name="local" defaultValue={user.address} id="map-autocomplete" placeholder="Selecione o seu endereço" autoComplete="username" required feedbackInvalid="Por favor, informe um endereço."/>
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
    getUser()
    return ( user !== false &&
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
                      <CFormInput name="username" placeholder="Username" defaultValue={user.username} autoComplete="username" required feedbackInvalid="Por favor, informe um nome de usuário."/>
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput name="nome" placeholder="Nome" defaultValue={user.name} autoComplete="username" required feedbackInvalid="Por favor, informe seu nome."/>
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput name='sobrenome' defaultValue={user.subName} placeholder="Sobrenome" autoComplete="username" required feedbackInvalid="Por favor, informe seu sobrenome."/>
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>@</CInputGroupText>
                      <CFormInput name="email" type="email" placeholder="Email" defaultValue={user.email} autoComplete="email" required feedbackInvalid="Por favor, informe seu email."/>
                    </CInputGroup>
                    <CInputGroup className='mb-3'>
                      <CInputGroupText>
                        <CIcon icon={cilBraille} />
                      </CInputGroupText>
                      <CFormInput name='email' placeholder="CPF" defaultValue={user.cpfCnpj} autoComplete="email" required feedbackInvalid="Por favor, informe seu CPF."/>
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilCalendar} />
                      </CInputGroupText>
                      <CFormInput name='date' type="date" placeholder="Data de Nascimento" defaultValue={user.date} autoComplete="email" required feedbackInvalid="Por favor, informe sua data de nascimento."/>
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                    <CInputGroupText>
                        <CIcon icon={cilPhone} />
                      </CInputGroupText>
                      <CFormInput name="telephone" defaultValue={user.telephone} placeholder="Celular" autoComplete="email" required feedbackInvalid="Por favor, informe seu celular."/>
                    </CInputGroup>
                    <div className="mb-3">
                      <CFormLabel className="fw-bold">Identidade de gênero</CFormLabel>                    
                      <CFormSelect 
                        name='gender'
                        defaultValue={user.gender}
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
                        defaultValue={"*****"}
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
                        defaultValue={"*****"}
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
