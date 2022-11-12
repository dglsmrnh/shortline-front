import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'

import logo from '../../../assets/images/logoV2.png'

const Login = () => { 
  
  const [visibleAlert, setAlert] = useState(false);

  function handleAlert(e) {
    const data = e.preventDefault();
    //setAlert(true);
  }

  function handleSubmit(e) {
    const data = e.currentTarget;

    e.preventDefault()
    fetch("http://shortline-app.herokuapp.com/users/" + data.username.value, {
      method: 'GET',
      headers: {'Authorization' : 'Basic ' + btoa(data.username.value + ':' + data.password.value)}
    })
    .then((res) => {
      if(res.ok){
        localStorage.setItem("username", data.username.value);
        localStorage.setItem("password", data.password.value);
        localStorage.setItem("timeout", Date.now())
        res.json().then(json => {
          localStorage.setItem("isCompany", json.isCompany)
        });
        setTimeout(() => localStorage.clear(), 1000000)
        window.location.href = "/#/mainmenu";
      } else {
        setAlert(true);
      }
    })
    .catch(e => {
      console.log(e)
    }) //snackbar */
  }

  if(localStorage.getItem("username") !== null || localStorage.getItem("username") !== undefined && localStorage.getItem("timeout") !== null) {
    const diferencaData = Date.now() - localStorage.getItem("timeout")
    if(diferencaData > 1000000) {
      localStorage.clear()
      window.location.href = "/";
    }
    window.location.href = "/#/mainmenu";
  }
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
            <img src={logo} style={{maxWidth:"1000px"}} alt="Logo"/>
        </CRow>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <CAlert color="warning" visible={visibleAlert} onClose={() => setAlert(false)}>
                      Usuário ou senha inválidos.
                    </CAlert>
                    <p className="text-medium-emphasis">Entre na sua conta</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput name='username' placeholder="Usuário" autoComplete="username" />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        name='password'
                        type="password"
                        placeholder="Senha"
                        autoComplete="current-password"
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton type='submit' color="success" className="success px-4">
                          Entrar
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          esqueceu a senha?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-success py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Esqueça as filas</h2>
                    <p>
                      Seja como um estabelecimento ou como um cliente, certifique-se que você não se
                      preocupará sobre sair cedo ou ficar em pé durante muito tempo.
                    </p>
                    <Link to="/register">
                      <CButton color="dark" className="mt-3" active tabIndex={-1}>
                        Registre-se agora!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
