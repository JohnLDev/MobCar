/* eslint-disable react/prop-types */
// eslint-disable-next-line no-use-before-define
import React from 'react'
import { ModalDiv } from './styles'
interface ModalProps {
  for: 'user' | 'adm'
}
const Modal: React.FC<ModalProps> = ({ children, for: For }) => {
  return (
    <ModalDiv for={For}>
      <div className='container'>
        <button className='close'></button>
        <div className='content'>{children}</div>
      </div>
    </ModalDiv>
  )
}

export default Modal
