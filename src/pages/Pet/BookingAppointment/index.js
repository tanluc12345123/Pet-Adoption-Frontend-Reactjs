import React from 'react';
import { useState } from 'react';
import BaseScreen from '../../../components/BaseScreen/BaseScreen';
import { Paper, Typography, TableContainer, Snackbar, Alert, Table, TableHead, TableRow, TableCell, TableBody, TableFooter, TablePagination, Box, FormControl, Select, InputBase, MenuItem, Backdrop, CircularProgress, Dialog } from "@mui/material";
import InputComponent from '../../../components/InputComponent/InputComponent';
import Button from '../../../components/Button/Button';
import { styled } from '@mui/material/styles';
import Api from '../../../api/Api';
import { useEffect } from 'react';
import DetailsIcon from '@mui/icons-material/Details';
import DoDisturbOnOutlinedIcon from '@mui/icons-material/DoDisturbOnOutlined';
import ModalDetail from '../../../components/ModalBookingAppointment/ModalDetail';
import ModalDelete from '../../../components/ModalTypePet/ModalDelete';
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
import TocIcon from '@mui/icons-material/Toc';

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
        id: 'name user',
        label: 'Name user',
    },
    {
        id: 'date visit',
        label: 'Date visit',
    },
    {
        id: 'time visit',
        label: 'Time visit',
    },
    {
        id: 'total price',
        label: 'Total Price',
    },
    {
        id: 'name pet',
        label: 'Name Pet',
    },
    {
        id: 'status',
        label: 'Status',
    },
    {
        id: 'payment',
        label: 'Payment',
    },
    {
        id: 'action',
        label: 'Action',
        align: 'center'
    },
]

const BookingAppointmentPet = () => {
    const title = "Booking Appointment Pet";
    const [isLoading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const [content, setContent] = useState('');
    const [reload, setReload] = useState(false);
    const [bookingAppointments, setBookingAppointments] = useState([]);
    const [bookingAppointment, setBookingAppointment] = useState({});
    const [status, setStatus] = useState("DOING");
    const [types, setTypes] = useState([]);

    const [openModalDetail, setOpenModalDetail] = useState(false)
    const [openModalApprove, setOpenModalApprove] = useState(false)
    const [openModalDeny, setOpenModalDeny] = useState(false)

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [searchResult, setSearchResult] = useState('');
    const [filterList, setFilterList] = useState([]);
    const [bookingListByStatus, setBookingListByStatus] = useState([]);

    const [alert, setAlert] = useState(false)
    const [message, setMessage] = useState('')

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
        var updatedList = [...bookingListByStatus];
        if (query != "") {
            updatedList = updatedList.filter((item) => {
                return item.user?.fullName?.toLowerCase().includes(query.toLowerCase()) || item?.pet?.name.toLowerCase().includes(query.toLowerCase());
            });
        }
        setFilterList(updatedList);
    }

    const getAppointmentPet = async () => {
        try {
            setLoading(true)
            const response = await Api.getAppointmentPet()
            if (response.data.status === "Success") {
                setBookingAppointments(response.data.data)
                setFilterList(response.data.data.filter((item) => {
                    return item.status === status
                }))
                setBookingListByStatus(response.data.data.filter((item) => {
                    return item.status === status
                }))
            }
            console.log(response.data)
            setLoading(false)
        } catch (error) {
            setContent(error.message)
            setOpen(true)
            setLoading(false)
        }
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

    const handleSelected = (e) => {
        setStatus(e.target.value)
        setBookingListByStatus(bookingAppointments.filter((item) => {
            return item.status === e.target.value
        }))
        setFilterList(bookingAppointments.filter((item) => {
            return item.status === e.target.value
        }))
    }

    const approveAppointment = async () => {
        try {
            setLoading(true)
            const response = await Api.setAppointmentByStatus(bookingAppointment.id, "WAITING")
            if (response.data.status === "Success") {
                setOpenModalApprove(false)
                setAlert(true)
                setMessage('Complete appointment successful!')
                setReload(!reload)
            }
            setLoading(false)
        } catch (error) {
            setContent(error.message)
            setOpen(true)
            setLoading(false)
        }
    }

    const cancelAppointment = async () => {
        try {
            setLoading(true)
            const response = await Api.setAppointmentByStatus(bookingAppointment.id, "CANCEL")
            if (response.data.status === "Success") {
                setOpenModalDeny(false)
                setAlert(true)
                setMessage('Cancel appointment successful!')
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
        getAppointmentPet()
        fetchTypesPet()
    }, [reload])

    return (
        <BaseScreen isLoading={isLoading} title={title} handleClose={() => setOpen(false)} open={open} content={content}>
            <Typography variant="h4">
                Booking Appointment Pet
            </Typography>

            <Paper elevation={12} sx={{ display: 'flex', padding: 5, marginTop: 2, flexDirection: 'column' }}>
                <Box sx={{ marginBottom: 2, display: 'flex' }}>
                    <InputComponent aria-label="Search" placeholder="Search..." onChange={handleSearchResultChange} value={searchResult} />
                </Box>
                <Box sx={{ justifyContent: 'flex-end', display: 'flex', position: 'absolute', right: 0, marginRight: 11 }}>
                    <FormControl sx={{ minWidth: 120, borderRadius: 2, marginBottom: 2, marginLeft: 3 }} size="small">
                        <Select
                            value={status}
                            displayEmpty
                            onChange={handleSelected}
                            input={<BootstrapInput />}
                        >
                            <MenuItem value="DOING">Doing</MenuItem>
                            <MenuItem value="WAITING">Waiting</MenuItem>
                            <MenuItem value="DONE">Done</MenuItem>
                            <MenuItem value="CANCEL">Cancel</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                {headerCell.map((column) => (
                                    <TableCell key={column.id} sx={{ fontWeight: 'bold' }} align={column.align}>
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filterList && (rowsPerPage > 0
                                ? filterList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : filterList
                            ).map((appointment) => (
                                <TableRow>
                                    <TableCell><Typography
                                        sx={{
                                            display: '-webkit-box',
                                            overflow: 'hidden',
                                            WebkitBoxOrient: 'vertical',
                                            WebkitLineClamp: 2,
                                        }}>
                                        {appointment.user.fullName}
                                    </Typography></TableCell>
                                    <TableCell>{appointment.dateStart}</TableCell>
                                    <TableCell>{appointment.visitingTimeStart}</TableCell>
                                    <TableCell>{appointment.pet.price.toLocaleString('en-US')}$</TableCell>
                                    <TableCell>{appointment.pet.name}</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>{appointment.status}</TableCell>
                                    <TableCell>{appointment.payment ? 'Done' : 'None'}</TableCell>
                                    <TableCell>
                                        <Box sx={{ display: 'flex' }}>
                                            <Button title='Detail' variant="contained" style={{ marginRight: 10 }}
                                                onClick={() => {
                                                    setOpenModalDetail(true)
                                                    setBookingAppointment(appointment)
                                                }}
                                            ><TocIcon /></Button>
                                            <Button variant="contained" style={{ marginRight: 10, backgroundColor: 'green' }}
                                                onClick={() => {
                                                    setOpenModalApprove(true)
                                                    setBookingAppointment(appointment)
                                                }}
                                                disabled={status === "DONE"}
                                            ><TaskAltOutlinedIcon /></Button>
                                            <Button variant="contained" style={{ backgroundColor: 'red' }} onClick={() => {
                                                setOpenModalDeny(true)
                                                setBookingAppointment(appointment)
                                            }}
                                                disabled={status === "CANCEL"}><DoDisturbOnOutlinedIcon /></Button>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))}
                            <ModalDetail open={openModalDetail} handleClose={() => setOpenModalDetail(false)} setLoading={(value) => setLoading(value)} handleReload={() => setReload(!reload)} appointment={bookingAppointment} types={types} />
                            <ModalDelete open={openModalApprove} handleClose={() => setOpenModalApprove(false)} title='Approve appointment!' content='Are you sure approve this appointment?' handleClick={approveAppointment} />
                            <ModalDelete open={openModalDeny} handleClose={() => setOpenModalDeny(false)} title='Deny appointment!' content='Are you sure deny this appointment?' handleClick={cancelAppointment} />
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                    colSpan={11}
                                    count={bookingAppointments.length}
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
            <Snackbar open={alert} autoHideDuration={6000} onClose={() => {
                setAlert(false)
            }}>
                <Alert onClose={() => {
                    setAlert(false)
                }}
                    severity="success" sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </BaseScreen>
    );
};

export default BookingAppointmentPet;