import React, { useState } from 'react';
import { Box, Input, Button } from '@mui/material';
import QrCode2Icon from '@mui/icons-material/QrCode2';

function FunctionInput({ onInputValueEntered }) {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleInputSubmit = () => {
        if (inputValue) {
            addToCache("mykey", inputValue, onInputValueEntered);
            setInputValue(''); // Clear the input field after storing the value
        }
    };

    const addToCache = (key, value, callback) => {
        const CACHE_NAME = "version-1";
        caches.open(CACHE_NAME)
            .then(() => callback(value))
            .catch((error) => console.error('Error adding to cache:', error));
    };

    return (
        <Box display="flex" flexDirection="column" justifyContent="center" paddingY="10%">
            <Box display="flex" marginBottom="20%" bgcolor="white" alignItems="center">
                <QrCode2Icon />
                <Input
                    value={inputValue}
                    onChange={handleInputChange}
                    sx={{
                        "--Input-radius": "10px",
                        "--Input-placeholderOpacity": 0.3,
                        "--Input-focusedThickness": "1px"
                    }}
                />
            </Box>
            <Box display="flex" justifyContent="center">
                <Button
                    onClick={handleInputSubmit}
                    variant="outlined"
                    sx={{
                        borderRadius: "50px",
                        minWidth: '200px',
                        maxWidth: '400px',
                        paddingTop: '10px',
                        paddingBottom: '10px',
                        backgroundColor: '#556C8B',
                        textTransform: 'none',
                        color: 'white',
                        border: 'none'
                    }}
                >
                    Scanner
                </Button>
            </Box>
        </Box>
    );
}

export default FunctionInput;
