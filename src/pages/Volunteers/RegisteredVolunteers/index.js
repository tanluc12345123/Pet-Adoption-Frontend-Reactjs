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
import ModalDetail from '../../../components/ModalOrderedVeterinarian/ModalDetail';
import ModalDelete from '../../../components/ModalTypePet/ModalDelete';
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
import TocIcon from '@mui/icons-material/Toc';
import StyledTextarea from '../../../components/InputComponent/TextAreaComponet';

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
        id: 'phone',
        label: 'Phone',
    },

    {
        id: 'address',
        label: 'Address',
    },
    {
        id: 'name activity',
        label: 'Name Activity',
    },
    {
        id: 'status',
        label: 'Status',
    },
    {
        id: 'complete',
        label: 'Complete',
    },
    {
        id: 'reason',
        label: 'Reason',
    },
    {
        id: 'action',
        label: 'Action',
        align: 'center'
    },
]

const RegisteredVolunteersPage = () => {
    const title = "Registered Volunteers";
    const [isLoading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const [content, setContent] = useState('');
    const [reason, setReason] = useState('');
    const [reload, setReload] = useState(false);
    const [registeredVolunteers, setRegisteredVolunteers] = useState([]);
    const [registeredVolunteer, setRegisteredVolunteer] = useState({});

    const [openModalDeny, setOpenModalDeny] = useState(false)

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [searchResult, setSearchResult] = useState('');
    const [filterList, setFilterList] = useState([]);

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
        var updatedList = [...registeredVolunteers];
        if (query != "") {
            updatedList = updatedList.filter((item) => {
                return item.user?.fullName?.toLowerCase().includes(query.toLowerCase()) || item.user?.phone?.toLowerCase().includes(query.toLowerCase());
            });
        }
        setFilterList(updatedList);
    }

    const fetchRegisteredVolunteers = async () => {
        try {
            setLoading(true)
            const response = await Api.getRegisteredVolunteers()
            if (response.data.status === "Success") {
                setRegisteredVolunteers(response.data.data)
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

    const rejectRegisteredVolunteer = async () => {
        try {
            setLoading(true)
            const response = await Api.rejectRegisteredVolunteer(registeredVolunteer.id, reason)
            if (response.data.status === "Success") {
                setOpenModalDeny(false)
                setAlert(true)
                setMessage('Reject registered volunteer successful!')
                setReload(!reload)
            }
            setLoading(false)
        } catch (error) {
            setContent(error.message)
            setOpen(true)
            setLoading(false)
        }
    }

    const handleChange = (e) => {
        setReason(e.target.value)
    }

    useEffect(() => {
        fetchRegisteredVolunteers()
    }, [reload])

    return (
        <BaseScreen isLoading={isLoading} title={title} handleClose={() => setOpen(false)} open={open} content={content}>
            <Typography variant="h4">
                Registered Volunteers
            </Typography>

            <Paper elevation={12} sx={{ display: 'flex', padding: 5, marginTop: 2, flexDirection: 'column' }}>
                <Box sx={{ marginBottom: 2, display: 'flex' }}>
                    <InputComponent aria-label="Search" placeholder="Search..." onChange={handleSearchResultChange} value={searchResult} />
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
                            ).map((volunteer) => (
                                <TableRow>
                                    <TableCell><Typography
                                        sx={{
                                            display: '-webkit-box',
                                            overflow: 'hidden',
                                            WebkitBoxOrient: 'vertical',
                                            WebkitLineClamp: 2,
                                        }}>
                                        {volunteer.user?.fullName}
                                    </Typography></TableCell>
                                    <TableCell>{volunteer.user?.phone}</TableCell>
                                    <TableCell>{volunteer.user?.address}</TableCell>
                                    <TableCell>{volunteer.volunteer?.name}</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>{volunteer.volunteer?.status}</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>{volunteer.complete}</TableCell>
                                    <TableCell>{volunteer.reason ? volunteer.reason : 'No reason'}</TableCell>
                                    <TableCell>
                                        <Box sx={{ display: 'flex' }}>
                                            <Button variant="contained" style={{ backgroundColor: 'red' }} onClick={() => {
                                                setOpenModalDeny(true)
                                                setRegisteredVolunteer(volunteer)
                                            }}
                                            ><DoDisturbOnOutlinedIcon /></Button>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))}
                            <ModalDelete open={openModalDeny} handleClose={() => setOpenModalDeny(false)} title='Reject Registered Volunteer!' content={<Box><Typography variant="h6" sx={{ fontWeight: 'bold' }}>Are you sure reject this volunteer?</Typography><Typography gutterBottom>
                                Reason:
                            </Typography><StyledTextarea minRows={3} maxRows={4} onChange={(value) => handleChange(value)} value={reason} /></Box>} handleClick={rejectRegisteredVolunteer} />
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                    colSpan={11}
                                    count={registeredVolunteers.length}
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

export default RegisteredVolunteersPage;
