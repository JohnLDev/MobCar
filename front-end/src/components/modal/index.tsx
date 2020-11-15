/* eslint-disable react/prop-types */
// eslint-disable-next-line no-use-before-define
import React from 'react'
import { ModalDiv } from './styles'
interface ModalProps {
  to: 'user' | 'adm'
}
const Modal: React.FC<ModalProps> = ({ children, to: For }) => {
  return (
    <ModalDiv to={For}>
      <div className='container'>
        <button className='close'></button>
        <div className='content'>{children}</div>
      </div>
    </ModalDiv>
  )
}

export default Modal
