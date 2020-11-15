/* eslint-disable no-use-before-define */
import React, { useState } from 'react'
import { HeaderDiv, SideBar, AdminPanelTitle, LoginDiv } from './styles'
import Logo from '../../assets/Logo.svg'
import HeaderOpenMenu from '../../assets/HeaderOpenMenu.svg'
import { Input } from '../input'
import { Button } from '../button'
const Header: React.FC = () => {
  const [isOpenSideBar, setIsOpenSideBar] = useState(false)
  const [isNewUser, setIsNewUser] = useState(false)

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
        <LoginDiv>
          <AdminPanelTitle>User Panel</AdminPanelTitle>
          <form action=''>
            <Input type='text' placeholder='E-mail' />
            <Input type='pasword' placeholder='Password' />
            {isNewUser && (
              <>
                <Input type='text' placeholder='Name' />
                <Input type='text' placeholder='Cpf' />
                <Input type='text' placeholder='Cellphone' />
                <Input type='text' placeholder='Birthdate' />
              </>
            )}
          </form>
          <div className='login'>
            <Button color='#fff' onClick={() => setIsNewUser(!isNewUser)}>
              {isNewUser ? 'Old user?' : 'New user?'}
            </Button>
            <Button color='#000'>{isNewUser ? 'Register' : 'Login'}</Button>
          </div>
        </LoginDiv>
      </SideBar>
    </HeaderDiv>
  )
}

export default Header
