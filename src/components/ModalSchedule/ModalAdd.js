import React from 'react';
import { InputBase, FormControl, Select, Tab, Tabs, MenuItem, Dialog, DialogContent, DialogActions, Box, Snackbar, Alert, Typography } from "@mui/material";
import StyledTextarea from '../InputComponent/TextAreaComponet';
import Modal from '../Modal/Modal';
import { styled, useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { useEffect } from 'react';
import SwipeableViews from 'react-swipeable-views';
import TabPanel from '../Tab/TabPanel';
import ReactMarkdown from 'react-markdown'
import Api from '../../api/Api';

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
        minWidth: 420,
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

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const ModalAdd = ({ open, handleClose, setLoading, handleReload, types }) => {
    const [alert, setAlert] = useState(false)

    const [type, setType] = useState(types[0]?.id)
    const [typesPet, setTypesPet] = useState([])
    const [description, setDescription] = useState('')
    const theme = useTheme();
    const [value, setValue] = useState(0);
    const [error, setError] = useState(null)

    const handleChangeValue = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    const handleChange = (e) => {
        setType(e.target.value)
    }

    const handleChangeDescription = (e) => {
        setDescription(e.target.value)
    }

    const fetchTypesPet = async () => {
        try {
            setLoading(true)
            const response = await Api.getTypesSchedule()
            if (response.data.status === "Success") {
                setTypesPet(response.data.data)
                setType(response.data.data[0].id)
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

    const addSchedule = async () => {
        if (description != '') {
            try {
                setLoading(true)
                const schedule = {
                    description: description
                }
                const response = await Api.addSchedulePet(type, schedule)
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
        } else {
            setError('Please enter your description')
        }
    }

    useEffect(() => {
        fetchTypesPet()
    }, [])

    return (
        <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
            maxWidth="false"
        >
            <Modal id="customized-dialog-title" onClose={handleClose} sx={{ fontWeight: 'bold' }}>
                Add new schedule
            </Modal>
            <DialogContent dividers>
                <Box>
                    <Typography gutterBottom>
                        Type:
                    </Typography>
                    <FormControl sx={{ minWidth: 220, borderRadius: 2 }} size="small">
                        <Select
                            value={type}
                            onChange={(e) => handleChange(e)}
                            displayEmpty
                            input={<BootstrapInput />}
                        >
                            {typesPet && typesPet.map((value) => (
                                <MenuItem value={value.id}>{value.nameType}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Typography gutterBottom>
                        Description:
                    </Typography>
                    <Tabs
                        value={value}
                        onChange={handleChangeValue}
                        indicatorColor="secondary"
                        textColor="inherit"
                        variant="fullWidth"
                        aria-label="full width tabs example"
                    >
                        <Tab label="Write" {...a11yProps(0)} />
                        <Tab label="Preview" {...a11yProps(1)} />
                    </Tabs>
                    <SwipeableViews
                        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                        index={value}
                        onChangeIndex={handleChangeIndex}
                    >
                        <TabPanel value={value} index={0} dir={theme.direction}>
                            <StyledTextarea sx={{ width: '100%' }} minRows={9} maxRows={10} onChange={(e) => handleChangeDescription(e)} value={description} />
                        </TabPanel>
                        <TabPanel value={value} index={1} dir={theme.direction}>
                            <ReactMarkdown>{description}</ReactMarkdown>
                        </TabPanel>
                    </SwipeableViews>
                    {error && <span className='error'>{error}</span>}
                </Box>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={addSchedule}>
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
                    Add schedule successful!
                </Alert>
            </Snackbar>
        </BootstrapDialog>
    );
};

export default ModalAdd;