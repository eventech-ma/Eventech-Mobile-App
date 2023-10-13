import React, { useEffect } from 'react'
import { Typography, Grid, Paper, Box } from '@mui/material';
import { Link } from "react-router-dom";
import { styled } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Prgramme from './programme';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxWidth: '400px',
    bgcolor: '#1A212B',
    color: '#FFFFFF',
    border: 'none',
    boxShadow: 24,
    p: 1,
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

function LoughoutModal(props) {

    const CACHE_NAME = 'version-1';
    const navigate = useNavigate();

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

                    .catch((error) => {
                        console.error('Error reading from cache:', error);
                    });
            });
    });
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleLogout = () => {
        caches.open(CACHE_NAME).then((cache) => {
            cache.delete('mykey').then(() => {
                navigate('/App')
            });
        });
    };
    return (
        <div>
            <Box style={{ textDecoration: "none", display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: "#697991" }} onClick={handleOpen}>
                <Item className='Options'>{props.icon}</Item><Typography variant="body2" style={{ fontWeight: 'bold' }} >{props.titre}</Typography>
            </Box>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" textAlign={'center'}>
                        <img src='/images/logo1.jpg' alt='logo eventech' width={'150px'} height={'150px'} style={{borderRadius:"30px"}}/><br/>Are you sure you want to log out?
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2, mb:2 }} textAlign={'center'} display={'flex'} justifyContent={'space-evenly'} >
                     
                        <Button variant="outlined" onClick={handleLogout} >Yes</Button>
                        <Button variant="outlined" onClick={handleClose} >No</Button>
                    </Typography>
                </Box>
            </Modal>


        </div>
    );
}
const GridIitems = (props) => {



    const isSmallScreen = useMediaQuery('(max-width: 300px)');
    const isMediumScreen = useMediaQuery('(min-width: 301px) and (max-width: 550px)');


    const dynamicPath = `/${props.titre}`;
    // const encodedURL = encodeURIComponent("https://www.africau.edu/images/default/sample.pdf");

    return (
        <Grid item xs={isSmallScreen ? 6 : (isMediumScreen ? 4 : 2)} >
            {dynamicPath === '/Scanner' ?
                <LoughoutModal icon={props.icon} titre={props.titre} />
                : dynamicPath === '/prgramme' ?

                    <Prgramme titre={props.titre} />

                    :
                    <Link to={dynamicPath} style={{ textDecoration: "none", display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: "#697991" }}>
                        <Item className='Options'>{props.icon}</Item><Typography variant="body2" style={{ fontWeight: 'bold' }} >{props.titre}</Typography>
                    </Link>
            }

        </Grid>
    )
}

export default GridIitems