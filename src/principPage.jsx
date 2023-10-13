import * as React from 'react';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Grid } from '@mui/material';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import { useEffect } from 'react';
import { useMediaQuery } from '@mui/material';
// import { GetProgramme } from './APIs/getInfoEvent';
import GridIitems from './components/gridtims';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
import VideocamIcon from '@mui/icons-material/Videocam';
import ImageIcon from '@mui/icons-material/Image';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';
// import StarRateIcon from '@mui/icons-material/StarRate';
import ErrorIcon from '@mui/icons-material/Error';
import BasicModal from './CreateBarCode';
import ImageHeader from './components/imageheader';
const Options = () => {
  // resposive 
  const isSmallScreen = useMediaQuery('(max-width: 300px)');
  const isMediumScreen = useMediaQuery('(min-width: 301px) and (max-width: 600px)');

  const CACHE_NAME = 'version-1';
  const navigate = useNavigate();
// check if i have mykey in the cache if not well be naviget to root index and recuperer the value
  const [barcodeValue, setBarcodeValue] = useState('');
  useEffect(() => {
    caches.open(CACHE_NAME)
      .then((cache) => {
        cache.match('mykey')
          .then((response) => {
            if (response) {
              return response.json();
            } else {
              navigate('/');
            }
          })
          .then((data) => {
            if (data) {
              const mapData = new Map(data);
              setBarcodeValue(mapData.get('mykey'));
            }
          })
          .catch((error) => {
            console.error('Error reading from cache:', error);
          });
      });
  });


  return (
    <Box>
      <style>{`
  .Options {
    background-color: #EEEEF6;
    color: #B4BDCE;
    box-shadow: none;
    border-radius: 20px;
    padding: 0;
    height: auto; /* Set height to auto */
    width: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 5px;
    position: relative;
    box-sizing: border-box;
  }

  /* Calculate padding-top based on width */
  .Options::before {
    content: '';
    display: block;
    padding-top: 100%; /* This will make the height equal to the width */
  }
`}</style>
      <Box
        sx={{
          width: "100%",
          height: "35vh",
          minHeight: '250px',
          bgcolor: '#18202D',
          // backgroundImage: `, url(${Event.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
          opacity: 0.9, // Set the desired opacity value
        }}
      >
        <Button
          style={{
            position: 'absolute',
            top: '10%',
            right: '5%',
            width: '50px',
            height: '50px',
            zIndex: 1000,
          }}


        >
          <BasicModal code={barcodeValue}/>
        </Button>

        <Box
          style={{
            marginLeft: "5%",
            position: 'absolute',
            top: '10%',
            left: '0',
            color: "white"
          }}>
          <Typography variant="h6" fontWeight={'bold'} >
            Alaa Zerroud
          </Typography>
          <Typography variant="body2" >
            Chef de projet
          </Typography>
        </Box>
        <ImageHeader bottom={isSmallScreen ? '-20%' : (isMediumScreen ? '-22%' : '-32%')}/>
      </Box>


      <Box sx={{ flexGrow: 1, padding: '23% 5% 5% 5%' , paddingTop:isSmallScreen ? '23%' : (isMediumScreen ? '23%' : '17%')}}>
        <Grid container rowSpacing={4} columnSpacing={0.5}>
          <GridIitems  titre="prgramme" />
          <GridIitems icon=<InsertInvitationIcon sx={{ fontSize: 35 }} /> titre="Atelier" />
          <GridIitems icon=<VideocamIcon sx={{ fontSize: 35 }} /> titre="direct" />
          <GridIitems icon=<ImageIcon sx={{ fontSize: 35 }} /> titre="galerie" />
          <GridIitems icon=<PeopleAltIcon sx={{ fontSize: 35 }} /> titre="Conférenciers" />
          <GridIitems icon=<ContactEmergencyIcon sx={{ fontSize: 35 }} /> titre="Exposants" />
          <GridIitems icon=<QuestionMarkIcon sx={{ fontSize: 35 }} /> titre="e-poster" />
          {/* <GridIitems icon=<StarRateIcon sx={{ fontSize: 35 }} /> titre="Favoris" /> */}
          <GridIitems icon=<QrCodeScannerIcon sx={{ fontSize: 35 }} /> titre="Scanner" />
          <GridIitems icon=<ErrorIcon sx={{ fontSize: 35 }} /> titre="À propos" />
        </Grid>
      </Box>
    </Box>
  );
};

export default Options;
