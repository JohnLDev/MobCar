import styled from 'styled-components'

export const Input = styled.input`
  border: 1px solid #262626;
  height: 32px;
  max-width: 310px;
  width: 100%;
  box-sizing: border-box;
  border-radius: 4px;
  background: #ffffff;
  margin-bottom: 16px;
  @media (min-width: 700px) {
    max-width: 390px;
  }
`
export const SelectInput = styled.select`
  border: 1px solid #262626;
  height: 32px;
  max-width: 310px;
  width: 100%;
  box-sizing: border-box;
  border-radius: 4px;
  background: #ffffff;
  margin-bottom: 16px;
  @media (min-width: 700px) {
    max-width: 390px;
  }

  option {
    border: 1px solid #262626;
    height: 32px;
    max-width: 310px;
    width: 30%;
    box-sizing: border-box;
    border-radius: 4px;
    background: #ffffff;
  }
`
