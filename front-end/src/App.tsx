// eslint-disable-next-line no-use-before-define
import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Routes from './routes'
import GlobalStyle from './styles/global'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Routes />
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
