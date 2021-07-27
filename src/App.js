import Container from "./components/Container";
// import Button from "./components/Button";
import Card from "./components/Card";
import styled from "styled-components";
import {generateArray} from "./lib/";
import {useEffect, useState} from "react";

const App = () => {
    const RANGE_ARRAY = 6;
    const [openedCards, SetOpenedCards] = useState([]);
    const [isGameStarted] = useState(false);
    const [cardArray] = useState(generateArray(RANGE_ARRAY));
    const [seconds, SetSeconds] = useState(5);


    useEffect(() => {
        console.log("cardArray: ", cardArray);
        console.log("isGameStarted: ", isGameStarted)
    }, [cardArray, isGameStarted]);

    const startTimer = () => {
        const interval = setInterval(() => {
            if (seconds !== 0) {
                SetSeconds(seconds-1)
            } else {
                clearInterval(interval)
            }
        }, 1000)
    }

    // useEffect(() => {
    //     if (openedCards.length >= 2) {
    //         SetOpenedCards([]);
    //     }
    // }, [openedCards])

    // const gameStart = () => {
    //     setIsGameStarted(!isGameStarted);
    // }

    const cardClick = (e, index, i) => {
        console.log(i)

        if (!openedCards.includes(index)) {
            SetOpenedCards([...openedCards, index]);

            if (openedCards.length === 0) {
                startTimer()
            }
        }
    }

    console.log("Opened Cards: ", openedCards);

    return (
        <Container>
            {
                // isGameStarted ?
                <CardContainer>
                    {cardArray.map((i, index) =>
                        // eslint-disable-next-line no-unused-vars
                        <Card onClickProp={cardClick} key={index}
                              data={{
                                  i,
                                  index,
                                  openedCards,
                              }}
                        >{index + 1}</Card>
                    )}
                </CardContainer>
                // :
                // <ButtonContainer>
                //     <Button info onClick={gameStart}>Start game</Button>
                // </ButtonContainer>
            }
            <h1>{seconds}</h1>
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