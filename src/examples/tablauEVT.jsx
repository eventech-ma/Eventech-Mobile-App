import * as React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Container,
  Divider,
  css,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

const TitleCentered = styled(Typography)(
  css`
    width: 100%;
    text-align: center;
    margin-top: 1rem;
    ${'' /* border-bottom: 1px solid black; */}
    padding-bottom: 0rem;
  `
);




  const data = [
    {
      heure: "07h30-08h30",
      evenement: "Accueil des congressistes - Breakfast with the expert",
    },
    {
      heure: "08h30-09h00",
      evenement: "Breakfast 1",
      speaker: "kératoconjonctivites F.Chiambaretta",
    },
    {
      heure: "09h00-09h30",
      evenement: "Breakfast 2",
      speaker: "Œil et virus  M.Labetoulle",
    },
    {
      heure: "09h30-10h00",
      evenement: "Breakfast 3",
      speaker: "Chirurgie réfractive  M.Shafik Shaheen",
    },
    {
      heure: "10h00-10h30",
      evenement: "Breakfast 4",
      speaker: "Œil sec  S.Lazreg",
    },
  ];





function RowAndColumnSpacing() {
  return (

    <Box sx={{ width: '100%' }}>

<Container>
      <TitleCentered variant="h6" gutterBottom>
        <Divider />
        VENDREDI 26 MAI 2023
        <Divider />
      </TitleCentered>
    </Container>


    <Table sx={{ mt: 2 }}>
        <TableHead>
          <TableRow>
            <TableCell>Heure</TableCell>
            <TableCell>Événement</TableCell>
            <TableCell>Speaker</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, i) => (
            <TableRow key={i}>
              <TableCell>{row.heure}</TableCell>
              <TableCell>{row.evenement}</TableCell>
              <TableCell>{row.speaker}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
     
    </Box>
  );
}

const App = () => {
  return (
    <>
      <Box  >
      <Typography padding={"12% 2%"} variant="h6" textAlign={'center'} >logo</Typography>

      </Box>
      <RowAndColumnSpacing />
    </>
  );
};


const Favoris = () => {
  return (
    <div>
    <App />
    </div>
  )
}

export default Favoris