import * as React from 'react';
import Button from '@mui/material/Button';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import Modal from '../Modal/Modal';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import InputComponent from '../InputComponent/InputComponent';
import { InputBase, FormControl, Select, MenuItem, InputAdornment, OutlinedInput, Stack, Box, Snackbar, Alert } from "@mui/material";
import { useState } from 'react';
import StyledTextarea from '../InputComponent/TextAreaComponet';
import ImageComponent from '../ImageComponent/ImageComponent';
import Api from '../../api/Api';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';

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

const ModalAdd = ({ open, handleClose, setLoading, handleReload }) => {
    const [name, setName] = useState('')
    const [numberPeople, setNumberPeople] = useState(0)
    const [requirement, setRequirement] = useState('')
    const [dateOfEvent, setDateOfEvent] = useState(dayjs(new Date()))
    const [description, setDescription] = useState(null)
    const [image, setImage] = useState(null)
    const [error, setError] = useState(null)
    const [alert, setAlert] = useState(false)

    const handleUploadImage = (value) => {
        setImage(value)
    }

    const handleChange = (e, type) => {
        switch (type) {
            case 'name':
                setName(e.target.value)
                break;
            case 'numberPeople':
                setNumberPeople(e.target.value)
                break;
            case 'requirement':
                setRequirement(e.target.value)
                break;
            case 'dateOfEvent':
                setDateOfEvent(e)
                break;
            case 'description':
                setDescription(e.target.value)
                break;
        }
    }

    const addVolunteeringActivity = async () => {
        setError('')
        let formData = new FormData();
        try {
            setLoading(true)
            const body = {
                name: name,
                numberPeople: numberPeople,
                description: description,
                requirement: requirement,
                dateOfEvent: dateOfEvent.$d,
            }
            const blob = new Blob([JSON.stringify(body)], {
                type: 'application/json'
            });
            formData.append("volunteer", blob)
            formData.append("file", image)
            const response = await Api.addVolunteeringActivity(formData)
            if (response.data.status === "Success") {
                setAlert(true)
                handleReload()
            }
            setLoading(false)
        } catch (error) {
            if (error?.response?.data?.status === "Failed") {
                setError(error.response.data.message)
            } else {
                setError(error.message)
            }
            setLoading(false)
        }
    }

    return (
        <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
            maxWidth="false"
        >
            <Modal id="customized-dialog-title" onClose={handleClose} sx={{ fontWeight: 'bold' }}>
                Add new volunteering activity
            </Modal>
            <DialogContent dividers>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <ImageComponent image={image} onHandleUploadImage={(value) => handleUploadImage(value)} />
                </Box>
                <Typography gutterBottom>
                    Name:
                </Typography>
                <InputComponent onChange={(value) => handleChange(value, 'name')} value={name} />
                <Typography gutterBottom>
                    Number People:
                </Typography>
                <InputComponent onChange={(value) => handleChange(value, 'numberPeople')} value={numberPeople} type='number' />
                <Typography gutterBottom>
                    Requirement:
                </Typography>
                <StyledTextarea minRows={3} maxRows={4} onChange={(value) => handleChange(value, 'requirement')} value={requirement} />
                <Typography gutterBottom>
                    Date of event:
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker slotProps={{ textField: { size: 'small' } }} value={dateOfEvent} onChange={(value) => handleChange(value, 'dateOfEvent')} minDate={dayjs(new Date())} />
                </LocalizationProvider>
                <Typography gutterBottom>
                    Description:
                </Typography>
                <StyledTextarea minRows={3} maxRows={4} onChange={(value) => handleChange(value, 'description')} value={description} />
            </DialogContent>
            <DialogActions>
                {error && <span className='error'>{error}</span>}
                <Button autoFocus onClick={addVolunteeringActivity}>
                    Save changes
                </Button>
            </DialogActions>
            <Snackbar open={alert} autoHideDuration={6000} onClose={() => {
                setAlert(false)
                handleClose()
            }}>
                <Alert onClose={() => {
                    setAlert(false)
                    handleClose()
                }}
                    severity="success" sx={{ width: '100%' }}>
                    Add volunteering activity successful!
                </Alert>
            </Snackbar>
        </BootstrapDialog>
    );
};

export default ModalAdd;
