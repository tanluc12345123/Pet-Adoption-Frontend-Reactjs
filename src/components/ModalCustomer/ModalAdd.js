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
import ImageComponent from '../ImageComponent/ImageComponent';
import Api from '../../api/Api';

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
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const [alert, setAlert] = useState(false)

    const addService = async () => {
        try {
            setLoading(true)
            const response = await Api.signupAccountAdmin(username, password)
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
                Add new account admin
            </Modal>
            <DialogContent dividers>
                <Typography gutterBottom>
                    Username:
                </Typography>
                <InputComponent value={username} onChange={(e) => setUsername(e.target.value)}/>
                <Typography gutterBottom>
                    Password:
                </Typography>
                <InputComponent aria-label="Password" placeholder="Password…" type="password" className="input" onChange={(e) => setPassword(e.target.value)} />
            </DialogContent>
            <DialogActions>
                {error && <span className='error'>{error}</span>}
                <Button autoFocus onClick={addService}>
                    Add
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
                    Add account successful!
                </Alert>
            </Snackbar>
        </BootstrapDialog>
    );
};

export default ModalAdd;
