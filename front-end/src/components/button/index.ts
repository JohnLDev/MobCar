import styled from 'styled-components'

interface ButtonProps {
  color: string
}

export const Button = styled.button<ButtonProps>`
  height: 36px;
  width: 71px;
  color: ${props => (props.color === '#fff' ? '#000' : '#fff')};
  border-color: #000;
  background-color: ${props => props.color};
  border-radius: 8px;
  @media (min-width: 700px) {
    height: 38px;
    width: 122px;
  }
`
