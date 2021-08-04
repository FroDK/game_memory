import styled from 'styled-components'
import {useEffect, useState} from "react";
import moment from 'moment';
import ClipLoader from "react-spinners/ClipLoader";
import Button from "./Button";
import {convertToTime} from '../lib'

const MAX_TABLE_SIZE = 10

const TableRecords = ({score, timer}) => {
    const [isNewRecord, setIsNewRecord] = useState(false)
    const [isLoadedAndSavedData, setIsLoadedAndSavedData] = useState(false)
    const [records, setRecords] = useState([])

    useEffect(() => {
        let recordsTemp = [];
        const saveData = {dateTime: moment(new Date()).format('LLL'), score, timer}

        const sortArray = ({score: a}, {score: b}) => {
            if (a > b) return 1
            if (a === b) return 0
            if (a < b) return -1
        }

        const sortArrayReverse = ({score: a}, {score: b}) => {
            if (a > b) return -1
            if (a === b) return 0
            if (a < b) return 1
        }

        // If locale storage not empty
        if (localStorage.getItem('records')) {
            recordsTemp = JSON.parse(localStorage.getItem('records'))

            setIsNewRecord(false)
            setRecords(recordsTemp)
            setIsLoadedAndSavedData(true)

            // If table of records does not include current score
            if ((!recordsTemp.map(i => i.score).includes(score))) {
                if ((recordsTemp.length >= MAX_TABLE_SIZE) && (Math.min(...recordsTemp.map(i => i.score)) < score)) {
                    recordsTemp.sort(sortArray)
                    recordsTemp = [...recordsTemp.slice(1, recordsTemp.length), saveData]
                } else {
                    recordsTemp.push(saveData)
                }

                recordsTemp.sort(sortArrayReverse)
                localStorage.setItem('records', JSON.stringify(recordsTemp))
                setRecords(recordsTemp)
                setIsNewRecord(true)
                setIsLoadedAndSavedData(true)
            }

        } else {
            recordsTemp.push(saveData)
            localStorage.setItem('records', JSON.stringify(recordsTemp))
            setRecords(recordsTemp)
            setIsNewRecord(true)
            setIsLoadedAndSavedData(true)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <Container>
            {
                isLoadedAndSavedData ?
                    <>
                        <Score>You score: {score}</Score>
                        <NewRecord>{isNewRecord ? 'You have a new record' : 'A new record was not received'}</NewRecord>
                        <TableHeader>
                            <Table cellPadding="0" cellSpacing="0" border="0">
                                <thead>
                                <tr>
                                    <TH>Date Time</TH>
                                    <TH>Score</TH>
                                    <TH>Time</TH>
                                </tr>
                                </thead>
                            </Table>
                        </TableHeader>
                        <TableContent>
                            <Table cellPadding="0" cellSpacing="0" border="0">
                                <tbody>
                                {
                                    records.map((item, index) =>
                                        <TR key={index} active={item.score === score && isNewRecord}>
                                            <TD>{item.dateTime}</TD>
                                            <TD>{item.score}</TD>
                                            <TD>{convertToTime(timer)}</TD>
                                        </TR>
                                    )
                                }
                                </tbody>
                            </Table>
                        </TableContent>
                        <ButtonContainer>
                            <Button warning onClick={() => window.location.reload()}>Start again</Button>
                        </ButtonContainer>
                    </>
                    :
                    <ClipLoader loading={true} color={'#F6AD06'} size={100}/>
            }

        </Container>
    )
}

export default TableRecords;


const Container = styled.div`
  text-align: center;
  width: 30%;
`

const ButtonContainer = styled.div`
  margin-top: 25px;
`

const Score = styled.h1`
  background-color: #FBAB7E;
  background-image: linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

const NewRecord = styled.h3`
  background-color: #85FFBD;
  background-image: linear-gradient(45deg, #85FFBD 0%, #FFFB7D 100%);

  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

const Table = styled.table`
  width: 100%;
  table-layout: fixed;
`

const TableHeader = styled.div`
  background-color: rgba(255, 255, 255, 0.3);
`

const TableContent = styled.div`
  max-height: 500px;
  overflow-x: auto;
  margin-top: 0;
  border: 1px solid rgba(255, 255, 255, 0.3);
`

const TH = styled.th`
  padding: 20px 15px;
  text-align: left;
  font-weight: 500;
  font-size: 17px;
  color: #fff;
  text-transform: uppercase;
`

const TD = styled.td`
  padding: 15px;
  text-align: left;
  vertical-align: middle;
  font-weight: 300;
  font-size: 15px;
  color: #fff;
  border-bottom: solid 1px rgba(255, 255, 255, 0.1);
`

const TR = styled.tr`
  ${props => {
    if (props['active']) return 'background-color: rgba(183, 140, 0, .10);'
    return 'background-color: rgba(0, 0, 0, 0.1);'
  }}
`