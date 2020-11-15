// eslint-disable-next-line no-use-before-define
import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Routes from './routes'
import GlobalStyle from './styles/global'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { AuthProvider } from './hooks/authContext'

const App: React.FC = () => {
  return (
    <>
      <AuthProvider>
        <GlobalStyle />
        <Router>
          <Routes />
        </Router>
      </AuthProvider>
      <ToastContainer />
    </>
  )
}

export default App
