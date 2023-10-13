import React from 'react'
import { Box, Typography } from '@mui/material'
import { useMediaQuery } from '@mui/material';
import { GetEvent } from '../APIs/getInfoEvent';
const ImageHeader = (props) => {
    const isSmallScreen = useMediaQuery('(max-width: 350px)');
    const isMediumScreen = useMediaQuery('(min-width: 351px) and (max-width: 700px)');
    // Load event data from localStorage if available
    const [Event, setEvent] = React.useState(() => {
        const cachedEvent = localStorage.getItem('cachedEvent');
        return cachedEvent ? JSON.parse(cachedEvent) : [];
    });

    const EventName = localStorage.getItem('tenant');
    React.useEffect(() => {
        // Check if event data is in localStorage, and fetch only if not available
        GetEvent({ lien: 'infos' })
            .then((result) => {
                if (result) {
                    result.titre = EventName;
                    setEvent(result);
                    // Store the fetched event data in localStorage
                    localStorage.setItem('cachedEvent', JSON.stringify(result));
                } else {
                    console.log("Non trouvé");
                }
            });
    }, [EventName]);




    return (
        <>
            <Box style={{
                position: 'absolute',
                top: isSmallScreen ? '35%' : (isMediumScreen ? '35%' : '10%'),
                left: '0%',
                color: "white",
                width: "100%",
                display: "flex",
                justifyContent: "center",
            }}>
                <Typography variant="h4" fontWeight={'bold'} fontSize={isSmallScreen ? '15px' : null}>
                    {props.Titre ? props.Titre : Event.titre}
                </Typography>
            </Box>

            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="flex-end"
                height="100%" // Ensure the container takes full height
                position={'relative'}
                // bottom={isSmallScreen ? '-20%' : (isMediumScreen ? '-25%' : '-45%')}
                // bottom={isSmallScreen ? '-13%' : (isMediumScreen ? '-15%' : '-25%')}
                bottom={props.bottom}
            >
                <img
                    src={Event.logo}
                    alt="The house from the offer."
                    style={{
                        // width: '40%', // Adjust the width as needed
                        width: isSmallScreen ? '130px' : (isMediumScreen ? '170px' : '200px'),
                        height: isSmallScreen ? '130px' : (isMediumScreen ? '170px' : '200px'),
                        borderRadius: '50%',
                        border: '5px solid white',
                        boxShadow: '0px 2px 5px darkgray',
                        backgroundColor: 'white',
                    }}
                />
            </Box>
        </>
    )
}

export default ImageHeader