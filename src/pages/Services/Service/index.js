import React from 'react';
import { useState } from 'react';
import BaseScreen from '../../../components/BaseScreen/BaseScreen';
import { Paper, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TableFooter, TablePagination, Box, FormControl, Select, InputBase, MenuItem, Backdrop, CircularProgress, Dialog } from "@mui/material";
import InputComponent from '../../../components/InputComponent/InputComponent';
import Button from '../../../components/Button/Button';
import { styled } from '@mui/material/styles';
import Api from '../../../api/Api';
import { useEffect } from 'react';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import ModalAdd from '../../../components/ModalService/ModalAdd';
import ModalEdit from '../../../components/ModalService/ModalEdit';
import ModalDelete from '../../../components/ModalTypePet/ModalDelete';

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

const headerCell = [
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

const ServicePage = () => {
    const title = "Service";
    const [isLoading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const [content, setContent] = useState('');
    const [reload, setReload] = useState(false)
    const [services, setServices] = useState([]);
    const [service, setService] = useState({});

    const [openModalAdd, setOpenModalAdd] = useState(false)
    const [openModalEdit, setOpenModalEdit] = useState(false)
    const [openModalDelete, setOpenModalDelete] = useState(false)

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [searchResult, setSearchResult] = useState('');
    const [filterList, setFilterList] = useState([]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleSearchResultChange = (event) => {
        setSearchResult(event.target.value)
        const query = event.target.value;
        var updatedList = [...services];
        if (query != "") {
            updatedList = updatedList.filter((item) => {
                return item.name.toLowerCase().includes(query.toLowerCase());
            });
        }
        setFilterList(updatedList);
    }

    const fetchServices = async () => {
        try {
            setLoading(true)
            const response = await Api.getServices()
            if (response.data.status === "Success") {
                setServices(response.data.data)
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

    const deleteService = async () => {
        try {
            setLoading(true)
            const response = await Api.deleteService(service.id)
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
        fetchServices()
    }, [reload])

    return (
        <BaseScreen isLoading={isLoading} title={title} handleClose={() => setOpen(false)} open={open} content={content}>
            <Typography variant="h4">
                Service
            </Typography>

            <Paper elevation={12} sx={{ display: 'flex', padding: 5, marginTop: 2, flexDirection: 'column' }}>
                <Box sx={{ marginBottom: 2, display: 'flex' }}>
                    <InputComponent aria-label="Search" placeholder="Search..." onChange={handleSearchResultChange} value={searchResult} />
                </Box>
                <Box sx={{ justifyContent: 'flex-end', display: 'flex', position: 'absolute', right: 0, marginRight: 11 }}>
                    <Button style={{ padding: 14 }} onClick={() => setOpenModalAdd(true)}>Add Service</Button>
                    <ModalAdd open={openModalAdd} handleClose={() => setOpenModalAdd(false)} setLoading={(value) => setLoading(value)} handleReload={() => setReload(!reload)} />
                </Box>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                {headerCell.map((column) => (
                                    <TableCell key={column.id} sx={{ fontWeight: 'bold' }}>
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filterList && (rowsPerPage > 0
                                ? filterList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : filterList
                            ).map((service) => (
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
                                                    setOpenModalEdit(true)
                                                    setService(service)
                                                }}
                                            ><DriveFileRenameOutlineIcon /></Button>
                                            <Button variant="contained" style={{ backgroundColor: 'red' }} onClick={() => {
                                                setOpenModalDelete(true)
                                                setService(service)
                                            }}><DeleteSweepIcon /></Button>
                                        </Box>
                                    </TableCell>

                                </TableRow>
                            ))}
                            <ModalEdit open={openModalEdit} handleClose={() => setOpenModalEdit(false)} setLoading={(value) => setLoading(value)} handleReload={() => setReload(!reload)} service={service} />
                            <ModalDelete open={openModalDelete} handleClose={() => setOpenModalDelete(false)} title='Delete Service!' content='Are you sure delete this service?' handleClick={deleteService} />
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                    colSpan={4}
                                    count={services.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    SelectProps={{
                                        inputProps: {
                                            'aria-label': 'rows per page',
                                        },
                                        native: true,
                                    }}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
            </Paper>
        </BaseScreen>
    );
};

export default ServicePage;
