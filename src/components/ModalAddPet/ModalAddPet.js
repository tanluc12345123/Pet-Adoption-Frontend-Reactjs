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
    const [age, setAge] = useState(0)

    const handleChange = (event) => {
        setAge(event.target.value)
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
                            <InputComponent />
                            <Typography gutterBottom>
                                Type:
                            </Typography>
                            <FormControl sx={{ minWidth: 120, borderRadius: 2 }} size="small">
                                <Select
                                    value={age}
                                    onChange={handleChange}
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
                                    value={age}
                                    onChange={handleChange}
                                    displayEmpty
                                    input={<BootstrapInput />}
                                >
                                    <MenuItem value={10}>Male</MenuItem>
                                    <MenuItem value={20}>Female</MenuItem>
                                </Select>
                            </FormControl>
                            <Typography gutterBottom>
                                Color:
                            </Typography>
                            <InputComponent />
                            <Typography gutterBottom>
                                Breed:
                            </Typography>
                            <InputComponent />
                            <Typography gutterBottom>
                                Weight:
                            </Typography>
                            <OutlinedInput
                                sx={{ borderRadius: 3, borderColor: '#ced4da', paddingY: 0.5, width: 320 }}
                                size='small'
                                type='text'
                                inputMode={<BootstrapInput />}
                                endAdornment={<InputAdornment position="end">kg</InputAdornment>}
                            />
                            <Typography gutterBottom>
                                Age:
                            </Typography>
                            <InputComponent type='number' />
                        </Box>
                        <Box>
                            <Typography gutterBottom>
                                Price:
                            </Typography>
                            <OutlinedInput
                                sx={{ borderRadius: 3, borderColor: '#ced4da', paddingY: 0.5, width: 320 }}
                                size='small'
                                type='number'
                                inputMode={<BootstrapInput />}
                                endAdornment={<InputAdornment position="end">$</InputAdornment>}
                            />
                            <Typography gutterBottom>
                                Date received:
                            </Typography>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker sx={{ width: 320 }} slotProps={{ textField: { size: 'small' } }} />
                            </LocalizationProvider>
                            <Typography gutterBottom>
                                Description:
                            </Typography>
                            <StyledTextarea minRows={3} maxRows={4} />
                            <Typography gutterBottom>
                                Image:
                            </Typography>
                            <Stack spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap flexWrap="wrap">
                                <Stack direction="column" spacing={{ xs: 2 }}>
                                    <ImageComponent />
                                    <ImageComponent />
                                </Stack>
                                <Stack direction="column" spacing={{ xs: 2 }}>
                                    <ImageComponent />
                                    <ImageComponent />
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