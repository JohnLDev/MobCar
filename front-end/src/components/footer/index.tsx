/* eslint-disable no-use-before-define */
import React from 'react'
import { FooterDiv } from './styles'
import FooterC from '../../assets/FooterC.svg'
const Footer: React.FC = () => {
  return (
    <FooterDiv>
      <img src={FooterC} alt='C' />
      <p>2020. All rights reserved to Mobcar.</p>
    </FooterDiv>
  )
}

export default Footer
