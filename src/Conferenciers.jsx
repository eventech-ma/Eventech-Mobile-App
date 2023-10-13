import * as React from 'react';
import Titre from './components/title';
import { Box, Typography, Grid, Paper, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import { GetSpeakersProgramme } from './APIs/getInfoEvent';

const Conferenciers = () => {

  const Item = styled(Paper)(({ theme }) => ({
    // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    // ...theme.typography.body2,
    paddingBottom: theme.spacing(0),
    paddingTop: theme.spacing(0),
    paddingLeft: theme.spacing(0),
    paddingRight: theme.spacing(0),
    textAlign: 'center',
    // color: theme.palette.text.secondary,
    color: '#fff',
    borderRadius: "15px",
    border: "none",
    boxShadow: '7px 7px 15px rgb(90,90,90)',
    backgroundColor: '#556C8B',
    width: "150px",
    height: "250px",
    margin: "10px",
  }));

  const [itemData, setItem] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    GetSpeakersProgramme('speaker')
      .then((result) => {
        if (result) {
          setItem(result);
          // Set loading state to false when data is fetched
          setLoading(false);
        } else {
          console.log("Non trouvé");
        }
      });

  }, []);

  const handleImageError = (event) => {
    event.target.src = './images/doctor_profil.png';
  };

  return (
    <Box>
      <Titre titre="Conferenciers" />
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ flexGrow: 1, paddingTop: 17 }}>
          <Box display={'flex'} flexWrap={'wrap'} justifyContent={'space-evenly'} alignItems={'center'}>
            {itemData.map((item, index) => (
              <Grid key={index}>
                <Item>
                  <img src={item.image} alt={item.nom} width={"100%"} style={{ maxHeight: 160, objectFit: 'cover', borderRadius: '15px', backgroundColor: 'white' }} onError={handleImageError} />
                  <Typography variant="h6" style={{ fontWeight: 'bold' }}>{item.nom}</Typography>
                  <Typography variant="body2" >{item.specialite}</Typography>
                </Item>
              </Grid>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default Conferenciers;
