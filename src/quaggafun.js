import React, { useEffect } from 'react';
import Quagga from 'quagga';
import { Box, Typography } from '@mui/material';
import './App.css';

function addToCache(key, value, callback) {
  const CACHE_NAME = "version-1";
  caches.open(CACHE_NAME)
    .then((cache) => {
      callback(value); // Call the callback with the input value
    })
    .catch((error) => {
      console.error('Error adding to cache:', error);
    });
}

function FunctionQuagga({ onBarcodeScanned }) {
  console.log("working");
  useEffect(() => {
    var scannerConfig = {
      inputStream: {
        name: "Live",
        type: "LiveStream",
        target: document.querySelector("#scanner-container"),
      },
      decoder: {
        readers: ["codabar_reader", "code_128_reader", "code_39_reader"]
      }
    };

    Quagga.init(scannerConfig, function (err) {
      if (err) {
        console.error(err);
        return;
      }
      Quagga.start();

      return function cleanup() {
        Quagga.stop();
      };
    });

    Quagga.onDetected(function (result) {
      var scannedBarcodeValue = result.codeResult.code;
      if (scannedBarcodeValue) {
        addToCache("mykey", scannedBarcodeValue, onBarcodeScanned); // Pass the input value, not the callback
        Quagga.stop();
      }
    });
  }, [onBarcodeScanned]);
  return (
    <center>
      <Box position={'relative'} width={'80%'} height={'auto'} minHeight={'200px'}>
        <Box id="scanner-container" position={'relative'} top={'1px'} left={'1px'} />
        <Box position={'absolute'} top={0} left={0} borderTop={'3px solid #526784'} borderLeft={'3px solid #526784'} width={'50px'} height={'50px'}></Box>
        <Box position={'absolute'} top={0} right={0} borderTop={'3px solid #526784'} borderRight={'3px solid #526784'} width={'50px'} height={'50px'}></Box>
        <Box position={'absolute'} bottom={0} left={0} borderBottom={'3px solid #526784'} borderLeft={'3px solid #526784'} width={'50px'} height={'50px'}></Box>
        <Box position={'absolute'} bottom={0} right={0} borderBottom={'3px solid #526784'} borderRight={'3px solid #526784'} width={'50px'} height={'50px'}></Box>
      </Box>
      <Typography fontSize={20} color={'white'} width={'90%'}>
        Placez le code-barres dans cette zone pour le scanner
      </Typography>
    </center>

  );
}

export default FunctionQuagga;
