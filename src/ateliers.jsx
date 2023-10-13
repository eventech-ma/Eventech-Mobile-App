import * as React from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Titre from './components/title';
import { GetAtelier } from './APIs/getInfoEvent';


const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  // margin: theme.spacing(1),
  marginBottom: theme.spacing(2),
  textAlign: 'start',
  boxShadow: 'none',
  color: '#556C8B',
  backgroundColor: "#EEEEF6",
  borderRadius: "15px",
  // height: "100%", // Set a fixed height
  width: "100%", // Set a fixed width
  minWidth: "120px", // Set a fixed
  // marginBottom: "20px", // Set a
}));

const ItemContainer = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  display: 'flex',
  color: '#556C8B',
  justifyContent: 'space-between',
  alignItems: 'center', 
  padding: theme.spacing(1),
  textAlign: 'start',
  boxShadow: 'none',
  borderRadius: '0px',
  backgroundColor: "#EEEEF6",
  fontWeight: 'bold',
}));

const Titres = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  paddingTop: theme.spacing(2),
  margin: theme.spacing(3),
  marginLeft: theme.spacing(0),
  marginRight: theme.spacing(0),
  height: '35px',
  textAlign: 'center',
  backgroundColor: '#556C8B',
  color: "white",
  boxShadow: 'none',
  borderRadius: '10px',
  width: '100vw',
  minWidth: '100px',
}));


function RowAndColumnSpacing() {


  const [loading, setLoading] = React.useState(true); 
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    GetAtelier()
      .then((result) => {
        if (result) {
          console.log('GetAteliers');
          console.log(result);
          setData(result);
          setLoading(false);
        } else {
          console.log("Non trouvé");
        }
      });
  }, []);


  const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));


  function formatDateStringWithDetails(dateString) {
    const date = new Date(dateString);

    const options = {
      weekday: 'long', // Display the full name of the day (e.g., "Monday").
      day: '2-digit',   // Display the day as two digits (e.g., "01").
      month: 'long',    // Display the full name of the month (e.g., "January").
      year: 'numeric',  // Display the year in numeric format (e.g., "23" for 2023).
    };

    return date.toLocaleDateString('fr-FR', options);
  }
  let previousDate = null; // Initialize the previousDate variable
  return (
    <Box sx={{ width: '100vw' }}>
      {loading ? ( 
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container rowSpacing={0} columnSpacing={{ xs: 0, sm: 0, md: 0 }} padding={2} paddingTop={8}>
          {sortedData.map((item, index) => {
            const shouldRenderDate = item.date !== previousDate; // Check if the date is different

            if (shouldRenderDate) {
              previousDate = item.date; // Update previousDate
            }

            return (
              <React.Fragment key={index}>
                {shouldRenderDate ? (
                  <Box display={'flex'} justifyContent={'center'} width={'100%'} textAlign={'center'}>
                    <Typography variant="body1" marginTop={8} fontWeight={'20px'} fontSize={30} color={'#556C8B'}>
                      {formatDateStringWithDetails(item.date)}
                    </Typography>
                  </Box>
                ) : null}

                <Grid item xs={12} display={'flex'} justifyContent={'start'}>
                  <Box

                    display={'flex'}
                    flexDirection={'column'}
                    marginRight={2}
                    // marginRight={1}
                    alignItems={'center'}
                    justifyContent={'center'}
                  >
                    <Box border={'2px solid #E9EBF2'} padding={0.5} borderRadius={5}>
                      <Box bgcolor={'#EEEEF6'} padding={0.8} borderRadius={5}></Box>
                    </Box>
                    <Box borderLeft={'2px solid #E9EBF2'} marginTop={0.8} paddingTop={5}></Box>
                  </Box>
                  <Titres>{item.time_range}</Titres>
                </Grid>

                {item.speackers.map((speacke, speackersIndex) => (
                  <React.Fragment key={speackersIndex}>
                    <Grid item xs={12} display={'flex'} justifyContent={'start'}>
                      <Box

                        display={'flex'}
                        flexDirection={'column'}
                        marginRight={2}
                        alignItems={'center'}
                        justifyContent={'center'}
                      >
                        <Box padding={0.5} borderRadius={5}>
                          <Box bgcolor={'#EEEEF6'} padding={1} borderRadius={5}></Box>
                        </Box>
                        <Box borderLeft={'2px solid #E9EBF2'} marginTop={1} paddingTop={10}></Box>
                      </Box>
                      <Item>
                        <ItemContainer>
                          <Box>{item.sale}</Box>
                          <Box>{item.titre}</Box>
                        </ItemContainer>
                        {speacke.label}
                        {speacke.animateur.map((animateur, animateurIndex) => (
                          <div key={animateurIndex}>
                            <strong style={{ fontSize: "17px" }}>{animateur}</strong>
                          </div>
                        ))}
                      </Item>
                    </Grid>
                  </React.Fragment>
                ))}
              </React.Fragment>
            );
          })}
        </Grid>)};
    </Box>
  );
}


const Atelier = () => {
  return (
    <>
      <Titre titre="Atelier" />
      <RowAndColumnSpacing />
    </>
  );
};

export default Atelier;