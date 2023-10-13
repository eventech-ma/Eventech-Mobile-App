import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import DownloadIcon from '@mui/icons-material/Download';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Paper, CircularProgress } from '@mui/material';
import Iframe from 'react-iframe';
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
import { useMediaQuery } from '@mui/material';
import { GetSpeakersProgramme } from '../APIs/getInfoEvent';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    // maxWidth: '800px', // Set the maximum width to 400px
    height: '100vh', // Set the maximum height to
    width: '100%', // Adjust the width as needed
    bgcolor: 'black',
    border: 'none',
    boxShadow: 'none',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'center',
    padding: '0px',
};

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    paddingBottom: theme.spacing(4),
    paddingTop: theme.spacing(4),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));
export default function Prgramme(props) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const isSmallScreen = useMediaQuery('(max-width: 600px)');
    const [link, setLink] = React.useState("");
    const [loading, setLoading] = React.useState(false); // Step 1: Initialize loading state

    React.useEffect(() => {
        GetSpeakersProgramme('programme')
            .then((result) => {
                if (result && result.length > 0) {
                    setLink(result[0].link);
                    setLoading(false);
                } else {
                    console.log("Non trouvé");
                }
            });

    }, []);



    return (

        <Box>
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
                    <CircularProgress />
                </Box>
            ) : (
                <>
                    <Box style={{ textDecoration: "none", display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: "#697991" }} onClick={handleOpen}>
                        <Item className='Options'> <DownloadIcon sx={{ fontSize: 35 }} /></Item><Typography variant="body2" style={{ fontWeight: 'bold' }}>{props.titre}</Typography>
                    </Box>

                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Button id="modal-modal-title" style={{
                                position: 'absolute',
                                top: '0px',
                                left: '0px',
                                borderRadius: '0',
                                textDecoration: 'none',
                                boxSizing: 'border-box',
                                border: 'none',
                                padding: '0px',
                                height: '60px',
                                color: '#fff',
                                width: isSmallScreen ? 'auto' : '150px',
                                backgroundColor: '#323639',
                                zIndex: 1000,
                                fontWeight: 'bold',
                            }}
                                onClick={handleClose}
                            >
                                <KeyboardBackspaceOutlinedIcon sx={{ fontSize: '30px' }} style={{ width: '55px' }} />Home
                            </Button>


                            <Iframe
                                url={link}
                                width="100%"
                                height="100%"
                            />


                        </Box>

                    </Modal>
                </>
            )}
        </Box>
    );
}