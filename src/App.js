import Container from "./components/Container";
import Card from "./components/Card";
import styled from "styled-components";
import {generateArray, convertToTime} from "./lib/";
import {useEffect, useRef, useState} from "react";
import useInterval from "./hooks/useInterval";
import Button from "./components/Button";
import TableRecords from "./components/TableRecords";
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/react";

const overrideSpinner = css`
  margin-top: 15px;
`

// delay for use interval
const DELAY = 1000
// total timer second
const TIMER_SECONDS = (5)
// length is unique indexes e.g. (6+6=12 total pairs of cards)
const RANGE_ARRAY = 18;
// random decrease score between these values
const SCORE_DECREASE = [15, 5];

const App = () => {
    const gridRef = useRef()
    const [isGameEnded, setIsGameEnded] = useState(false)
    const [canOpenCards, setCanOpenCards] = useState(true)
    const [deletedCards, setDeletedCards] = useState([]);
    const [openedCards, setOpenedCards] = useState([]);
    const [openedCardsForCloseAnimation, setOpenedCardsForCloseAnimation] = useState([]);
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [cardArray] = useState(generateArray(RANGE_ARRAY));
    const [seconds, setSeconds] = useState(TIMER_SECONDS);
    const [timer, setTimer] = useState(0)
    const [isTimerStarted, setIsTimerStarted] = useState(false);
    const [score, setScore] = useState(0);

    // MAIN LOGIC
    useEffect(() => {
        // WHEN OPENED TWO CARDS
        if (openedCards.length === 2) {
            setCanOpenCards(false)
            // IF THE USER HAS SELECTED TWO IDENTICAL CARDS
            if (cardArray[openedCards[0]] === cardArray[openedCards[1]]) {
                setScore(Math.round(score + Math.pow(seconds, 2.5)))
                setDeletedCards([...deletedCards, ...openedCards])
                setOpenedCards([])
                setOpenedCardsForCloseAnimation([])
                setIsTimerStarted(false)
                setSeconds(TIMER_SECONDS)
                setCanOpenCards(true)
            } else {
                // SCORE DECREASE
                ((score - SCORE_DECREASE[0]) <= 0)
                    ? setScore(0)
                    : setScore(score - Math.round(Math.random() * (SCORE_DECREASE[0] - SCORE_DECREASE[1] + 1) + SCORE_DECREASE[1]))
                // SET TIMEOUT required to delay the closing animation
                setTimeout(() => {
                    setOpenedCardsForCloseAnimation([])
                    setCanOpenCards(true)
                }, 700)
                setTimeout(() => {
                    setOpenedCards([])
                    setIsTimerStarted(false)
                    setSeconds(TIMER_SECONDS)
                }, 500)
            }
            // IF USER OPENS THIRD CARD THEN CLOSE IT
        }
        if (openedCards.length >= 3) {
            setTimeout(() => {
                setOpenedCardsForCloseAnimation([])
            }, 700)
            setOpenedCards([])
            setIsTimerStarted(false)
            setSeconds(TIMER_SECONDS)
        }
        if (openedCards.length === 0 && deletedCards.length === (RANGE_ARRAY * 2)) {
            setIsGameEnded(true)
        }

        // ЧТОБЫ НАЩАЛЬНИКА НЕ РУГАЛСЯ
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [openedCards])


    // USE EFFECT FOR COUNT SECONDS
    useEffect(() => {
        if (seconds <= 0) {
            setCanOpenCards(false)
            setIsTimerStarted(false)
            setSeconds(5)
            setOpenedCards([])
            setTimeout(() => {
                setCanOpenCards(true)
                setOpenedCardsForCloseAnimation([])
            }, 800)
        }
    }, [seconds])

    // MY CUSTOM HOOK FOR SET INTERVAL
    useInterval(() => {
        setSeconds(seconds => seconds - 1);
    }, isTimerStarted ? DELAY : null); // if null then stop interval

    // MY CUSTOM HOOK FOR SET TIMER
    useInterval(() => {
        setTimer(timer => timer + 1);
    }, isGameEnded ? null : 1000); // if null then stop interval

    // EVERYTHING IS CLEAR HERE
    const gameStart = () => {
        setIsGameStarted(!isGameStarted);
    }

    // HANDLER FOR CARD CLICK
    const cardClick = (e, index) => {
        if (!openedCards.includes(index)) {
            setOpenedCards([...openedCards, index]);
            setOpenedCardsForCloseAnimation([...openedCards, index]);

            if (openedCards.length === 0) {
                setIsTimerStarted(true)
            }
        }
    }

    return (
        <Container>
            {
                isGameStarted ?
                    // if all cards opened
                    isGameEnded ?
                        // show table of records
                        <TableRecords score={score} timer={timer}/>
                        :
                        // else start game
                        <>
                            <ScoreText>Score: {score}</ScoreText>
                            <TimerText>Timer: {convertToTime(timer)}</TimerText>
                            <CardContainer ref={gridRef}>
                                {cardArray.map((i, index) =>
                                    <Card onClickProp={cardClick} key={index}
                                          data={{
                                              i,
                                              index,
                                              openedCards,
                                              deletedCards,
                                              openedCardsForCloseAnimation,
                                              canOpenCards,
                                          }}
                                    >{index + 1}</Card>
                                )}
                            </CardContainer>
                            { gridRef.current ? <LoadingBar width={gridRef.current?.offsetWidth} seconds={seconds}/> : <ClipLoader loading={true} color={'#F6AD06'} css={overrideSpinner} size={50}/> }
                        </>
                    :
                    // start screen
                    <ButtonContainer>
                        <Button warning onClick={gameStart}>Start game</Button>
                    </ButtonContainer>
            }
        </Container>
    );
}

export default App;

const ButtonContainer = styled.div``;

const CardContainer = styled.div`
  display: grid;
  grid-gap: 15px;
  justify-content: center;
  align-items: center;
  grid-template-columns: repeat(6, 1fr);
`;

const TimerText = styled.h2`
  margin-top: 0;
  margin-bottom: 15px;
  background-color: #85FFBD;
  background-image: linear-gradient(45deg, #85FFBD 0%, #FFFB7D 100%);

  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const ScoreText = styled.h1`
  margin-bottom: 7px;
  background-color: #FBAB7E;
  background-image: linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const LoadingBar = styled.div`

  margin: 2rem 0;
  height: 20px;
  width: ${props => {
    return (props['width'] / TIMER_SECONDS * props["seconds"])
  }}px;
  border-radius: 3px;
  background-image: linear-gradient(to right, #fa709a 0%, #fee140 100%);
  box-shadow: rgba(17, 12, 46, 0.15) 0 48px 100px 0;
  transition: all .7s;
`;