import Container from "./components/Container";
import Card from "./components/Card";
import styled from "styled-components";
import {generateArray} from "./lib/";
import {useEffect, useState} from "react";
import useInterval from "./hooks/useInterval";

const DELAY = 100
const TIMER_SECONDS = (5000)
const RANGE_ARRAY = 6;
const SCORE_DOWNGRADE = [50, 20];

const App = () => {
    const [deletedCards, setDeletedCards] = useState([]);
    const [openedCards, setOpenedCards] = useState([]);
    const [isGameStarted] = useState(false);
    const [cardArray] = useState(generateArray(RANGE_ARRAY));
    const [seconds, setSeconds] = useState(TIMER_SECONDS);
    const [isTimerStarted, setIsTimerStarted] = useState(false);
    const [score, setScore] = useState(0);


    useEffect(() => {
        console.log("cardArray: ", cardArray);
        console.log("isGameStarted: ", isGameStarted)
    }, [cardArray, isGameStarted]);


    useEffect(() => {
        // WHEN OPENED TWO CARDS
        if (openedCards.length === 2) {
            // IF THE USER HAS SELECTED TWO IDENTICAL CARDS
            if (cardArray[openedCards[0]] === cardArray[openedCards[1]]) {
                setScore(score + Math.round(Math.sqrt(seconds))*2)
                setDeletedCards([...deletedCards, ...openedCards])
                setOpenedCards([])
                setIsTimerStarted(false)
                setSeconds(TIMER_SECONDS)
            } else {
                // SCORE DOWNGRADE
                ((score - SCORE_DOWNGRADE[0]) <= 0)
                    ? setScore(0)
                    : setScore(score - Math.round(Math.random() * (SCORE_DOWNGRADE[0] - SCORE_DOWNGRADE[1] + 1) + SCORE_DOWNGRADE[1]))
                setTimeout(() => {
                    setOpenedCards([])
                    setIsTimerStarted(false)
                    setSeconds(TIMER_SECONDS)
                }, 500)
            }
        } else if (openedCards.length >= 3) {
            setOpenedCards([])
            setIsTimerStarted(false)
            setSeconds(TIMER_SECONDS)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [openedCards])

    useEffect(() => {
        if (seconds === 0) {
            setIsTimerStarted(false)
            // setSeconds(5)
            setOpenedCards([])
        }
    }, [seconds])

    useInterval(() => {
        setSeconds(seconds - DELAY);
    }, isTimerStarted ? DELAY : null);

    // const gameStart = () => {
    //     setIsGameStarted(!isGameStarted);
    // }

    const cardClick = (e, index) => {
        if (!openedCards.includes(index)) {
            setOpenedCards([...openedCards, index]);

            if (openedCards.length === 0) {
                setIsTimerStarted(true)
            }
        }
    }

    // console.log("Opened Cards: ", openedCards);
    // console.log('Seconds: ', seconds)
    // console.log("SCORE: ", score)

    return (
        <Container>
            <ScoreText>Score: {score}</ScoreText>
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
                                  deletedCards,
                              }}
                        >{index + 1}</Card>
                    )}
                </CardContainer>
                // :
                // <ButtonContainer>
                //     <Button info onClick={gameStart}>Start game</Button>
                // </ButtonContainer>
            }
            {/*<TimerText>{seconds ? seconds : 'Time left'}</TimerText>*/}
            <LoadingBar seconds={seconds}/>
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
  justify-content: center;
  align-items: center;
  grid-template-columns: repeat(3, 1fr);
`;

const ScoreText = styled.h1`
  color: #FEE140;
`;

// const TimerText = styled.h1`
//   color: #FA709A;
// `;

/**
 * @param {{seconds:number}} props
 */
const LoadingBar = styled.div`
  
  margin: 2rem 0;
  height: 20px;
  width: ${props => {
    return (780 / TIMER_SECONDS * props["seconds"])
  }}px;
  border-radius: 3px;
  background-image: linear-gradient(to right, #fa709a 0%, #fee140 100%);
  box-shadow: rgba(17, 12, 46, 0.15) 0 48px 100px 0;
  transition: all .1s;
`;