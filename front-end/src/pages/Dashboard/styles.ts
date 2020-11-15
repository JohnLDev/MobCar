import styled from 'styled-components'

export const Page = styled.div`
  width: 100vw;
  max-width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
`

export const Container = styled.div`
  width: 100%;
  height: 100%;
  max-height: 100%;
  padding: 16px;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  .title {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    h5 {
      font-family: Helvetica;
      font-weight: normal;
      font-size: 16px;
      line-height: 18px;
      letter-spacing: 8%;
    }
  }
  .line {
    margin-top: 8px;
    margin-bottom: 16px;
    height: 0.5px;
    width: 100%;
    background-color: #000;
  }
`

export const CarContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  .content {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  .car {
    display: flex;
    align-items: center;
  }
  .infocar {
    margin-left: 8px;
    h4 {
      font-family: Helvetica;
      font-size: 14px;
      line-height: 16.1px;
      letter-spacing: 8%;
      font-weight: 700;
    }
    p {
      font-family: Helvetica;
      font-size: 14px;
      line-height: 16.1px;
      letter-spacing: 8%;
      font-weight: 400;
      color: #595959;
    }
    .invisible-button {
      span {
        font-family: Helvetica;
        font-size: 10px;
        line-height: 11.5px;
        letter-spacing: 8%;
        font-weight: 300;
        color: #00adee;
      }
      border: 0;
      background: 0;
    }
  }
  .dots {
    margin-right: 15px;
    background: 0;
    border: 0;
  }

  .car-image {
    width: 48px;
    height: 48px;
    border-radius: 8px;
  }
  .linebottom {
    margin-top: 16px;
    margin-bottom: 16px;
    height: 0.5px;
    width: 100%;
    background-color: #000;
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
  }
  .infos {
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-content: space-between;
    width: 100%;
    height: 70px;
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
export const ModalOptions = styled.ul`
  right: 45px;
  position: absolute;
  z-index: 3;
  background: #ffffff;
  list-style: none;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 77px;
  height: 128px;

  li {
    cursor: pointer;
    width: 100%;
    height: 33%;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background: #e5e5e5;
      transition: background 1s;
    }
  }
`
