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
import ModalAdd from '../../../components/ModalVolunteering/ModalAdd';
import ModalEdit from '../../../components/ModalVolunteering/ModalEdit';
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

const VolunteeringPage = () => {
    const title = "Volunteering Activities";
    const [isLoading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const [content, setContent] = useState('');
    const [reload, setReload] = useState(false)
    const [volunteerings, setVolunteerings] = useState([]);
    const [volunteeringByStatus, setVolunteeringByStatus] = useState([]);
    const [volunteering, setVolunteering] = useState({});
    const [status, setStatus] = useState("HAPPENING");

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
        var updatedList = [...volunteerings];
        if (query != "") {
            updatedList = updatedList.filter((item) => {
                return item?.name?.toLowerCase().includes(query.toLowerCase()) || item?.requirement?.toLowerCase().includes(query.toLowerCase());
            });
        }
        setFilterList(updatedList);
    }

    const fetchVolunteeringActivities = async () => {
        try {
            setLoading(true)
            const response = await Api.getVolunteeringActivities()
            if (response.data.status === "Success") {
                setVolunteerings(response.data.data)
                setVolunteeringByStatus(response.data.data.filter((item) => {
                    return item.status === status
                }))
                setFilterList(response.data.data.filter((item) => {
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

    const deleteVolunteeringActivity = async () => {
        try {
            setLoading(true)
            const response = await Api.deleteVolunteeringActivity(volunteering.id)
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

    const handleSelected = (e) => {
        setStatus(e.target.value)
        setVolunteeringByStatus(volunteerings.filter((item) => {
            return item.status === e.target.value
        }))
        setFilterList(volunteerings.filter((item) => {
            return item.status === e.target.value
        }))
    }

    useEffect(() => {
        fetchVolunteeringActivities()
    }, [reload])

    return (
        <BaseScreen isLoading={isLoading} title={title} handleClose={() => setOpen(false)} open={open} content={content}>
            <Typography variant="h4">
                Volunteering Activities
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
                            <MenuItem value="HAPPENING">Happening</MenuItem>
                            <MenuItem value="TOOK_PLACE">Took place</MenuItem>
                            <MenuItem value="CANCEL">Cancel</MenuItem>
                        </Select>
                    </FormControl>
                    <Button style={{ padding: 14, marginLeft: 10 }} onClick={() => setOpenModalAdd(true)}>Add Volunteering Activities</Button>
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
                            ).map((volunteering) => (
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
                                                    setOpenModalEdit(true)
                                                    setVolunteering(volunteering)
                                                }}
                                            ><DriveFileRenameOutlineIcon /></Button>
                                            <Button variant="contained" style={{ backgroundColor: 'red' }} onClick={() => {
                                                setOpenModalDelete(true)
                                                setVolunteering(volunteering)
                                            }}><DeleteSweepIcon /></Button>
                                        </Box>
                                    </TableCell>

                                </TableRow>
                            ))}
                            <ModalEdit open={openModalEdit} handleClose={() => setOpenModalEdit(false)} setLoading={(value) => setLoading(value)} handleReload={() => setReload(!reload)} volunteering={volunteering} />
                            <ModalDelete open={openModalDelete} handleClose={() => setOpenModalDelete(false)} title='Delete Volunteering Activity!' content='Are you sure delete this volunteering activity?' handleClick={deleteVolunteeringActivity} />
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                    colSpan={4}
                                    count={volunteerings.length}
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

export default VolunteeringPage;
