import React, { useState } from 'react';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
import { GetEvent } from './APIs/getInfoEvent';
const Endirect = () => {
  const navigate = useNavigate();
  const [isIframeVisible, setIsIframeVisible] = useState(false);
  const isSmallScreen = useMediaQuery('(max-width: 300px)');
  const isMediumScreen = useMediaQuery('(min-width: 301px) and (max-width: 600px)');
  const [demarrerLive, setDemarrerLive] = useState(true);
  // exmple for testing

  const [itemData, setItemData] = useState([]);

  React.useEffect(() => {
    // Check if event data is in localStorage, and fetch only if not available
    GetEvent({ lien: 'lives' })
      .then((result) => {
        if (result) {
       
          setItemData(result);
          setIsIframeVisible(true);
        } else {
          console.log("Non trouvé");
        }
      });
  }, []);




  const handleLogout = () => {
    navigate('/App');
  };

  const handleIframeClick = (index) => {
    if (!demarrerLive) {
      setDemarrerLive(true);
    }
    // Skip sorting if the clicked item is the first item (index 0)
    if (index === 0) {
      return;
    }


    const clickedItem = itemData[index];
    const updatedItemData = [...itemData];

    // Remove the clicked item from its current position
    updatedItemData.splice(index, 1);

    // Place the clicked item at the beginning of the array
    updatedItemData.unshift(clickedItem);

    // Sort the items from index 1 to the end
    const sortedItemData = updatedItemData.slice(1).sort((a, b) =>
      a.titre.localeCompare(b.titre)
    );

    // Concatenate the first item (index 0) with the sorted items
    const finalSortedData = [updatedItemData[0], ...sortedItemData];

    // Update the state to reflect the new itemData
    setItemData(finalSortedData);
  };



  return (
    <>
      {
        isIframeVisible ? (
          <>
            <style>
              {`
  body {
    background-color: #18202D;
  }
`}
            </style>
            <Box
              sx={{
                width: "100%",
                height: "30vh",
                minHeight: '200px',
                bgcolor: '#18202D',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative',
                opacity: 0.9,
              }}
            >
              <Button
                variant="contained"
                style={{
                  position: 'relative',
                  top: '10%',
                  left: '5%',
                  width: '30px',
                  height: '60px',
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

              <Box style={{
                position: 'absolute',
                top: isSmallScreen ? '15%' : (isMediumScreen ? '15%' : '10%'),
                left: '0%',
                color: "white",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}>
                <Typography variant="h4" fontWeight={'bold'} fontSize={isSmallScreen ? '15px' : null}>
                  Endirect
                </Typography>
                <Typography variant="h6" fontSize={isSmallScreen ? '15px' : null}>
                  {itemData[0].titre}
                </Typography>
              </Box>

              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="flex-end"
                position={'relative'}
                bottom={isSmallScreen ? '8%' : (isMediumScreen ? '-20%' : '-25%')}
              >

                <iframe
                  width="100%"
                  height={isSmallScreen ? '150px' : (isMediumScreen ? '220px' : '350px')}
                  src={itemData[0].link}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer;  clipboard-write; encrypted-media; gyroscope; picture-in-picture; "
                  allowFullScreen
                ></iframe>
              </Box>
              <Typography marginLeft={'35px'} variant="h4" fontWeight={'bold'} fontSize={isSmallScreen ? '15px' : (isMediumScreen ? '25px' : null)} color={'white'} marginTop={isSmallScreen ? '5%' : (isMediumScreen ? '15%' : '13%')} marginBottom={isSmallScreen ? '8%' : (isMediumScreen ? '10%' : '5%')}>
                Suggestions
              </Typography>
              {
                itemData.slice(1).map((item, index) => (
                  <Box
                    display="flex"
                    flexDirection="row"
                    alignItems="flex-start"
                    justifyContent="flex-start"
                    height={isMediumScreen ? "70%" : "85%"}
                    key={index}
                    onClick={() => handleIframeClick(index + 1)}
                    zIndex={999}
                  >

                    <Box zIndex={999} width={'50%'} height={'70%'} margin={'0px 35px 0px 35px'} position={'absolute'} onClick={() => handleIframeClick(index + 1)}></Box>
                    <Box width={'50%'} margin={'0px 35px 0px 35px'} >
                      <iframe
                        width="100%"
                        height={isSmallScreen ? '100px' : (isMediumScreen ? '150px' : '200px')}
                        src={item.link}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
                        allowFullScreen
                      ></iframe>
                    </Box>
                    <Box>
                      <Typography variant="h5" fontSize={isSmallScreen ? '15px' : (isMediumScreen ? null : '25px')} color={'white'} marginTop={isSmallScreen ? '5%' : (isMediumScreen ? '12%' : '13%')} marginLeft={2}>
                        {item.titre}
                      </Typography>
                    </Box>
                  </Box>



                ))
              }
            </Box>
          </>
        ) : (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
            <CircularProgress />
          </Box>
        )
      }
    </>
  );
};
export default Endirect;
