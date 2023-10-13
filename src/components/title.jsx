import * as React from 'react';
import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
import ImageHeader from './imageheader';
const Titre = (props) => {
  const navigate = useNavigate(); // Get the navigation function
  const isSmallScreen = useMediaQuery('(max-width: 300px)');
  const isMediumScreen = useMediaQuery('(min-width: 301px) and (max-width: 600px)');
  const handleLogout = () => {
    navigate('/App');
  };
  return (
    <Box
      sx={{
        width: "100%",
        height: "30vh",
        minHeight: '200px',
        bgcolor: '#18202D',
        // backgroundImage: `, url(${Event.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        opacity: 0.9, // Set the desired opacity value
      }}
    >
      <Button
        variant="contained"
        style={{
          position: 'relative',
          top: '10%',
          left: '5%',
          width: '30px',
          height: '65px',
          color: '#fff',
          backgroundColor: '#556C8B',
          borderRadius: '50%',
          zIndex: 1000,
        }}
        onClick={() => {
          handleLogout();
        }}

      >
        <KeyboardBackspaceOutlinedIcon style={{ color: "#fff", width: '50px' }} />
      </Button>

      <ImageHeader bottom={isSmallScreen ? '-13%' : (isMediumScreen ? '-15%' : '-25%')} Titre={props.titre}/>

    </Box>
  )
}

export default Titre