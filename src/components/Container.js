import styled from 'styled-components';

const Container = styled.div`
  -moz-user-select: none;
  -webkit-user-select: none;
  user-select: none;
  -webkit-user-drag: none;
  -ms-user-select: none;
  
  width: 100vw;
  height: 100vh;
  background-image: url("https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/backgrounds/greyfade.jpg");
  background-size: 100% auto;
  background-repeat: no-repeat;
  background-position: center top;
  background-attachment: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default Container;