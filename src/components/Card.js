import styled, { css } from 'styled-components';
import BackgroundCard from '../images/kartinki-dota-2-34.jpg'
import {importImages} from '../lib';
import CryptoJS from 'crypto-js';

const images = importImages(require.context('../images/heroes', false, /\.(png|jpe?g|svg)$/))

const Card = ({data, onClickProp, hexKey}) => {
    const id = CryptoJS.AES.decrypt(data.i, hexKey).toString(CryptoJS.enc.Utf8)
    console.log("OPC: ", data.openedCards)
    console.log("DTI: ", data.index)
    return (
        <CardContainer onClick={onClickProp} id={data.i} data-index={data.index} active={data.index === data.openedCards[0]}>
            <CardFront>
                <Image src={BackgroundCard} alt="BackgroundCard"/>
            </CardFront>
            <CardBack>
                <Image src={images[id]} alt="FacelessVoid"/>
            </CardBack>
        </CardContainer>
    )
}

const CardContainer = styled.div`
  position: relative;
  width: 250px;
  height: 120px;
  cursor: pointer;
  perspective: 1000px;

  ${props => props.active && css`
    & :first-child {
      transform: rotateY(180deg);
    }

    & :last-child {
      transform: rotateY(360deg);
    }
  `}
  //&:hover :first-child {
  //  transform: rotateY(180deg);
  //}
  //
  //&:hover :last-child {
  //  transform: rotateY(360deg);
  //}
  z-index: 23;
`;

const Image = styled.img`
  height: auto;
  width: 100%;
`;

const CardBase = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  border-radius: 15px;
  cursor: pointer;
  transition: transform .7s;
  backface-visibility: hidden;
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.3) 0 19px 38px, rgba(0, 0, 0, 0.22) 0 15px 12px;
`;

const CardFront = styled(CardBase)`
    z-index: 25;
`;

const CardBack = styled(CardBase)`
  transform: rotateY(180deg);
`;

export default Card;