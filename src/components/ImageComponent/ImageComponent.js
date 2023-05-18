import React from 'react';
import { Box, Input, Avatar } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';

const ImageComponent = ({ image, onHandleUploadImage }) => {
    const handlePreviewImage = (e) => {
        if (e.target.files[0]) {
            onHandleUploadImage(e.target.files[0])
        }
    }

    const isValidUrl = urlString => {
        try {
            return Boolean(new URL(urlString));
        }
        catch (e) {
            return false;
        }
    }

    const isImage = urlString => {
        try {
            return URL.createObjectURL(urlString)
        } catch (error) {
            onHandleUploadImage(null)
            return null
        }
    }

    return (
        <label>
            <Box
                sx={{
                    width: 150,
                    height: 150,
                    backgroundColor: '#57606a',
                    borderRadius: 3,
                    '&:hover': {
                        backgroundColor: '#8c959f',
                        opacity: [0.9, 0.8, 0.7],
                    },
                    border: '1px solid #000'
                }}>
                {image && <Avatar sx={{ width: '100%', height: '100%', backgroundColor: 'white', borderRadius: 3, }} variant="square" src={isValidUrl(image) ? image : isImage(image)}></Avatar>}
                {!image && <AddIcon sx={{ width: '100%', height: '100%' }} />}
                <Input type='file' accept="image/*" sx={{ display: 'none' }} onChange={handlePreviewImage} enctype="multipart/form-data" />
            </Box>
        </label>
    );
};

export default ImageComponent;