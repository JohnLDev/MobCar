import styled from 'styled-components'

interface ModalProps {
  for: 'user' | 'adm'
}

export const ModalDiv = styled.div<ModalProps>`
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.8);

  display: flex;
  justify-content: center;
  align-items: center;
  .container {
    background-color: #ffffff;
    height: ${props => (props.for === 'user' ? '325px' : '437px')};
    max-width: 342px;
    width: 100%;
    border-radius: 24px;
  }
  .close {
    background: 0;
    border: 0;
  }
`
