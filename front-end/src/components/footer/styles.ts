import styled from 'styled-components'

export const FooterDiv = styled.div`
  height: 60px;
  min-height: 60px;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  bottom: 0;
  z-index: 5;

  background-color: #000000;
  img {
    margin-right: 13.5px;
  }
  p {
    color: #00adee;
    font-family: Helvetica;
    font-weight: 400;
    size: 14px;
    line-height: 20px;
  }
`
