import React from 'react';
import BaseScreen from '../../../components/BaseScreen/BaseScreen';
import { useState } from 'react';
import { Paper, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TableFooter, TablePagination, Box, FormControl, Select, InputBase, MenuItem, Backdrop, CircularProgress, Dialog } from "@mui/material";
import Button from '../../../components/Button/Button';
import Api from '../../../api/Api';
import { styled } from '@mui/material/styles';
import ModalAdd from '../../../components/ModalSchedule/ModalAdd';
import ReactMarkdown from 'react-markdown'
import { useEffect } from 'react';
import ModalEdit from '../../../components/ModalSchedule/ModalEdit';

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

const PetSchedulePage = () => {
    const [isLoading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const [content, setContent] = useState('');
    const [description, setDescription] = useState(null);
    const [schedule, setSchedule] = useState({});
    const title = "Add new schedule";

    const [types, setTypes] = useState([]);
    const [type, setType] = useState(null);
    const [openModalAdd, setOpenModalAdd] = useState(false);
    const [openModalEdit, setOpenModalEdit] = useState(false);
    const [reload, setReload] = useState(false);

    const fetchTypesPet = async () => {
        try {
            setLoading(true)
            const response = await Api.getTypesPet()
            if (response.data.status === "Success") {
                setTypes(response.data.data)
                setType(response.data.data[0].id)
            }
            setLoading(false)
        } catch (error) {
            setContent(error.message)
            setOpen(true)
            setLoading(false)
        }
    }

    const fetchSchedulePet = async () => {
        try {
            setLoading(true)
            if (type != null) {
                const response = await Api.getScheduleByType(type)
                if (response.data.status === "Success") {
                    setSchedule(response.data.data)
                    setDescription(response.data.data?.description)
                }
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
    }, [reload])

    useEffect(() => {
        fetchSchedulePet()
    }, [type, reload])

    return (
        <BaseScreen isLoading={isLoading} title={title} handleClose={() => setOpen(false)} open={open} content={content}>
            <Box>
                <Typography variant="h4" sx={{ margin: 3 }}>
                    Pet Schedule
                </Typography>
            </Box>
            <Paper elevation={12} sx={{ display: 'flex', padding: 3, marginTop: 2, flexDirection: 'column', margin: 3 }}>
                <Box sx={{ marginBottom: 2, display: 'flex' }}>
                    <Button style={{ padding: 14 }} onClick={() => setOpenModalAdd(true)}>Add Schedule</Button>
                    <ModalAdd open={openModalAdd} handleClose={() => setOpenModalAdd(false)} setLoading={(value) => setLoading(value)} handleReload={() => setReload(!reload)} types={types} />
                </Box>
                <Box sx={{ marginBottom: 2, display: 'flex' }}>
                    <FormControl sx={{ minWidth: 120, borderRadius: 2, marginBottom: 2 }} size="small">
                        <Select
                            value={type}
                            displayEmpty
                            onChange={(e) => setType(e.target.value)}
                            input={<BootstrapInput />}
                        >
                            {types && types.map((value) => (
                                <MenuItem value={value.id}>{value.nameType}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Box sx={{ marginBottom: 2, display: 'flex', marginLeft: 'auto' }}>
                        <Button style={{ padding: 14 }} onClick={() => setOpenModalEdit(true)}>Schedule Adjustment</Button>
                        <ModalEdit open={openModalEdit} handleClose={() => setOpenModalEdit(false)} setLoading={(value) => setLoading(value)} handleReload={() => setReload(!reload)} types={types} schedule={schedule} typeSchedule={type} />
                    </Box>
                </Box>
                <Box>
                    {description ? (<ReactMarkdown>{description}</ReactMarkdown>) : (<Typography>No Schedule</Typography>)}
                </Box>
            </Paper>
        </BaseScreen>
    );
};

export default PetSchedulePage;
