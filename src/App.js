import React, { useEffect } from 'react';
import { Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getToken } from 'firebase/messaging';
import { messaging } from './firebase';
import { useMediaQuery } from '@mui/material';
import MyComponent from './APIs/connection';
import './App.css';
function App() {
  // called api connection 
  MyComponent();
  // do responsive for page
  const isSmallScreen = useMediaQuery('(max-width: 600px)');
  // ask for permissiom to notify and log in console
  async function askPermission() {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const token = await getToken(messaging, { vapidKey: "BEi05JLkhFymfwjlIYUeu12hGGCbqDCipWSs7RwuBUYQsrCF5FCdiPKDAGtd5Whrd4WjtzR-dLss_MpJEzGaRLA" });
      console.log(token);
    } else if (permission === "denied") {
      console.error("Permission denied");
    }
  };
  useEffect(() => {
    askPermission();
  }, []);
  // check if alredy have key or no so if exists well be navegate to /app sinon 
  const navigate = useNavigate();
  useEffect(() => {
    const CACHE_NAME = 'version-1';
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        return cache.match('mykey');
      })
      .then((response) => {
        if (response) {
          navigate('/app');
        }
      })
      .catch((error) => {
        console.error('Error reading from cache:', error);
      });
  });

  return (
    <Box
      maxHeight="80vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      padding={isSmallScreen ? '16px' : '32px'} // Adjust padding for small screens
    >
      <style>
        {`
          body {
            background-color: #192229;
          }
        `}
      </style>

      <Box
        component="img"
        sx={{
          height: "auto",
          width: '50%',
          maxHeight: { xs: '400px', md: '400px' },
        }}
        style={{
          position: "absolute",
          top: "1%",
        }}
        alt="The house from the offer."
        src="./images/logo1.jpg"
      />

      <Button onClick={() => {
        navigate('/scanner');
      }}
        variant="contained" style={{ borderRadius: 50, width: isSmallScreen ? '80%' : 'auto', minWidth: '200px', maxWidth: '400px', paddingTop: '10px', paddingBottom: '10px', backgroundColor: '#556C8B', textTransform: 'none', position: 'absolute', bottom: isSmallScreen ? '10%' : '5%', color: 'white' }}>
        Get started
      </Button>
    </Box>
  );
}

export default App;
