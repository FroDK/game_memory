import Container from "./components/Container";
// import Button from "./components/Button";
import Card from "./components/Card";
import styled from "styled-components";
import CryptoJS from 'crypto-js';
import {generateArray, genRanHex} from "./lib/";
import {useEffect, useState} from "react";

const App = () => {
    const RANGE_ARRAY = 6;
    const [hexKey] = useState(genRanHex())
    const [openedCards, SetOpenedCards] = useState([]);
    const [isGameStarted] = useState(false);
    const [cardArray] = useState(generateArray(RANGE_ARRAY));


    useEffect(() => {
        console.log("cardArray: ", cardArray);
        console.log("isGameStarted: ", isGameStarted)
    }, [cardArray, isGameStarted]);

    useEffect(() => {
        if (openedCards.length >= 2) {
            SetOpenedCards([]);
        }
    }, [openedCards])

    // const gameStart = () => {
    //     setIsGameStarted(!isGameStarted);
    // }

    const cardClick = (e) => {
        console.log(e.currentTarget.id)
        console.log(CryptoJS.AES.decrypt(e.currentTarget.id, hexKey).toString(CryptoJS.enc.Utf8))
        console.log(e.currentTarget.getAttribute('index'))

        if (e.currentTarget.index !== openedCards[0]) {
            SetOpenedCards([...openedCards, e.currentTarget.index]);
        }
    }

    console.log("Opened Cards: ", openedCards);

    return (
        <Container>
            {
                // isGameStarted ?
                <CardContainer>
                    {cardArray.map((i, index) =>
                        <Card onClickProp={cardClick} key={index}
                              data={{
                                  i: CryptoJS.AES.encrypt(`${i}`, hexKey).toString(),
                                  index: index
                              }}
                              hexKey={hexKey}>{index + 1}</Card>
                    )}
                </CardContainer>
                // :
                // <ButtonContainer>
                //     <Button info onClick={gameStart}>Start game</Button>
                // </ButtonContainer>
            }

        </Container>
    );
}

export default App;

// const ButtonContainer = styled.div`
// width: 256px;
// height: 64px;
// `;

const CardContainer = styled.div`
display: grid;
grid-gap: 15px;
grid-template-columns: repeat(3, 1fr);
`;