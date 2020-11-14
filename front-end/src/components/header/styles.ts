import styled from 'styled-components'

export const HeaderDiv = styled.div`
  height: 60px;
  width: 100%;

  display: flex;
  justify-content: space-between;

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
    }
  }
`
