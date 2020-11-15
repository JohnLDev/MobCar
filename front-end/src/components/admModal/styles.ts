import styled from 'styled-components'

interface ModalProps {
  to: 'Add' | 'Edit'
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
    height: ${props => (props.to === 'Add' ? '450px' : '470px')};
    max-width: 342px;
    width: 100%;
    border-radius: 24px;
    @media (min-width: 700px) {
      max-width: 420px;
    }
  }
  .close {
    background: 0;
    border: 0;
  }
`
export const ModalAdm = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  padding-left: 16px;
  padding-right: 16px;
  align-items: center;

  .invisible-button {
    border: 0;
    background: 0;
  }
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
  .modal-title {
    margin-bottom: 16px;
  }
  .car-image-display-div {
    height: 120px;
    width: 100%;
    margin-bottom: 6px;

    .car-image-display {
      max-height: 120px;
      max-width: 320px;
      height: 100%;
      width: 100%;
      border-radius: 12px;
      z-index: 12;
      @media (min-width: 700px) {
        max-width: 400px;
      }
    }
  }

  form {
    width: 100%;

    .buttons {
      display: flex;
      justify-content: flex-end;
      width: 100%;
      z-index: 10;
      .frist {
        margin-right: 8px;
      }
    }
  }
`
