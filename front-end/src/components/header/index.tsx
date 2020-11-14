/* eslint-disable no-use-before-define */
import React from 'react'
import { HeaderDiv } from './styles'
import Logo from '../../assets/Logo.svg'
import HeaderOpenMenu from '../../assets/HeaderOpenMenu.svg'
const Header: React.FC = () => {
  return (
    <HeaderDiv>
      <div className='force-space'></div>
      <div className='central'>
        <img src={Logo} alt='logo' />
        <p>MobCar</p>
      </div>
      <button>
        <img src={HeaderOpenMenu} alt='menu' />
      </button>
    </HeaderDiv>
  )
}

export default Header
