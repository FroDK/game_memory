import styled, {css} from 'styled-components';
import BackgroundCard from '../images/card-background.jpg'
import {importImages} from '../lib';

const images = importImages(require.context('../images/heroes', false, /\.(png|jpe?g|svg)$/))

const Card = ({data, onClickProp}) => {
    return (
        <CardContainer onClick={e => onClickProp(e, data.index, data.i)}
                       active={data.openedCards.includes(data.index) && !data.deletedCards.includes(data.index)}
                       deleted={data.deletedCards.includes(data.index)}
        >
            <CardFront>
                <Image src={BackgroundCard} alt="BackgroundCard"/>
            </CardFront>
            <CardBack>
                <Image src={images[data.i]} alt="FacelessVoid"/>
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
  transition: all .5s;

  ${props => props.active && css`
    & :first-child {
      transform: rotateY(180deg);
    }

    & :last-child {
      transform: rotateY(360deg);
    }
  `}

  ${props => props.deleted && css`
    width: 0;
    height: 0;
  `}
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