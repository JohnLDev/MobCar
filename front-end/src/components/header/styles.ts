import styled from 'styled-components'

interface SideBarProps {
  open: boolean
}
export const HeaderDiv = styled.div<SideBarProps>`
  height: 60px;
  width: 100%;

  display: flex;
  justify-content: space-between;
  z-index: 5;

  background-color: #000000;
  .force-space {
    height: 19.8px;
    width: 19.8px;
    margin-left: 18.75px;
    margin-top: 21.75px;
  }
  .central {
    display: flex;
    flex-direction: column;
    align-items: center;

    margin-top: 11.3px;

    img {
      margin-bottom: 1.1px;
      height: 19.8px;
      width: 19.8px;
    }
    p {
      color: #00adee;
    }
  }
  .sidebar-button {
    height: 16.5px;
    width: 18.75px;
    background: 0;
    border: 0;
    margin-right: 18.75px;
    margin-top: 21.75px;
    img {
      max-height: 16.5px;
      max-width: 18.75px;
      transform: ${props => (props.open ? 'scaleX(-1)' : null)};
    }
  }
`
export const SideBar = styled.div<SideBarProps>`
  max-width: 320px;
  width: 100%;
  top: 60px;
  right: ${props => (props.open ? '0' : '-320px')};
  display: flex;
  position: fixed;
  height: 100%;
  background: #fff;
  box-shadow: 0px 2px 8px rgba(122, 122, 122, 0.15);
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  transition: right 0.4s;

  flex-direction: column;
  align-items: center;

  z-index: 2;
  @media (min-width: 700px) {
    max-width: 435px;
    right: ${props => (props.open ? '0' : '-435px')};
  }
`
export const LoginDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .login {
    display: flex;
    width: 60%;
    justify-content: space-between;
  }
`

export const AdminPanelTitle = styled.h3`
  margin-top: 32px;
  margin-bottom: 32px;
`

export const Welcome = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;

  align-items: center;
  .logout {
    margin-top: 8px;
    margin-right: 8px;
    margin-bottom: 36px;
    display: flex;

    justify-content: flex-end;
    width: 100%;
  }
`
