/* eslint-disable no-use-before-define */
import React, { FormEvent, useState } from 'react'
import {
  HeaderDiv,
  SideBar,
  AdminPanelTitle,
  LoginDiv,
  Welcome,
} from './styles'
import Logo from '../../assets/Logo.svg'
import HeaderOpenMenu from '../../assets/HeaderOpenMenu.svg'
import { Input } from '../input'
import { Button } from '../button'
import { useAuth } from '../../hooks/authContext'
import * as yup from 'yup'
import { toast } from 'react-toastify'
import DateMask from '../../utils/DateMask'
import CpfMask from '../../utils/CpfMask'
import PhoneMask from '../../utils/PhoneMask'
import api from '../../services/api'

const Header: React.FC = () => {
  const [isOpenSideBar, setIsOpenSideBar] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [cpf, setCpf] = useState('')
  const [cellphone, setCellphone] = useState('')
  const [birthdate, setBirthdate] = useState('')
  const [isNewUser, setIsNewUser] = useState(false)
  const { user, signIn, signOut } = useAuth()

  async function handleSubmit(event: FormEvent): Promise<void> {
    event.preventDefault()
    if (!isNewUser) {
      const data = { email, password }
      const schema = yup.object().shape({
        email: yup
          .string()
          .email('inform a valid email')
          .required('inform an email'),
        password: yup.string().required('inform your password'),
      })
      try {
        await schema.validate(data)
        await signIn(data)
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          error.errors.map(error => toast.error(error, {}))
          return
        }

        const {
          data: { message },
        } = error.response
        toast.error(message)
      }
    } else {
      const phone = cellphone
        .replace('(', '')
        .replace(')', '')
        .replace('-', '')
        .replace(' ', '')
        .replace(' ', '')
      const data = { email, password, cellphone: phone, name, birthdate, cpf }
      const schema = yup.object().shape({
        email: yup
          .string()
          .email('inform a valid email')
          .required('inform an email'),
        password: yup.string().required('inform your password'),
        cellphone: yup
          .string()
          .length(11, 'inform a valid phone number')
          .required('inform your phone number'),
        name: yup.string().required('inform your name'),
        birthdate: yup
          .string()
          .length(10, 'inform a valid date')
          .required('inform your birthdate'),
        cpf: yup
          .string()
          .length(14, 'inform a valid cpf')
          .required('inform your cpf'),
      })
      try {
        await schema.validate(data)
        await api.post('user/signup', data)
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          error.errors.map(error => toast.error(error, {}))
          return
        }

        const {
          data: { message },
        } = error.response
        toast.error(message)
        return
      }
      setIsNewUser(false)
      toast.success('user successfully registered')
    }
  }
  return (
    <HeaderDiv open={isOpenSideBar}>
      <div className='force-space'></div>
      <div className='central'>
        <img src={Logo} alt='logo' />
        <p>MobCar</p>
      </div>
      <button
        onClick={() => {
          setIsOpenSideBar(!isOpenSideBar)
        }}
        className='sidebar-button'
      >
        <img src={HeaderOpenMenu} alt='menu' />
      </button>
      <SideBar open={isOpenSideBar}>
        {user ? (
          <>
            <Welcome>
              <div className='logout'>
                <Button color='#000000' onClick={signOut}>
                  Logout
                </Button>
              </div>
              <h1>Bem Vindo</h1>
              <h4>{user.name}</h4>
            </Welcome>
          </>
        ) : (
          <LoginDiv>
            <AdminPanelTitle>User Panel</AdminPanelTitle>
            <form id='register' onSubmit={handleSubmit}>
              <Input
                type='text'
                placeholder='E-mail'
                value={email}
                onChange={({ target: { value } }) => {
                  setEmail(value)
                }}
              />
              <Input
                type='password'
                placeholder='Password'
                value={password}
                onChange={({ target: { value } }) => {
                  setPassword(value)
                }}
              />
              {isNewUser && (
                <>
                  <Input
                    type='text'
                    placeholder='Name'
                    value={name}
                    onChange={({ target: { value } }) => {
                      setName(value)
                    }}
                  />
                  <Input
                    type='text'
                    maxLength={14}
                    placeholder='Cpf'
                    value={cpf}
                    onChange={({ target: { value } }) => {
                      setCpf(CpfMask(value))
                    }}
                  />
                  <Input
                    type='text'
                    placeholder='Cellphone'
                    maxLength={11}
                    value={cellphone}
                    onChange={({ target: { value } }) => {
                      setCellphone(PhoneMask(value))
                    }}
                  />
                  <Input
                    type='text'
                    placeholder='Birthdate'
                    maxLength={10}
                    value={birthdate}
                    onChange={({ target: { value } }) => {
                      setBirthdate(DateMask(value))
                    }}
                  />
                </>
              )}
            </form>
            <div className='login'>
              <Button
                color='#fff'
                onClick={() => setIsNewUser(!isNewUser)}
                type='button'
              >
                {isNewUser ? 'Old user?' : 'New user?'}
              </Button>
              <Button color='#000' type='submit' form='register'>
                {isNewUser ? 'Register' : 'Login'}
              </Button>
            </div>
          </LoginDiv>
        )}
      </SideBar>
    </HeaderDiv>
  )
}

export default Header
