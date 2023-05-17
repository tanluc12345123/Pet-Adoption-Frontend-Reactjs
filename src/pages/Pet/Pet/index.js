import React from 'react';
import { useState } from 'react';
import BaseScreen from '../../../components/BaseScreen/BaseScreen';
import { Paper, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TableFooter, TablePagination, Box, FormControl, Select, InputBase, MenuItem, Backdrop, CircularProgress, Dialog } from "@mui/material";
import InputComponent from '../../../components/InputComponent/InputComponent';
import Button from '../../../components/Button/Button';
import ModalAddPet from '../../../components/ModalPet/ModalAddPet';
import { styled } from '@mui/material/styles';
import ModalAddTypePet from '../../../components/ModalTypePet/ModalAddTypePet';
import Api from '../../../api/Api';
import { useEffect } from 'react';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import ModalEditTypePet from '../../../components/ModalTypePet/ModalEditTypePet';
import ModalDelete from '../../../components/ModalTypePet/ModalDelete';
import ModalEditPet from '../../../components/ModalPet/ModalEditPet';
import { useDispatch } from 'react-redux';

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
const PetPage = () => {
    const [isLoading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const [openModalAdd, setOpenModalAdd] = useState(false)
    const [openModalEdit, setOpenModalEdit] = useState(false)
    const [openModalDelete, setOpenModalDelete] = useState(false)
    const [openModalTypeAdd, setOpenModalTypeAdd] = useState(false)
    const [openModalTypeEdit, setOpenModalTypeEdit] = useState(false)
    const [openModalTypeDelete, setOpenModalTypeDelete] = useState(false)
    const [pagePet, setPagePet] = useState(0);
    const [rowsPerPagePet, setRowsPerPagePet] = useState(5);

    const [pageTypePet, setPageTypePet] = useState(0);
    const [rowsPerPageTypePet, setRowsPerPageTypePet] = useState(5);

    const [searchResult, setSearchResult] = useState('');
    const [option, setOption] = useState(0);
    const [content, setContent] = useState('');
    const [types, setTypes] = useState([]);
    const [type, setType] = useState({});
    const [pets, setPets] = useState([]);
    const [pet, setPet] = useState({});
    const [reload, setReload] = useState(false)

    const [filterList, setFilterList] = useState([]);

    const title = "Add new pet";

    const handleChangePagePet = (event, newPage) => {
        setPagePet(newPage);
    };

    const handleChangeRowsPerPagePet = (event) => {
        setRowsPerPagePet(+event.target.value);
        setPagePet(0);
    };

    const handleChangePageTypePet = (event, newPage) => {
        setPageTypePet(newPage);
    };

    const handleChangeRowsPerPageTypePet = (event) => {
        setRowsPerPageTypePet(+event.target.value);
        setPageTypePet(0);
    };

    const handleSearchResultChange = (event) => {
        setSearchResult(event.target.value)
        const query = event.target.value;
        var updatedList = [...pets];
        if (query != "") {
            updatedList = updatedList.filter((item) => {
                return item.name.toLowerCase().includes(query.toLowerCase()) || item.nameType.toLowerCase().includes(query.toLowerCase()) || item.breed.toLowerCase().includes(query.toLowerCase());
            });
        }
        setFilterList(updatedList);
    }

    const handleSelected = (e) => {
        setOption(e.target.value)
    }

    const fetchTypesPet = async () => {
        try {
            setLoading(true)
            const response = await Api.getTypesPet()
            if (response.data.status === "Success") {
                setTypes(response.data.data)
            }
            setLoading(false)
        } catch (error) {
            setContent(error.message)
            setOpen(true)
            setLoading(false)
        }
    }

    const deleteTypePet = async () => {
        try {
            setLoading(true)
            const response = await Api.deleteTypePet(type.id)
            if (response.data.status === "Success") {
                setOpenModalTypeDelete(false)
                setReload(!reload)
            }
            setLoading(false)
        } catch (error) {
            setContent(error.message)
            setOpen(true)
            setLoading(false)
        }
    }

    const fetchPets = async () => {
        try {
            setLoading(true)
            const response = await Api.getPets()
            if (response.data.status === "Success") {
                setPets(response.data.data)
                setFilterList(response.data.data)
            }
            console.log(response.data)
            setLoading(false)
        } catch (error) {
            setContent(error.message)
            setOpen(true)
            setLoading(false)
        }
    }

    const deletePet = async () => {
        try {
            setLoading(true)
            const response = await Api.deletePet(pet.id)
            if (response.data.status === "Success") {
                setOpenModalDelete(false)
                setReload(!reload)
            }
            setLoading(false)
        } catch (error) {
            setContent(error.message)
            setOpen(true)
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchTypesPet()
        fetchPets()
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
                    <MenuItem value={0}>Type pet</MenuItem>
                    <MenuItem value={1}>Pet</MenuItem>
                </Select>
            </FormControl>
            <Box sx={{ display: option == 1 ? 'block' : 'none', padding: 3 }} >
                <Typography variant="h4">
                    Pet
                </Typography>

                <Paper elevation={12} sx={{ display: 'flex', padding: 5, marginTop: 2, flexDirection: 'column' }}>
                    <Box sx={{ marginBottom: 2, display: 'flex' }}>
                        <InputComponent aria-label="Search" placeholder="Search..." onChange={handleSearchResultChange} value={searchResult} />
                    </Box>
                    <Box sx={{ justifyContent: 'flex-end', display: 'flex', position: 'absolute', right: 0, marginRight: 11 }}>
                        <Button style={{ padding: 14 }} onClick={() => setOpenModalAdd(true)}>Add Pet</Button>
                        <ModalAddPet open={openModalAdd} handleClose={() => setOpenModalAdd(false)} types={types} setLoading={(value) => setLoading(value)} handleReload={() => setReload(!reload)} />
                    </Box>
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
                                {filterList && (rowsPerPagePet > 0
                                    ? filterList.slice(pagePet * rowsPerPagePet, pagePet * rowsPerPagePet + rowsPerPagePet)
                                    : filterList
                                ).map((pet) => (
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
                                                        setOpenModalEdit(true)
                                                        setPet(pet)
                                                    }}
                                                ><DriveFileRenameOutlineIcon /></Button>
                                                <Button variant="contained" style={{ backgroundColor: 'red' }} onClick={() => {
                                                    setOpenModalDelete(true)
                                                    setPet(pet)
                                                }}><DeleteSweepIcon /></Button>
                                            </Box>
                                        </TableCell>

                                    </TableRow>
                                ))}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TablePagination
                                        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                        colSpan={4}
                                        count={pets.length}
                                        rowsPerPage={rowsPerPagePet}
                                        page={pagePet}
                                        SelectProps={{
                                            inputProps: {
                                                'aria-label': 'rows per page',
                                            },
                                            native: true,
                                        }}
                                        onPageChange={handleChangePagePet}
                                        onRowsPerPageChange={handleChangeRowsPerPagePet}
                                    />
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </TableContainer>
                </Paper>
                <ModalEditPet open={openModalEdit} handleClose={() => setOpenModalEdit(false)} setLoading={(value) => setLoading(value)} handleReload={() => setReload(!reload)} pet={pet} types={types} />
                <ModalDelete open={openModalDelete} handleClose={() => setOpenModalDelete(false)} title='Delete Pet!' content='Are you sure delete this pet?' handleClick={deletePet} />
            </Box>


            <Box sx={{ display: option == 0 ? 'block' : 'none', padding: 3 }}>
                <Typography variant="h4">
                    Type Pet
                </Typography>
                <Paper elevation={12} sx={{ display: 'flex', padding: 5, marginTop: 2, flexDirection: 'column' }}>
                    <Box sx={{ marginBottom: 2, display: 'flex' }}>
                        <Button style={{ padding: 14 }} onClick={() => setOpenModalTypeAdd(true)}>Add Type Pet</Button>
                        <ModalAddTypePet open={openModalTypeAdd} handleClose={() => setOpenModalTypeAdd(false)} setLoading={(value) => setLoading(value)} handleReload={() => setReload(!reload)} />
                    </Box>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold' }}>
                                        STT
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>
                                        Name type
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>
                                        Action
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {types && (rowsPerPageTypePet > 0
                                    ? types.slice(pageTypePet * rowsPerPageTypePet, pageTypePet * rowsPerPageTypePet + rowsPerPageTypePet)
                                    : types
                                ).map((type, index) => (
                                    <TableRow key={type.id}>
                                        <TableCell component="th" scope="row" >{index + 1}</TableCell>
                                        <TableCell component="th" scope="row" >{type.nameType}</TableCell>
                                        <TableCell component="th" scope="row" >
                                            <Box sx={{ display: 'flex' }}>
                                                <Button variant="contained" style={{ marginRight: 10, backgroundColor: 'green' }}
                                                    onClick={() => {
                                                        setOpenModalTypeEdit(true)
                                                        setType(type)
                                                    }}
                                                ><DriveFileRenameOutlineIcon /></Button>
                                                <Button variant="contained" style={{ backgroundColor: 'red' }} onClick={() => {
                                                    setOpenModalTypeDelete(true)
                                                    setType(type)
                                                }}><DeleteSweepIcon /></Button>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TablePagination
                                        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                        colSpan={3}
                                        count={types.length}
                                        rowsPerPage={rowsPerPageTypePet}
                                        page={pageTypePet}
                                        SelectProps={{
                                            inputProps: {
                                                'aria-label': 'rows per page',
                                            },
                                            native: true,
                                        }}
                                        onPageChange={handleChangePageTypePet}
                                        onRowsPerPageChange={handleChangeRowsPerPageTypePet}
                                    />
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </TableContainer>
                </Paper>
                <ModalEditTypePet open={openModalTypeEdit} handleClose={() => setOpenModalTypeEdit(false)} handleReload={() => setReload(!reload)} type={type} setLoading={(value) => setLoading(value)} />
                <ModalDelete open={openModalTypeDelete} handleClose={() => setOpenModalTypeDelete(false)} title='Delete Type Pet!' content='Are you sure delete this type?' handleClick={deleteTypePet} />
            </Box>
            <Dialog open={isLoading}>
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={isLoading}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            </Dialog>
        </BaseScreen>
    );
};

export default PetPage;