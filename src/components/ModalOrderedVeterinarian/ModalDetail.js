import * as React from 'react';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import Modal from '../Modal/Modal';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import InputComponent from '../InputComponent/InputComponent';
import { InputBase, FormControl, Select, MenuItem, InputAdornment, OutlinedInput, Stack, Box, Snackbar, Alert } from "@mui/material";
import { useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import StyledTextarea from '../InputComponent/TextAreaComponet';
import ImageComponent from '../ImageComponent/ImageComponent';
import Api from '../../api/Api';
import dayjs from 'dayjs';
import { TimeField } from '@mui/x-date-pickers/TimeField';
import Button from '../Button/Button';
import { useEffect } from 'react';

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

const ModalDetail = ({ open, handleClose, setLoading, handleReload, orderedVeterinarian }) => {
    const [alert, setAlert] = useState(false)
    const [status, setStatus] = useState('')
    const [error, setError] = useState(null)

    const handleApprove = async () => {
        try {
            setLoading(true)
            var response = {};
            switch (status) {
                case "DONE":
                    response = await Api.completeOrderedVeterinarian(orderedVeterinarian.id)
                    break;
                case "CANCEL":
                    response = await Api.cancelOrderedVeterinarian(orderedVeterinarian.id)
                    break;
                default:
                    response = await Api.approveOrderedVeterinarian(orderedVeterinarian.id)
                    break;
            }
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

    useEffect(() => {
        setStatus(orderedVeterinarian?.status)
    }, [orderedVeterinarian])

    return (
        <div>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                maxWidth="false"
            >
                <Modal id="customized-dialog-title" onClose={handleClose} sx={{ fontWeight: 'bold' }}>
                    Detail ordered Veterinarian
                </Modal>
                <DialogContent dividers>
                    <Stack direction="row" spacing={2}>
                        <Box>
                            <Typography gutterBottom>
                                Name user:
                            </Typography>
                            <InputComponent value={orderedVeterinarian?.user?.fullName} readOnly />
                            <Typography gutterBottom>
                                Phone:
                            </Typography>
                            <InputComponent value={orderedVeterinarian?.user?.phone} readOnly />
                            <Typography gutterBottom>
                                Address:
                            </Typography>
                            <InputComponent value={orderedVeterinarian?.user?.address} readOnly />
                            <Typography gutterBottom>
                                Gender:
                            </Typography>
                            <FormControl sx={{ minWidth: 120, borderRadius: 2 }} size="small">
                                <Select
                                    value={orderedVeterinarian?.user?.gender ? 1 : 0}
                                    displayEmpty
                                    readOnly
                                    input={<BootstrapInput />}
                                >
                                    <MenuItem value={1}>Male</MenuItem>
                                    <MenuItem value={0}>Female</MenuItem>
                                </Select>
                            </FormControl>
                            <Box sx={{ marginTop: 2 }}>
                                <ImageComponent image={orderedVeterinarian?.user?.avatar} onHandleUploadImage={() => { }} />
                            </Box>
                        </Box>

                        <Box>

                            <Box>
                                <Typography gutterBottom>
                                    Date start:
                                </Typography>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker readOnly slotProps={{ textField: { size: 'small' } }} value={dayjs(orderedVeterinarian?.dateStart)} />
                                </LocalizationProvider>
                            </Box>
                            <Box>
                                <Typography gutterBottom>
                                    Date end:
                                </Typography>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker readOnly slotProps={{ textField: { size: 'small' } }} value={dayjs(orderedVeterinarian?.dateEnd)} />
                                </LocalizationProvider>
                            </Box>

                            <Typography gutterBottom>
                                Total price:
                            </Typography>
                            <OutlinedInput
                                sx={{ borderRadius: 3, borderColor: '#ced4da', paddingY: 0.5, width: 320 }}
                                size='small'
                                type='number'
                                readOnly
                                value={orderedVeterinarian?.totalPrice}
                                inputMode={<BootstrapInput />}
                                endAdornment={<InputAdornment position="end">$</InputAdornment>}
                            />
                            <Typography gutterBottom>
                                Status:
                            </Typography>
                            <FormControl sx={{ minWidth: 120, borderRadius: 2, marginBottom: 2 }} size="small">
                                <Select
                                    value={status ? status : orderedVeterinarian?.status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    input={<BootstrapInput />}
                                >
                                    <MenuItem value="DOING">Doing</MenuItem>
                                    <MenuItem value="WAITING">Waiting</MenuItem>
                                    <MenuItem value="DONE">Done</MenuItem>
                                    <MenuItem value="CANCEL">Cancel</MenuItem>
                                </Select>
                            </FormControl>
                            <Typography gutterBottom>
                                Payment:
                            </Typography>
                            <InputComponent value={orderedVeterinarian?.payment ? 'Done' : 'None'} readOnly />
                        </Box>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    {error && <span className='error'>{error}</span>}
                    <Button autoFocus onClick={handleApprove} disabled={orderedVeterinarian?.status === status}>
                        Approve
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
                        Approve ordered veterinarian successful!
                    </Alert>
                </Snackbar>
            </BootstrapDialog>
        </div>
    );
};

export default ModalDetail;
