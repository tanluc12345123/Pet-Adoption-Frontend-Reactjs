import * as React from 'react';
import Button from '@mui/material/Button';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import Modal from '../Modal/Modal';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import InputComponent from '../InputComponent/InputComponent';
import { InputBase, FormControl, Select, MenuItem, InputAdornment, OutlinedInput, Stack, Box, Grid } from "@mui/material";
import { useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import StyledTextarea from '../InputComponent/TextAreaComponet';
import ImageComponent from '../ImageComponent/ImageComponent';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(3),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const BootstrapInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
        marginTop: theme.spacing(3),
    },
    '& .MuiInputBase-input': {
        minWidth: 275,
        borderRadius: 12,
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 26px 10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
}));

const ModalAddPet = ({ open, handleClose }) => {
    const [name, setName] = useState('')
    const [type, setType] = useState(1)
    const [gender, setGender] = useState(1)
    const [color, setColor] = useState('')
    const [breed, setBreed] = useState('')
    const [weight, setWeight] = useState(0)
    const [age, setAge] = useState(0)
    const [price, setPrice] = useState(0)
    const [dateReceive, setDateReceive] = useState(null)
    const [description, setDescription] = useState(null)
    const [image1, setImage1] = useState('')
    const [image2, setImage2] = useState('')
    const [image3, setImage3] = useState('')
    const [image4, setImage4] = useState('')

    const handleUploadImage = (value, type) => {
        switch (type) {
            case 'image1':
                setImage1(value)
                break;
            case 'image2':
                setImage2(value)
                break;
            case 'image3':
                setImage3(value)
                break;
            case 'image4':
                setImage4(value)
                break;
        }
    }

    const handleChange = (e, type) => {
        switch (type) {
            case 'name':
                setName(e.target.value)
                break;
            case 'type':
                setType(e.target.value)
                break;
            case 'gender':
                setGender(e.target.value)
                break;
            case 'color':
                setColor(e.target.value)
                break;
            case 'breed':
                setBreed(e.target.value)
                break;
            case 'weight':
                setWeight(e.target.value)
                break;
            case 'age':
                setAge(e.target.value)
                break;
            case 'price':
                setPrice(e.target.value)
                break;
            case 'dateReceive':
                setDateReceive(e)
                break;
            case 'description':
                setDescription(e.target.value)
                break;
        }
    }

    return (
        <div>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                maxWidth="false"
            >
                <Modal id="customized-dialog-title" onClose={handleClose} sx={{ fontWeight: 'bold' }}>
                    Add new pet
                </Modal>
                <DialogContent dividers>
                    <Stack direction="row" spacing={2}>
                        <Box>
                            <Typography gutterBottom>
                                Name:
                            </Typography>
                            <InputComponent onChange={(value) => handleChange(value, 'name')} value={name} />
                            <Typography gutterBottom>
                                Type:
                            </Typography>
                            <FormControl sx={{ minWidth: 120, borderRadius: 2 }} size="small">
                                <Select
                                    value={type}
                                    onChange={(value) => handleChange(value, 'type')}
                                    displayEmpty
                                    input={<BootstrapInput />}
                                >
                                    <MenuItem value={1}>Dog</MenuItem>
                                    <MenuItem value={2}>Cat</MenuItem>
                                </Select>
                            </FormControl>
                            <Typography gutterBottom>
                                Gender:
                            </Typography>
                            <FormControl sx={{ minWidth: 120, borderRadius: 2 }} size="small">
                                <Select
                                    value={gender}
                                    onChange={(value) => handleChange(value, 'gender')}
                                    displayEmpty
                                    input={<BootstrapInput />}
                                >
                                    <MenuItem value={1}>Male</MenuItem>
                                    <MenuItem value={0}>Female</MenuItem>
                                </Select>
                            </FormControl>
                            <Typography gutterBottom>
                                Color:
                            </Typography>
                            <InputComponent onChange={(value) => handleChange(value, 'color')} value={color} />
                            <Typography gutterBottom>
                                Breed:
                            </Typography>
                            <InputComponent onChange={(value) => handleChange(value, 'breed')} value={breed} />
                            <Typography gutterBottom>
                                Weight:
                            </Typography>
                            <OutlinedInput
                                sx={{ borderRadius: 3, borderColor: '#ced4da', paddingY: 0.5, width: 320 }}
                                size='small'
                                type='text'
                                value={weight}
                                onChange={(value) => handleChange(value, 'weight')}
                                inputMode={<BootstrapInput />}
                                endAdornment={<InputAdornment position="end">kg</InputAdornment>}
                            />
                            <Typography gutterBottom>
                                Age:
                            </Typography>
                            <InputComponent type='number' onChange={(value) => handleChange(value, 'age')} value={age} />
                        </Box>
                        <Box>
                            <Typography gutterBottom>
                                Price:
                            </Typography>
                            <OutlinedInput
                                sx={{ borderRadius: 3, borderColor: '#ced4da', paddingY: 0.5, width: 320 }}
                                size='small'
                                type='number'
                                value={price}
                                onChange={(value) => handleChange(value, 'price')}
                                inputMode={<BootstrapInput />}
                                endAdornment={<InputAdornment position="end">$</InputAdornment>}
                            />
                            <Typography gutterBottom>
                                Date received:
                            </Typography>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker sx={{ width: 320 }} slotProps={{ textField: { size: 'small' } }} onChange={(value) => handleChange(value, 'dateReceive')} value={dateReceive} />
                            </LocalizationProvider>
                            <Typography gutterBottom>
                                Description:
                            </Typography>
                            <StyledTextarea minRows={3} maxRows={4} onChange={(value) => handleChange(value, 'description')} value={description} />
                            <Typography gutterBottom>
                                Image:
                            </Typography>
                            <Stack spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap flexWrap="wrap">
                                <Stack direction="column" spacing={{ xs: 2 }}>
                                    <ImageComponent image={image1} onHandleUploadImage={(value) => handleUploadImage(value, 'image1')} />
                                    <ImageComponent image={image2} onHandleUploadImage={(value) => handleUploadImage(value, 'image2')} />
                                </Stack>
                                <Stack direction="column" spacing={{ xs: 2 }}>
                                    <ImageComponent image={image3} onHandleUploadImage={(value) => handleUploadImage(value, 'image3')} />
                                    <ImageComponent image={image4} onHandleUploadImage={(value) => handleUploadImage(value, 'image4')} />
                                </Stack>
                            </Stack>
                        </Box>
                    </Stack>

                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Save changes
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
};

export default ModalAddPet;