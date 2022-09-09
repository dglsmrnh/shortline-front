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

const Login = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [visibleAlert, setAlert] = useState(false);

  function handleUsernameChange(e) {
    setUsername(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleLoginClick(e) {
    e.preventDefault();
    if(username || password) {
      window.location = '../mainmenu/MainMenu.js';
    }
    else
    {
      setAlert(true);
    }
  }



  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <CAlert color="warning" visible={visibleAlert} onClose={() => setAlert(false)}>
                      Usuário ou senha inválidos.
                    </CAlert>
                    <p className="text-medium-emphasis">Entre na sua conta</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Usuário"
                        autoComplete="username"
                        onChange={e => handleUsernameChange(e)}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Senha"
                        autoComplete="current-password"
                        onChange={e => handlePasswordChange(e)}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="success" style={{ color:'#fff', fontWeight:"bold"}}  className="success px-4" onClick={handleLoginClick}>
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
              <CCard className="text-white bg-success py-5" >
                <CCardBody className="text-center">
                  <div>
                    <h2>Esqueça as filas</h2>
                    <p>
                      Seja como um estabelecimento ou como um cliente, certifique-se que você não se
                      preocupará sobre sair cedo ou ficar em pé durante muito tempo.
                    </p>
                    <Link to="/register">
                      <CButton style={{ backgroundColor:'#fff', color:'#1ea84c', border:"none", fontWeight:"bold"}} className="mt-3" active tabIndex={-1}>
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
