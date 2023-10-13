import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import Barcode from 'react-barcode';
import { useMediaQuery } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '300px', // Set the maximum width to 400px
    width: '70%', // Adjust the width as needed
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
};

export default function BasicModal(props) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const isSmallScreen = useMediaQuery('(max-width: 350px)');
    return (
        <Box >
            <QrCodeScannerIcon style={{ color: "#878D97", height: 60, width: 60 }} onClick={handleOpen}/>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Your barcode has:
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <Barcode value={props.code} width={isSmallScreen ? 1 : 2} />
                    </Typography>
                </Box>
            </Modal>
        </Box>
    );
}
