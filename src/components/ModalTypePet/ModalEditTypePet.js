import * as React from 'react';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import Modal from '../Modal/Modal';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import InputComponent from '../InputComponent/InputComponent';
import { useState } from 'react';
import Button from '../Button/Button';
import Api from '../../api/Api';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { useEffect } from 'react';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(3),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}))

const ModalEditTypePet = ({ open, handleClose, setLoading, handleReload, type }) => {
    const [nameType, setNameType] = useState(type.nameType)
    const [error, setError] = useState(null)
    const [alert, setAlert] = useState(false)

    const editTypePet = async () => {
        if (nameType) {
            try {
                setLoading(true)
                const response = await Api.editTypePet(type.id, nameType)
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
        } else {
            setError('Please enter name type')
        }
    }

    useEffect(() => {
        setNameType(type.nameType)
    },[type])

    return (
        <div>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                maxWidth="false"
            >
                <Modal id="customized-dialog-title" onClose={handleClose} sx={{ fontWeight: 'bold' }}>
                    Edit type pet
                </Modal>
                <DialogContent>
                    <Typography gutterBottom>
                        Name type:
                    </Typography>
                    <InputComponent onChange={(e) => setNameType(e.target.value)} value={nameType} />
                    {error && <span className='error'>{error}</span>}
                </DialogContent>
                <DialogActions>
                    <Button style={{ padding: 14 }} onClick={editTypePet}>Edit</Button>
                </DialogActions>
            </BootstrapDialog>
            <Snackbar open={alert} autoHideDuration={6000} onClose={() => {
                setAlert(false)
                handleClose()
            }}>
                <Alert onClose={() => {
                    setAlert(false)
                    handleClose()
                }}
                    severity="success" sx={{ width: '100%' }}>
                    Edit type pet success!
                </Alert>
            </Snackbar>
        </div>
    );
};

export default ModalEditTypePet;