import React from 'react';
import BaseScreen from '../../components/BaseScreen/BaseScreen';
import { useState } from 'react';
import { Paper, Typography, TableContainer, Alert, Snackbar, Table, TableHead, TableRow, TableCell, TableBody, TableFooter, TablePagination, Box, FormControl, Select, InputBase, MenuItem, Backdrop, CircularProgress, Dialog } from "@mui/material";
import InputComponent from '../../components/InputComponent/InputComponent';
import Button from '../../components/Button/Button';
import ModalAddPet from '../../components/ModalPet/ModalAddPet';
import { styled } from '@mui/material/styles';
import ModalAddTypePet from '../../components/ModalTypePet/ModalAddTypePet';
import Api from '../../api/Api';
import ModalDelete from '../../components/ModalTypePet/ModalDelete';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useEffect } from 'react';

const BootstrapInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
        marginTop: theme.spacing(3),
    },
    '& .MuiInputBase-input': {
        minWidth: 150,
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


const options = [
    {
        value: 'Pet',
    },
    {
        value: 'Service',
    },
    {
        value: 'Veterinarian',
    },
    {
        value: 'Volunteering Activities',
    },
]

const headerCellPet = [
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
    {
        id: 'price',
        label: 'Price',
        align: 'right'
    },
    {
        id: 'adopt',
        label: 'Adoption',
        align: 'right'
    },
    {
        id: 'action',
        label: 'Action',
        align: 'right'
    },
]

const headerCellService = [
    {
        id: 'name',
        label: 'Name',
    },
    {
        id: 'price',
        label: 'Price',
        align: 'right',
    },
    {
        id: 'type',
        label: 'Type',
        align: 'right'
    },
    {
        id: 'description',
        label: 'Description',
        align: 'right'
    },
    {
        id: 'action',
        label: 'Action',
        align: 'right'
    },
]

const headerCellVeterinarian = [
    {
        id: 'name',
        label: 'Name',
    },
    {
        id: 'phone number',
        label: 'Phone number',
        align: 'right',
    },
    {
        id: 'address',
        label: 'Address',
        align: 'right'
    },
    {
        id: 'price',
        label: 'Price',
        align: 'right'
    },
    {
        id: 'description',
        label: 'Description',
        align: 'right'
    },
    {
        id: 'action',
        label: 'Action',
        align: 'right'
    },
]

const headerCellVolunteering = [
    {
        id: 'name',
        label: 'Name',
    },
    {
        id: 'number people',
        label: 'Number people',
        align: 'right',
    },
    {
        id: 'requirement',
        label: 'Requirement',
        align: 'right'
    },
    {
        id: 'date of event',
        label: 'Date of event',
        align: 'right'
    },
    {
        id: 'status',
        label: 'Status',
        align: 'right'
    },
    {
        id: 'action',
        label: 'Action',
        align: 'right'
    },
]

const TrashPage = () => {
    const title = "Trash";
    const [option, setOption] = useState(options[0].value)
    const [isLoading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const [content, setContent] = useState('');

    const [pets, setPets] = useState([]);
    const [pet, setPet] = useState({});
    const [services, setServices] = useState([]);
    const [service, setService] = useState({});
    const [veterinarians, setVeterinarians] = useState([]);
    const [veterinarian, setVeterinarian] = useState({});
    const [volunteerings, setVolunteerings] = useState([]);
    const [volunteering, setVolunteering] = useState({});

    const [openModalDelete, setOpenModalDelete] = useState(false)
    const [openModalRestore, setOpenModalRestore] = useState(false)
    const [contentRestore, setContentRestore] = useState('Are you sure restore this pet?')
    const [titleRestore, setTitleRestore] = useState('Restore Pet!')
    const [contentDelete, setContentDelete] = useState('Are you sure delete forever this pet?')
    const [titleDelete, setTitleDelete] = useState('Delete forever pet!')
    const [reload, setReload] = useState(false)
    const [alert, setAlert] = useState(false)
    const [contentAlert, setContentAlert] = useState('')

    const handleSelected = (e) => {
        setOption(e.target.value)
    }

    const fetchPets = async () => {
        try {
            setLoading(true)
            const response = await Api.getPetTrash()
            if (response.data.status === "Success") {
                setPets(response.data.data)
            }
            console.log(response.data)
            setLoading(false)
        } catch (error) {
            setContent(error.message)
            setOpen(true)
            setLoading(false)
        }
    }

    const fetchServices = async () => {
        try {
            setLoading(true)
            const response = await Api.getServicesTrash()
            if (response.data.status === "Success") {
                setServices(response.data.data)
            }
            console.log(response.data)
            setLoading(false)
        } catch (error) {
            setContent(error.message)
            setOpen(true)
            setLoading(false)
        }
    }

    const fetchVeterinarians = async () => {
        try {
            setLoading(true)
            const response = await Api.getVeterinariansTrash()
            if (response.data.status === "Success") {
                setVeterinarians(response.data.data)
            }
            console.log(response.data)
            setLoading(false)
        } catch (error) {
            setContent(error.message)
            setOpen(true)
            setLoading(false)
        }
    }

    const fetchVolunteeringActivities = async () => {
        try {
            setLoading(true)
            const response = await Api.getVolunteeringActivitiesTrash()
            if (response.data.status === "Success") {
                setVolunteerings(response.data.data)
            }
            console.log(response.data)
            setLoading(false)
        } catch (error) {
            setContent(error.message)
            setOpen(true)
            setLoading(false)
        }
    }

    const restore = async () => {
        try {
            setLoading(true)
            let response = {};
            switch (option) {
                case 'Pet':
                    response = await Api.restorePet(pet.id)
                    setContentAlert('Restore pet successfully!')
                    break;
                case 'Service':
                    response = await Api.restoreService(service.id)
                    setContentAlert('Restore service successfully!')
                    break;
                case 'Veterinarian':
                    response = await Api.restoreVeterinarian(veterinarian.id)
                    setContentAlert('Restore veterinarian successfully!')
                    break;
                case 'Volunteering Activities':
                    response = await Api.restoreVolunteering(volunteering.id)
                    setContentAlert('Restore volunteering activity successfully!')
                    break;
            }
            if (response.data.status === "Success") {
                setReload(!reload)
                setAlert(true)
            }
            setLoading(false)
        } catch (error) {
            if (error?.response?.data?.status == "Failed") {
                setContent(error.response.data.message)
            } else {
                setContent(error.message)
            }
            setOpen(true)
            setLoading(false)
        }
    }

    const deleted = async () => {
        try {
            setLoading(true)
            let response = {};
            switch (option) {
                case 'Pet':
                    response = await Api.deletePetForever(pet.id)
                    setContentAlert('Delete pet successfully!')
                    break;
                case 'Service':
                    response = await Api.deleteServiceForever(service.id)
                    setContentAlert('Delete service successfully!')
                    break;
                case 'Veterinarian':
                    response = await Api.deleteVeterinarianForever(veterinarian.id)
                    setContentAlert('Delete veterinarian successfully!')
                    break;
                case 'Volunteering Activities':
                    response = await Api.deleteVolunteeringForever(volunteering.id)
                    setContentAlert('Delete volunteering activity successfully!')
                    break;
            }
            if (response.data.status === "Success") {
                setReload(!reload)
                setAlert(true)
            }
            setLoading(false)
        } catch (error) {
            if (error?.response?.data?.status == "Failed") {
                setContent(error.response.data.message)
            } else {
                setContent(error.message)
            }
            setOpen(true)
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchPets()
        fetchServices()
        fetchVeterinarians()
        fetchVolunteeringActivities()
    }, [reload])

    return (
        <BaseScreen isLoading={isLoading} title={title} handleClose={() => setOpen(false)} open={open} content={content}>
            <FormControl sx={{ minWidth: 120, borderRadius: 2, marginBottom: 2, marginLeft: 3 }} size="small">
                <Select
                    value={option}
                    displayEmpty
                    onChange={handleSelected}
                    input={<BootstrapInput />}
                >
                    {options.map((option) => (
                        <MenuItem value={option.value}>{option.value}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Box sx={{ marginLeft: 3 }} >
                <Typography variant="h4">
                    Trash
                </Typography>
            </Box>

            {/*Pet*/}
            <Paper elevation={12} sx={{ display: option === "Pet" ? 'flex' : 'none', padding: 5, margin: 3, flexDirection: 'column' }}>
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
                            {pets.map((pet) => (
                                <TableRow>
                                    <TableCell>{pet.name}</TableCell>
                                    <TableCell>{pet.nameType}</TableCell>
                                    <TableCell>{pet.gender ? 'Male' : 'Female'}</TableCell>
                                    <TableCell>{pet.breed}</TableCell>
                                    <TableCell>{pet.age}</TableCell>
                                    <TableCell>{pet.price}</TableCell>
                                    <TableCell>{pet.adopted ? 'Done' : 'None'}</TableCell>
                                    <TableCell>
                                        <Box sx={{ display: 'flex' }}>
                                            <Button variant="contained" style={{ marginRight: 10, backgroundColor: 'green' }}
                                                onClick={() => {
                                                    setOpenModalRestore(true)
                                                    setTitleRestore('Restore pet!')
                                                    setContentRestore('Are you sure restore this pet?')
                                                    setPet(pet)
                                                }}
                                            ><RestoreFromTrashIcon /></Button>
                                            <Button variant="contained" style={{ backgroundColor: 'red' }} onClick={() => {
                                                setOpenModalDelete(true)
                                                setTitleDelete('Delete pet!')
                                                setContentDelete('Are you sure delete forever this pet?')
                                                setPet(pet)
                                            }}><DeleteForeverIcon /></Button>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>

            {/*Service*/}
            <Paper elevation={12} sx={{ display: option === "Service" ? 'flex' : 'none', padding: 5, margin: 3, flexDirection: 'column' }}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                {headerCellService.map((column) => (
                                    <TableCell key={column.id} sx={{ fontWeight: 'bold' }}>
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {services.map((service) => (
                                <TableRow>
                                    <TableCell><Typography
                                        sx={{
                                            display: '-webkit-box',
                                            overflow: 'hidden',
                                            WebkitBoxOrient: 'vertical',
                                            WebkitLineClamp: 2,
                                        }}>
                                        {service.name}
                                    </Typography></TableCell>
                                    <TableCell>{service.price.toLocaleString('en-US')}$</TableCell>
                                    <TableCell>{service.typeService === "SERVICE_BY_DAY" ? 'Service by day' : 'Service by time'}</TableCell>
                                    <TableCell>
                                        <Typography
                                            sx={{
                                                display: '-webkit-box',
                                                overflow: 'hidden',
                                                WebkitBoxOrient: 'vertical',
                                                WebkitLineClamp: 2,
                                            }}>
                                            {service.description}
                                        </Typography></TableCell>
                                    <TableCell>
                                        <Box sx={{ display: 'flex' }}>
                                            <Button variant="contained" style={{ marginRight: 10, backgroundColor: 'green' }}
                                                onClick={() => {
                                                    setOpenModalRestore(true)
                                                    setTitleRestore('Restore service!')
                                                    setContentRestore('Are you sure restore this service?')
                                                    setService(service)
                                                }}
                                            ><RestoreFromTrashIcon /></Button>
                                            <Button variant="contained" style={{ backgroundColor: 'red' }} onClick={() => {
                                                setOpenModalDelete(true)
                                                setTitleDelete('Delete service!')
                                                setContentDelete('Are you sure delete forever this service?')
                                                setService(service)
                                            }}><DeleteForeverIcon /></Button>
                                        </Box>
                                    </TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>

            {/*Veterinarian*/}
            <Paper elevation={12} sx={{ display: option === "Veterinarian" ? 'flex' : 'none', padding: 5, margin: 3, flexDirection: 'column' }}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                {headerCellVeterinarian.map((column) => (
                                    <TableCell key={column.id} sx={{ fontWeight: 'bold' }}>
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {veterinarians.map((veterinarian) => (
                                <TableRow>
                                    <TableCell><Typography
                                        sx={{
                                            display: '-webkit-box',
                                            overflow: 'hidden',
                                            WebkitBoxOrient: 'vertical',
                                            WebkitLineClamp: 2,
                                        }}>
                                        {veterinarian.name}
                                    </Typography></TableCell>
                                    <TableCell>{veterinarian.phoneNumber}</TableCell>
                                    <TableCell>{veterinarian.address}</TableCell>
                                    <TableCell>{veterinarian.price.toLocaleString('en-US')}$</TableCell>
                                    <TableCell>
                                        <Typography
                                            sx={{
                                                display: '-webkit-box',
                                                overflow: 'hidden',
                                                WebkitBoxOrient: 'vertical',
                                                WebkitLineClamp: 2,
                                            }}>
                                            {veterinarian.description}
                                        </Typography></TableCell>
                                    <TableCell>
                                        <Box sx={{ display: 'flex' }}>
                                            <Button variant="contained" style={{ marginRight: 10, backgroundColor: 'green' }}
                                                onClick={() => {
                                                    setOpenModalRestore(true)
                                                    setTitleRestore('Restore veterinarian!')
                                                    setContentRestore('Are you sure restore this veterinarian?')
                                                    setVeterinarian(veterinarian)
                                                }}
                                            ><RestoreFromTrashIcon /></Button>
                                            <Button variant="contained" style={{ backgroundColor: 'red' }} onClick={() => {
                                                setOpenModalDelete(true)
                                                setTitleDelete('Delete pet!')
                                                setContentDelete('Are you sure delete forever this veterinarian?')
                                                setVeterinarian(veterinarian)
                                            }}><DeleteForeverIcon /></Button>
                                        </Box>
                                    </TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>

            {/*Volunteering Activities*/}
            <Paper elevation={12} sx={{ display: option === "Volunteering Activities" ? 'flex' : 'none', padding: 5, margin: 3, flexDirection: 'column' }}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                {headerCellVolunteering.map((column) => (
                                    <TableCell key={column.id} sx={{ fontWeight: 'bold' }}>
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {volunteerings.map((volunteering) => (
                                <TableRow>
                                    <TableCell><Typography
                                        sx={{
                                            display: '-webkit-box',
                                            overflow: 'hidden',
                                            WebkitBoxOrient: 'vertical',
                                            WebkitLineClamp: 2,
                                        }}>
                                        {volunteering.name}
                                    </Typography></TableCell>
                                    <TableCell>{volunteering.numberPeople}</TableCell>
                                    <TableCell sx={{ whiteSpace: 'pre-line' }}>{volunteering.requirement}</TableCell>
                                    <TableCell>{volunteering.dateOfEvent}</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>{volunteering.status}</TableCell>
                                    <TableCell>
                                        <Box sx={{ display: 'flex' }}>
                                            <Button variant="contained" style={{ marginRight: 10, backgroundColor: 'green' }}
                                                onClick={() => {
                                                    setOpenModalRestore(true)
                                                    setTitleRestore('Restore volunteering activity!')
                                                    setContentRestore('Are you sure restore this volunteering activity?')
                                                    setVolunteering(volunteering)
                                                }}
                                            ><RestoreFromTrashIcon /></Button>
                                            <Button variant="contained" style={{ backgroundColor: 'red' }} onClick={() => {
                                                setOpenModalDelete(true)
                                                setTitleDelete('Delete volunteering activity!')
                                                setContentDelete('Are you sure delete forever this volunteering activity?')
                                                setVolunteering(volunteering)
                                            }}><DeleteForeverIcon /></Button>
                                        </Box>
                                    </TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
            <ModalDelete open={openModalDelete} handleClose={() => setOpenModalDelete(false)} title={titleDelete} content={contentDelete} handleClick={deleted} />
            <ModalDelete open={openModalRestore} handleClose={() => setOpenModalRestore(false)} title={titleRestore} content={contentRestore} handleClick={restore} />

            <Snackbar open={alert} autoHideDuration={6000} onClose={() => {
                setAlert(false)
                setOpenModalRestore(false)
                setOpenModalDelete(false)
            }}>
                <Alert onClose={() => {
                    setAlert(false)
                    setOpenModalRestore(false)
                    setOpenModalDelete(false)
                }}
                    severity="success" sx={{ width: '100%' }}>
                    {contentAlert}
                </Alert>
            </Snackbar>
        </BaseScreen>
    );
};

export default TrashPage;
