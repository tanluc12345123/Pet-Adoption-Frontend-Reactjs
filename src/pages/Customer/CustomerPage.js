import React from 'react';
import { useState } from 'react';
import BaseScreen from '../../components/BaseScreen/BaseScreen';
import { Paper, Typography, TableContainer, Table, TableHead, Snackbar, Alert, TableRow, TableCell, TableBody, TableFooter, TablePagination, Box, FormControl, Select, InputBase, MenuItem, Backdrop, CircularProgress, Dialog } from "@mui/material";
import InputComponent from '../../components/InputComponent/InputComponent';
import Button from '../../components/Button/Button';
import { styled } from '@mui/material/styles';
import Api from '../../api/Api';
import { useEffect } from 'react';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import ModalDelete from '../../components/ModalTypePet/ModalDelete';
import Moment from 'moment'
import ModalEdit from '../../components/ModalCustomer/ModalEdit';
import ModalAdd from '../../components/ModalCustomer/ModalAdd';

const headerCell = [
    {
        id: 'name',
        label: 'Name',
    },
    {
        id: 'email',
        label: 'Email',
        align: 'right',
    },
    {
        id: 'phone',
        label: 'Phone number',
        align: 'right'
    },
    {
        id: 'gender',
        label: 'Gender',
        align: 'right'
    },
    {
        id: 'birthDay',
        label: 'Birth day',
        align: 'right'
    },
    {
        id: 'career',
        label: 'Career',
        align: 'right'
    },
    {
        id: 'address',
        label: 'Address',
        align: 'right'
    },
    {
        id: 'action',
        label: 'Action',
        align: 'right'
    },
]

const CustomerPage = () => {
    const [isLoading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const [content, setContent] = useState('');
    const [customers, setCustomers] = useState([]);
    const [customer, setCustomer] = useState([]);
    const title = "Customer";
    const [reload, setReload] = useState(false);

    const [openModalAdd, setOpenModalAdd] = useState(false)
    const [openModalEdit, setOpenModalEdit] = useState(false)
    const [openModalDelete, setOpenModalDelete] = useState(false)

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [searchResult, setSearchResult] = useState('');
    const [filterList, setFilterList] = useState([]);
    const [alert, setAlert] = useState(false)

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
        var updatedList = [...customers];
        if (query != "") {
            updatedList = updatedList.filter((item) => {
                return item?.name?.toLowerCase().includes(query.toLowerCase()) || item?.phone?.toLowerCase().includes(query.toLowerCase());
            });
        }
        setFilterList(updatedList);
    }

    const fetchCustomers = async () => {
        try {
            setLoading(true)
            const response = await Api.getCustomers()
            if (response.data.status === "Success") {
                setCustomers(response.data.data)
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

    const deleteAccount = async() => {
        try {
            setLoading(true)
            const response = await Api.deleteAccount(customer.id)
            if (response.data.status === "Success") {
                setAlert(true)
                setReload(!reload)
                setOpenModalDelete(false)
            }
            console.log(response.data)
            setLoading(false)
        } catch (error) {
            setContent(error.message)
            setOpen(true)
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCustomers()
    },[reload])

    return (
        <BaseScreen isLoading={isLoading} title={title} handleClose={() => setOpen(false)} open={open} content={content}>
            <Box>
                <Typography variant="h4" sx={{ margin: 3 }}>
                    Customers
                </Typography>
            </Box>
            <Paper elevation={12} sx={{ display: 'flex', padding: 3, marginTop: 2, flexDirection: 'column', margin: 3 }}>
                <Box sx={{ marginBottom: 2, display: 'flex' }}>
                    <InputComponent aria-label="Search" placeholder="Search..." onChange={handleSearchResultChange} value={searchResult} />
                </Box>
                <Box sx={{ justifyContent: 'flex-end', display: 'flex', position: 'absolute', right: 0, marginRight: 11 }}>
                    <Button style={{ padding: 14 }} onClick={() => setOpenModalAdd(true)}>Add Account Admin</Button>
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
                            ).map((customer) => (
                                <TableRow>
                                    <TableCell><Typography>
                                        {customer.fullName ?? 'None'}
                                    </Typography></TableCell>
                                    <TableCell>{customer.email ?? 'None'}</TableCell>
                                    <TableCell>{customer.phone}</TableCell>
                                    <TableCell>{customer.gender ? 'Male' : 'Female'}</TableCell>
                                    <TableCell>{customer.birthday ? Moment(customer.birthday).format('DD/MM/yyyy'): 'None'}</TableCell>
                                    <TableCell>{customer.career ?? 'None'}</TableCell>
                                    <TableCell>
                                        <Typography>
                                            {customer.address ?? 'None'}
                                        </Typography></TableCell>
                                    <TableCell>
                                        <Box sx={{ display: 'flex' }}>
                                            <Button variant="contained" style={{ marginRight: 10, backgroundColor: 'green' }}
                                                onClick={() => {
                                                    setOpenModalEdit(true)
                                                    setCustomer(customer)
                                                }}
                                            ><DriveFileRenameOutlineIcon /></Button>
                                            <Button variant="contained" style={{ backgroundColor: 'red' }} onClick={() => {
                                                setOpenModalDelete(true)
                                                setCustomer(customer)
                                            }}><DeleteSweepIcon /></Button>
                                        </Box>
                                    </TableCell>

                                </TableRow>
                            ))}
                            <ModalEdit open={openModalEdit} handleClose={() => setOpenModalEdit(false)} setLoading={(value) => setLoading(value)} handleReload={() => setReload(!reload)} user={customer} />
                            <ModalDelete open={openModalDelete} handleClose={() => setOpenModalDelete(false)} title='Delete Account!' content='Are you sure delete this account?' handleClick={deleteAccount} />
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                    colSpan={2}
                                    count={filterList.length}
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
                    Delete account successful!
                </Alert>
            </Snackbar>
        </BaseScreen>
    );
};

export default CustomerPage;