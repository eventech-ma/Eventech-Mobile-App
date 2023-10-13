
import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function createData(name, calories, fat, carbs, protein, price) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    history: [
      {
        date: '2020-01-05',
        customerId: '11091700',
        amount: 3,
      },
      {
        date: '2020-01-02',
        customerId: 'Anonymous',
        amount: 1,
      },
    ],
  };
}

const data1 = [
  {
    heure: "14h00-14h45",
    Ateliers: [
      {
        Atelier: "SALLE 1",
        details: "Gestion des kératites compliquées et des retards de cicatrisation   ",
        speaker: "  F.Majo/S.Idmane",
        tamps: "45min"
      },
      {
        Atelier: "SALLE 2",
        details: "Smile Surgery : limitations and recent technological advances   ",
        speaker: "  M.Shafik Shaheen",
        tamps: "45min"
      },
      {
        Atelier: "SALLE 3",
        details: "mplant phaque de A à Z  ",
        speaker: "   P.khamar",
        tamps: "45min"
      },
      {
        Atelier: "SALLE 4",
        details: "Ulcères chroniques de la cornée ",
        speaker: "S.Lazreg/M.Harouch",
        tamps: "45min"
      },
      {
        Atelier: "SALLE 5",
        details: "State of Art the surgical treatment  ",
        speaker: "N.Ragaei",
        tamps: "45min"
      },
    ],

  },
  {
    heure: "14h50-15h35",
    Ateliers: [
      {
        Atelier: "SALLE 1",
        details: "Gestion des kératites compliquées et des retards de cicatrisation   ",
        speaker: "  F.Majo/S.Idmane",
        tamps: "45min"
      },
      {
        Atelier: "SALLE 2",
        details: "Smile Surgery : limitations and recent technological advances   ",
        speaker: "  M.Shafik Shaheen",
        tamps: "45min"
      },
      {
        Atelier: "SALLE 3",
        details: "mplant phaque de A à Z  ",
        speaker: "   P.khamar",
        tamps: "45min"
      },
      {
        Atelier: "SALLE 4",
        details: "Ulcères chroniques de la cornée ",
        speaker: "S.Lazreg/M.Harouch",
        tamps: "45min"
      },
      {
        Atelier: "SALLE 5",
        details: "State of Art the surgical treatment  ",
        speaker: "N.Ragaei",
        tamps: "45min"
      },
    ],

  }
];

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.calories}</TableCell>
        <TableCell align="right">{row.fat}</TableCell>
    
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Customer</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>

                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }),
    ).isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

const rows = [
  createData('Frozen yoghurt', 159, 6.0,  3.99),
  createData('Ice cream sandwich', 237, 9.0,  4.99),
  createData('Eclair', 262, 16.0,  3.79),
  createData('Cupcake', 305, 3.7, 2.5),
  createData('Gingerbread', 356, 16.0,  1.5),
];

export default function Eposter() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Dessert </TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

{/* <Box>
<Titre titre="Endirect" />
<Box display={'flex'} flexDirection={'column'} alignItems={'center'} paddingTop={'15vh'}>
  <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
    <Box bgcolor={'#556C8B'} padding={3} borderRadius={'50%'} width={'150px'} height={'150px'}>
      <Box bgcolor={'#6F8DAF'} padding={3} borderRadius={'50%'} width={'100px'} height={'100px'}>
        <Box bgcolor={'#99AFC6'} padding={3} borderRadius={'50%'} width={'50px'} height={'50px'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
          <PlayArrowIcon sx={{ color: '#fff', fontSize: 100 }} />
        </Box>
      </Box>
    </Box>
    <Box position={'absolute'} bottom={30} display={'flex'} alignItems={'center'} flexDirection={'column'} width={'100vw'}>
      <Button variant="outlined" style={{ borderRadius: 50, width: isMediumScreen ? '70%' : '50%', minWidth: '200px', maxWidth: '400px', marginBottom: '20px', paddingTop: '10px', paddingBottom: '10px', color: '#556C8B', textTransform: 'none' }} >démarrer le live</Button>
      <Button variant="contained" style={{ borderRadius: 50, width: isMediumScreen ? '70%' : '50%', minWidth: '200px', maxWidth: '400px', paddingTop: '10px', paddingBottom: '10px', backgroundColor: '#556C8B', textTransform: 'none' }} >choisir la salle</Button>
    </Box>
  </Box>
</Box>
</Box> */}