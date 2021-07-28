import styled from 'styled-components'

const TableRecords = () => {

    return (
        <Container>
            <TableH1>Table of records</TableH1>
            <TableHeader>
                <Table cellPadding="0" cellSpacing="0" border="0">
                    <thead>
                    <tr>
                        <TH>Nickname</TH>
                        <TH>Score</TH>
                    </tr>
                    </thead>
                </Table>
            </TableHeader>
            <TableContent>
                <Table cellPadding="0" cellSpacing="0" border="0">
                    <tbody>
                    <TR>
                        <TD>AAC</TD>
                        <TD>AUSTRALIAN COMPANY</TD>
                    </TR>
                    <TR>
                        <TD>AAD</TD>
                        <TD>AUSENCO</TD>
                    </TR>
                    <TR>
                        <TD>AAX</TD>
                        <TD>ADELAIDE</TD>
                    </TR>
                    <TR>
                        <TD>XXD</TD>
                        <TD>ADITYA BIRLA</TD>
                    </TR>
                    <TR>
                        <TD>AAC</TD>
                        <TD>AUSTRALIAN COMPANY</TD>
                    </TR>
                    <TR>
                        <TD>AAD</TD>
                        <TD>AUSENCO</TD>
                    </TR>
                    <TR>
                        <TD>AAX</TD>
                        <TD>ADELAIDE</TD>
                    </TR>
                    <TR>
                        <TD>XXD</TD>
                        <TD>ADITYA BIRLA</TD>
                    </TR>
                    <TR>
                        <TD>AAC</TD>
                        <TD>AUSTRALIAN COMPANY</TD>
                    </TR>
                    <TR>
                        <TD>AAD</TD>
                        <TD>AUSENCO</TD>
                    </TR>
                    <TR>
                        <TD>AAX</TD>
                        <TD>ADELAIDE</TD>
                    </TR>
                    <TR>
                        <TD>XXD</TD>
                        <TD>ADITYA BIRLA</TD>
                    </TR>
                    <TR>
                        <TD>AAC</TD>
                        <TD>AUSTRALIAN COMPANY</TD>
                    </TR>
                    <TR>
                        <TD>AAD</TD>
                        <TD>AUSENCO</TD>
                    </TR>
                    <TR>
                        <TD>AAX</TD>
                        <TD>ADELAIDE</TD>
                    </TR>
                    <TR>
                        <TD>XXD</TD>
                        <TD>ADITYA BIRLA</TD>
                    </TR>
                    <TR>
                        <TD>AAC</TD>
                        <TD>AUSTRALIAN COMPANY</TD>
                    </TR>
                    <TR>
                        <TD>AAD</TD>
                        <TD>AUSENCO</TD>
                    </TR>
                    <TR>
                        <TD>AAX</TD>
                        <TD>ADELAIDE</TD>
                    </TR>
                    <TR>
                        <TD>XXD</TD>
                        <TD>ADITYA BIRLA</TD>
                    </TR>
                    <TR>
                        <TD>AAC</TD>
                        <TD>AUSTRALIAN COMPANY</TD>
                    </TR>
                    <TR>
                        <TD>AAD</TD>
                        <TD>AUSENCO</TD>
                    </TR>
                    <TR>
                        <TD>AAX</TD>
                        <TD>ADELAIDE</TD>
                    </TR>
                    <TR>
                        <TD>XXD</TD>
                        <TD>ADITYA BIRLA</TD>
                    </TR>
                    <TR>
                        <TD>AAC</TD>
                        <TD>AUSTRALIAN COMPANY</TD>
                    </TR>
                    <TR>
                        <TD>AAD</TD>
                        <TD>AUSENCO</TD>
                    </TR>
                    <TR>
                        <TD>AAX</TD>
                        <TD>ADELAIDE</TD>
                    </TR>
                    <TR>
                        <TD>XXD</TD>
                        <TD>ADITYA BIRLA</TD>
                    </TR>
                    <TR>
                        <TD>AAC</TD>
                        <TD>AUSTRALIAN COMPANY</TD>
                    </TR>
                    <TR>
                        <TD>AAD</TD>
                        <TD>AUSENCO</TD>
                    </TR>
                    <TR>
                        <TD>AAX</TD>
                        <TD>ADELAIDE</TD>
                    </TR>
                    <TR>
                        <TD>XXD</TD>
                        <TD>ADITYA BIRLA</TD>
                    </TR>
                    </tbody>
                </Table>
            </TableContent>
        </Container>
    )
}

export default TableRecords;


const Container = styled.div`
  width: 30%;
`

const Table = styled.table`
  width:100%;
  table-layout: fixed;
`

const TableHeader = styled.div`
  background-color: rgba(255,255,255,0.3);
`

const TableContent = styled.div`
  height:300px;
  overflow-x:auto;
  margin-top: 0;
  border: 1px solid rgba(255,255,255,0.3);
`

const TH = styled.th`
  padding: 20px 15px;
  text-align: left;
  font-weight: 500;
  font-size: 12px;
  color: #fff;
  text-transform: uppercase;
`

const TD = styled.td`
  padding: 15px;
  text-align: left;
  vertical-align:middle;
  font-weight: 300;
  font-size: 12px;
  color: #fff;
  border-bottom: solid 1px rgba(255,255,255,0.1);
`

const TR = styled.tr`
  ${props => {
    if (props['active']) return 'background-color: rgba(0, 109, 183, 0.1);'
    return 'background-color: rgba(0, 0, 0, 0.1);'
  }}
`

const TableH1 = styled.h1`
  font-size: 30px;
  color: #fff;
  text-transform: uppercase;
  font-weight: 300;
  text-align: center;
  margin-bottom: 15px;
`