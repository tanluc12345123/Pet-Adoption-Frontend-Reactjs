import * as React from 'react';
import Button from '@mui/material/Button';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import Modal from '../Modal/Modal';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import InputComponent from '../InputComponent/InputComponent';
import { InputBase, FormControl, Select, MenuItem, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TableFooter, Paper, Stack, Box, Snackbar, Alert } from "@mui/material";
import { useState } from 'react';
import StyledTextarea from '../InputComponent/TextAreaComponet';
import ImageComponent from '../ImageComponent/ImageComponent';
import Api from '../../api/Api';
import { useEffect } from 'react';
import Moment from 'moment'

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

const headerCellPet = [
    {
        id: 'image',
        label: 'Image'
    },
    {
        id: 'name',
        label: 'Name',
    },
    {
        id: 'type',
        label: 'Type',
        align: 'right'
    },
    {
        id: 'gender',
        label: 'Gender',
        align: 'right'
    },
    {
        id: 'breed',
        label: 'Breed',
        align: 'right'
    },
    {
        id: 'age',
        label: 'Age',
        align: 'right'
    },
]

const ModalEdit = ({ open, handleClose, setLoading, handleReload, user }) => {
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const [alert, setAlert] = useState(false)
    const [pets, setPets] = useState([])

    const updateAccount = async () => {
        try {
            setLoading(true)
            const response = await Api.adminChangePassword(user.id, password)
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

    const fetchPetAdoption = async() => {
        try {
            setLoading(true)

            if(user.id){
                const response = await Api.getPetAdoption(user?.id)
                if (response.data.status === "Success") {
                    setPets(response.data.data)
                }
                console.log(response.data)
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
        fetchPetAdoption()
    },[user])

    return (
        <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
            maxWidth="false"
        >
            <Modal id="customized-dialog-title" onClose={handleClose} sx={{ fontWeight: 'bold' }}>
                Edit account
            </Modal>
            <DialogContent dividers>
                <Stack direction="row" spacing={2}>
                    <Box>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <ImageComponent image={user?.avatar} />
                        </Box>
                        <Typography gutterBottom>
                            Name user:
                        </Typography>
                        <InputComponent value={user?.fullName} readOnly />
                        <Typography gutterBottom>
                            Phone:
                        </Typography>
                        <InputComponent value={user?.phone} readOnly />
                        <Typography gutterBottom>
                            Email:
                        </Typography>
                        <InputComponent value={user?.email} readOnly />
                        <Typography gutterBottom>
                            Gender:
                        </Typography>
                        <FormControl sx={{ minWidth: 120, borderRadius: 2 }} size="small">
                            <Select
                                value={user?.gender ? 1 : 0}
                                displayEmpty
                                readOnly
                                input={<BootstrapInput />}
                            >
                                <MenuItem value={1}>Male</MenuItem>
                                <MenuItem value={0}>Female</MenuItem>
                            </Select>
                        </FormControl>
                        <Typography gutterBottom>
                            Address:
                        </Typography>
                        <InputComponent value={user?.address} readOnly />

                        <Typography gutterBottom>
                            Birthday:
                        </Typography>
                        <InputComponent value={Moment(user?.birthday).format('DD/MM/yyyy')} readOnly />

                        <Typography gutterBottom>
                            Career:
                        </Typography>
                        <InputComponent value={user?.career} readOnly />
                        <Typography gutterBottom>
                            Password:
                        </Typography>
                        <InputComponent aria-label="Password" placeholder="Password…" type="password" className="input" onChange={(e) => setPassword(e.target.value)} />
                    </Box>

                    <Box>
                        <Typography gutterBottom>
                            Pets of user:
                        </Typography>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 450 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        {headerCellPet.map((column) => (
                                            <TableCell key={column.id} sx={{ fontWeight: 'bold' }}>
                                                {column.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {user?.pets?.map((pet) => (
                                        <TableRow>
                                            <TableCell><ImageComponent image={pet.petImage.image1} /></TableCell>
                                            <TableCell>{pet.name}</TableCell>
                                            <TableCell>{pet.nameType}</TableCell>
                                            <TableCell>{pet.gender ? 'Male' : 'Female'}</TableCell>
                                            <TableCell>{pet.breed}</TableCell>
                                            <TableCell>{pet.age}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Typography gutterBottom mt={2}>
                            Pets adoption:
                        </Typography>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        {headerCellPet.map((column) => (
                                            <TableCell key={column.id} sx={{ fontWeight: 'bold' }}>
                                                {column.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {pets?.map((pet) => (
                                        <TableRow>
                                            <TableCell><ImageComponent image={pet.petImage.image1} /></TableCell>
                                            <TableCell>{pet.name}</TableCell>
                                            <TableCell>{pet.nameType}</TableCell>
                                            <TableCell>{pet.gender ? 'Male' : 'Female'}</TableCell>
                                            <TableCell>{pet.breed}</TableCell>
                                            <TableCell>{pet.age}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Stack>

            </DialogContent>
            <DialogActions>
                {error && <span className='error'>{error}</span>}
                <Button autoFocus onClick={updateAccount}>
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
                    Edit user successful!
                </Alert>
            </Snackbar>
        </BootstrapDialog>
    );
};

export default ModalEdit;