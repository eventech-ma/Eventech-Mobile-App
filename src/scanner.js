import React, { useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import FunctionQuagga from './quaggafun';
import Functioninput from './inputsScan';
import { useMediaQuery } from '@mui/material';
import GetTents from './APIs/getTenete';
import { useNavigate } from 'react-router-dom';
import Quagga from 'quagga';
import './App.css';
function Scan() {
  // declare constants
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const [barcodeValue, setBarcodeValue] = useState('');
  const [methode, setMethode] = useState(true);
  const [lading, setLading] = useState(true);
  const navigate = useNavigate(); // Get the navigation function
  // function to add value mykey to cache 
  function addToCache(key, value) {
    const CACHE_NAME = "version-1";
    caches.open(CACHE_NAME)
      .then((cache) => {
        const data = new Map();
        data.set(key, value);
        const jsonData = JSON.stringify([...data]);
        const response = new Response(jsonData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        cache.put(key, response);
      })
      .catch((error) => {
        console.error('Error adding to cache:', error);
      });
  }
  useEffect(() => {
    // Call GetTents when barcodeValue changes
    if (barcodeValue) {
      setLading(true);
      GetTents({ codebar: barcodeValue })
        .then((result) => {
          if (result === "existing") {
            Quagga.stop();
            addToCache("mykey", barcodeValue)
            navigate('/app'); // Navigate to the root /app

          } else {
            console.log("Non trouvé");
            setLading(false);
          }
        });
    }
  }, [barcodeValue, navigate]);
  // Callback function to update barcodeValue state
  const handleBarcodeScanned = (value) => {
    setBarcodeValue(value);
  };



  return (
    <Box
      maxHeight="100vh"
      overflow="hidden"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      paddingX={isSmallScreen ? '16px' : '32px'}
      paddingY={isSmallScreen ? '8px' : '16px'}
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
        alt="The house from the offer."
        src="./images/logo1.jpg"
      />
      {barcodeValue ? (
        <Box marginTop={isSmallScreen ? 2 : 4}>
          {lading ? (
            // Content to show when loading is true (e.g., a loading spinner)
            <Typography variant="h5" align="center" color="white">
              Landing....
            </Typography>
          ) : (
            // Content to show when loading is false
            <>
              <Typography variant="h5" align="center" color="white">
                Your barcode Is wrong: {barcodeValue}
              </Typography>

              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                marginTop={2}
              >

                <Button onClick={() => {
                  setLading(true);
                  setBarcodeValue('');
                }}
                  variant="contained" style={{ borderRadius: 50, width: isSmallScreen ? '80%' : 'auto', minWidth: '200px', maxWidth: '400px', paddingTop: '10px', paddingBottom: '10px', backgroundColor: '#556C8B', textTransform: 'none', position: 'absolute', bottom: isSmallScreen ? '10%' : '5%', color: 'white' }}>
                  Rescanner
                </Button>
              </Box>
            </>
          )}
        </Box>
      ) : (
        <Box>
          {methode ? (
            // scanner par camer 
            <FunctionQuagga onBarcodeScanned={handleBarcodeScanned} />
          ) : (
            // scanner par inputs
            <Functioninput onInputValueEntered={handleBarcodeScanned} />
          )}
          <Box
            display="flex"
            justifyContent="center"
            marginTop={2}
          >



            {methode ? (

              <Button onClick={() => setMethode(false)} variant="contained" style={{ borderRadius: 50, width: isSmallScreen ? '80%' : 'auto', minWidth: '200px', maxWidth: '400px', paddingTop: '10px', paddingBottom: '10px', backgroundColor: '#556C8B', textTransform: 'none', position: 'absolute', bottom: isSmallScreen ? '10%' : '5%', color: 'white' }}>
                Enter code manuel
              </Button>
            ) : (

              <Button onClick={() => setMethode(true)} variant="contained" style={{ borderRadius: 50, width: isSmallScreen ? '80%' : 'auto', minWidth: '200px', maxWidth: '400px', paddingTop: '10px', paddingBottom: '10px', backgroundColor: '#556C8B', textTransform: 'none', position: 'absolute', bottom: isSmallScreen ? '10%' : '5%', color: 'white' }}>
                Scanner par camera
              </Button>
            )}


          </Box>
        </Box>
      )}
    </Box>
  );
}

export default Scan;