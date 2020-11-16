import styled from 'styled-components'

export const Page = styled.div`
  width: 100vw;
  max-width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  @media (min-width: 700px) {
    align-items: center;
  }
`

export const Container = styled.div`
  width: 100%;

  padding: 16px;
  flex-grow: 1;
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
  @media (min-width: 700px) {
    max-width: 686px;
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
      font-weight: 700;
    }
    p {
      font-family: Helvetica;
      font-size: 14px;
      line-height: 16.1px;
      font-weight: 400;
      color: #595959;
    }
    .invisible-button {
      span {
        text-justify: flex-start;
        font-family: Helvetica;
        font-size: 10px;
        line-height: 11.5px;
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
    height: 1px;
    width: 100%;
    background-color: #000;
  }
  @media (min-width: 700px) {
    max-width: 686px;
    position: relative;
    .infocar {
      height: 100%;
      margin-left: 16px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-start;
      h4 {
        font-size: 20px;
        line-height: 18px;
      }
      p {
        font-size: 20px;
        line-height: 18px;
      }
      .invisible-button {
        span {
          font-size: 16px;
          line-height: 18px;
          font-weight: 400;
        }
        border: 0;
        background: 0;
      }
    }
    .dots {
    }
    .car-image {
      width: 80px;
      height: 80px;
    }
  }
`

export const ModalOptions = styled.ul`
  right: 45px;
  position: absolute;
  z-index: 18;
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
  @media (min-width: 700px) {
    right: 30px;
    position: relative to bottom;
  }

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
