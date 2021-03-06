import styled from 'styled-components'
interface ModalProps {
  Inputs: boolean
}

export const ModalDiv = styled.div<ModalProps>`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.3);

  display: flex;
  justify-content: center;
  align-items: center;
  .container {
    background-color: #ffffff;
    height: ${props => (props.Inputs ? '410px' : '325px')};
    max-width: 342px;
    width: 100%;
    border-radius: 24px;
    @media (min-width: 700px) {
      max-width: 420px;
      height: ${props => (props.Inputs ? '470px' : '380px')};
    }
  }
  .close {
    background: 0;
    border: 0;
  }
`
export const ModalUser = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  padding-left: 16px;
  padding-right: 16px;
  align-items: center;
  .modal-title {
    display: flex;
    justify-content: space-between;
    width: 100%;
    .title-title {
      display: flex;
      align-items: center;
      img {
        margin-left: 1.5px;
        margin-right: 9.5px;
      }
    }
  }
  .foto {
    height: 120px;
    width: 100%;
    max-width: 310px;
    border-radius: 12px;
    margin-top: 19px;
    margin-bottom: 13px;
    @media (min-width: 700px) {
      max-width: 400px;
      height: 162px;
    }
  }
  .infos {
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-content: space-between;
    width: 100%;
    height: 70px;
    @media (min-width: 700px) {
      height: 90px;
    }
  }
  .buttons {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    z-index: 10;
    .frist {
      margin-right: 8px;
    }
  }
`
