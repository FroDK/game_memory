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
    const [timer, SetTimer] = useState('');
    const [seconds, SetSeconds] = useState(5);


    useEffect(() => {
        console.log("cardArray: ", cardArray);
        console.log("isGameStarted: ", isGameStarted)
    }, [cardArray, isGameStarted]);

    // const countDown = () => {
    //     SetSeconds(seconds - 1)
    //     if (seconds === 0) {
    //         // clearInterval(timer)
    //         console.log(0)
    //     }
    // }

    // const startTimer = () => {
    //     const interval = setInterval(() => {
    //         countDown()
    //     }, 1000)
    //     SetTimer(interval)
    // }

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

            // if (openedCards.length === 0) {
            //     startTimer()
            // } else {
            //     //     setTimeout(() => {
            //     //         SetOpenedCards([]);
            //     //     }, 2000)
            //     // }
            // }
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
            </Container>
        );
    }
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