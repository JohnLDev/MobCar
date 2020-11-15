/* eslint-disable no-use-before-define */
import React, { useState } from 'react'
import { HeaderDiv, SideBar } from './styles'
import Logo from '../../assets/Logo.svg'
import HeaderOpenMenu from '../../assets/HeaderOpenMenu.svg'
const Header: React.FC = () => {
  const [isOpenSideBar, setIsOpenSideBar] = useState(false)
  function handleSideBar(): void {
    switch (isOpenSideBar) {
      case true:
        setIsOpenSideBar(false)
        break

      case false:
        setIsOpenSideBar(true)
        break
    }
  }
  return (
    <HeaderDiv open={isOpenSideBar}>
      <div className='force-space'></div>
      <div className='central'>
        <img src={Logo} alt='logo' />
        <p>MobCar</p>
      </div>
      <button onClick={handleSideBar}>
        <img src={HeaderOpenMenu} alt='menu' />
      </button>
      <SideBar open={isOpenSideBar}>oi</SideBar>
    </HeaderDiv>
  )
}

export default Header
