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
  button {
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
  max-width: 300px;
  width: 100%;
  top: 60px;
  right: ${props => (props.open ? '0' : '-300px')};
  display: flex;
  position: fixed;
  height: 100%;
  background: #fff;
  box-shadow: 0px 2px 8px rgba(122, 122, 122, 0.15);
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  transition: right 0.4s;

  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  z-index: 2;
`
