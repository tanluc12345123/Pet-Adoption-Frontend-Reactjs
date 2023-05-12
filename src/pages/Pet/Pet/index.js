import React from 'react';
import { useState } from 'react';
import BaseScreen from '../../../components/BaseScreen/BaseScreen';
import { Paper, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TableFooter, TablePagination, Box } from "@mui/material";
import InputComponent from '../../../components/InputComponent/InputComponent';
import Button from '../../../components/Button/Button';
import ModalAddPet from '../../../components/ModalAddPet/ModalAddPet';

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
        id: 'name',
        label: 'Name Pet',
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
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchResult, setSearchResult] = useState('');

    const title = "Add new pet";

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleSearchResultChange = (event) => {
        setSearchResult(event.target.value)
    }

    return (
        <BaseScreen isLoading={isLoading} title={title} handleClose={() => setOpen(false)} open={open}>
            <Typography variant="h4">
                Pet
            </Typography>

            <Paper elevation={12} sx={{ display: 'flex', padding: 5, marginTop: 2, flexDirection: 'column' }}>
                <Box sx={{ marginBottom: 2, display: 'flex' }}>
                    <InputComponent aria-label="Search" placeholder="Search..." onChange={handleSearchResultChange} value={searchResult} />
                </Box>
                <Box sx={{ justifyContent: 'flex-end', display: 'flex', position: 'absolute', right: 0, marginRight: 8 }}>
                    <Button style={{ padding: 14 }} onClick={() => setOpenModalAdd(true)}>Add Pet</Button>
                    <ModalAddPet open={openModalAdd} handleClose={() => setOpenModalAdd(false)}/>
                </Box>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                {headerCellPet.map((column) => (
                                    <TableCell key={column.id} align={column.align} sx={{ fontWeight: 'bold' }}>
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>

                            </TableRow>
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                    colSpan={3}
                                    count={1}
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

export default PetPage;