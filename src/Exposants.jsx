
import * as React from 'react';
import Titre from './components/title';
import { Box, Grid, Paper, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import { GetProgramme } from './APIs/getInfoEvent';

const Exposants = () => {
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
    width: "180px",
    height: "200px",
    margin: "10px",
  }));

  const [itemData, setItem] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    GetProgramme({ lien: 'exposant/mobile/list' })
      .then((result) => {
        if (result) {
          setItem(result);
          setLoading(false);
        } else {
          console.error("Non trouvé");
        }
      });
  }, []);
  // default image if non trouver
  const handleImageError = (event) => {
    event.target.src = './images/logo1.jpg';
  };

  return (
    <Box>
      <Titre titre="Exposants" />
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
                  <img src={item.logo} alt={item.nom} width={"100%"} style={{ maxHeight: 200, minHeight: 200, objectFit: 'cover', borderRadius: '15px', backgroundColor: 'white' }} onError={handleImageError} />
                </Item>
              </Grid>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default Exposants;
