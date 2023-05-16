import * as React from 'react';
import Button from '@mui/material/Button';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import Modal from '../Modal/Modal';
import dayjs from 'dayjs';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import InputComponent from '../InputComponent/InputComponent';
import { InputBase, FormControl, Select, MenuItem, InputAdornment, OutlinedInput, Stack, Box, Snackbar, Alert, Checkbox, FormControlLabel } from "@mui/material";
import { useState, useEffect } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import StyledTextarea from '../InputComponent/TextAreaComponet';
import ImageComponent from '../ImageComponent/ImageComponent';
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
        minWidth: 275,
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
            borderRadius: 12,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
}));

const ModalEditPet = ({ open, handleClose, setLoading, handleReload, types, pet }) => {
    const [name, setName] = useState(pet.name)
    const [type, setType] = useState(pet.typeId)
    const [gender, setGender] = useState(pet.gender ? 1 : 0)
    const [color, setColor] = useState(pet.color)
    const [breed, setBreed] = useState(pet.breed)
    const [weight, setWeight] = useState(pet.weight)
    const [age, setAge] = useState(pet.age)
    const [price, setPrice] = useState(pet.price)
    const [dateReceived, setDateReceived] = useState(dayjs(pet.dateReceived))
    const [sterilization, setSterilization] = useState(pet.sterilization)
    const [rabiesVaccination, setRabiesVaccination] = useState(pet.rabiesVaccination)
    const [vaccination, setVaccination] = useState(pet.vaccination)
    const [safe, setSafe] = useState(pet.safe)
    const [description, setDescription] = useState(pet.description)
    const [image1, setImage1] = useState(null)
    const [image2, setImage2] = useState(null)
    const [image3, setImage3] = useState(null)
    const [image4, setImage4] = useState(null)
    const [error, setError] = useState(null)
    const [alert, setAlert] = useState(false)

    const handleUploadImage = (value, type) => {
        switch (type) {
            case 'image1':
                setImage1(value)
                break;
            case 'image2':
                setImage2(value)
                break;
            case 'image3':
                setImage3(value)
                break;
            case 'image4':
                setImage4(value)
                break;
        }
    }

    const handleChange = (e, type) => {
        switch (type) {
            case 'name':
                setName(e.target.value)
                break;
            case 'type':
                setType(e.target.value)
                break;
            case 'gender':
                setGender(e.target.value)
                break;
            case 'color':
                setColor(e.target.value)
                break;
            case 'breed':
                setBreed(e.target.value)
                break;
            case 'weight':
                setWeight(e.target.value)
                break;
            case 'age':
                setAge(e.target.value)
                break;
            case 'price':
                setPrice(e.target.value)
                break;
            case 'dateReceive':
                setDateReceived(e)
                break;
            case 'description':
                setDescription(e.target.value)
                break;
            case 'sterilization':
                setSterilization(e.target.value)
                break;
            case 'rabiesVaccination':
                setRabiesVaccination(e.target.value)
                break;
            case 'vaccination':
                setVaccination(e.target.value)
                break;
            case 'safe':
                setSafe(e.target.value)
                break;
        }
    }

    const isValidUrl = urlString => {
        try {
            return Boolean(new URL(urlString));
        }
        catch (e) {
            return false;
        }
    }

    const updatePet = async () => {
        try {
            setLoading(true)
            let formData = new FormData()
            const body = {
                name: name,
                gender: gender == 1 ? true : false,
                breed: breed,
                color: color,
                age: age,
                weight: weight,
                price: price,
                description: description,
                dateReceived: dateReceived.$d,
                status: {
                    sterilization: sterilization ? 1 : 0,
                    rabiesVaccination: rabiesVaccination ? 1 : 0,
                    vaccination: vaccination ? 1 : 0,
                    safe: safe ? 1 : 0,
                }
            };
            const blob = new Blob([JSON.stringify(body)], {
                type: 'application/json'
            });
            formData.append('body', blob)
            formData.append("file1", isValidUrl(image1) ? null : image1)
            formData.append("file2", isValidUrl(image2) ? null : image2)
            formData.append("file3", isValidUrl(image3) ? null : image3)
            formData.append("file4", isValidUrl(image4) ? null : image4)
            const response = await Api.updatePet(pet.id, type, formData)
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
    }

    useEffect(() => {
        setError('')
        setName(pet.name)
        setGender(pet.gender ? 1 : 0)
        setColor(pet.color)
        setName(pet.breed)
        setWeight(pet.weight)
        setAge(pet.age)
        setBreed(pet.breed)
        setPrice(pet.price)
        setDateReceived(dayjs(pet.dateReceived))
        setDescription(pet.description)
        setType(pet.typeId)
        setRabiesVaccination(pet?.status?.rabiesVaccination)
        setSterilization(pet?.status?.sterilization)
        setVaccination(pet?.status?.vaccination)
        setSafe(pet?.status?.safe)
        setImage1(pet?.petImage?.image1)
        setImage2(pet?.petImage?.image2)
        setImage3(pet?.petImage?.image3)
        setImage4(pet?.petImage?.image4)
    }, [pet])

    return (
        <div>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                maxWidth="false"
            >
                <Modal id="customized-dialog-title" onClose={handleClose} sx={{ fontWeight: 'bold' }}>
                    Edit pet
                </Modal>
                <DialogContent dividers>
                    <Stack direction="row" spacing={2}>
                        <Box>
                            <Typography gutterBottom>
                                Name:
                            </Typography>
                            <InputComponent onChange={(value) => handleChange(value, 'name')} value={name} />
                            <Typography gutterBottom>
                                Type:
                            </Typography>
                            <FormControl sx={{ minWidth: 120, borderRadius: 2 }} size="small">
                                <Select
                                    value={type}
                                    onChange={(value) => handleChange(value, 'type')}
                                    displayEmpty
                                    input={<BootstrapInput />}
                                >
                                    {types && types.map((value) => (
                                        <MenuItem value={value.id}>{value.nameType}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <Typography gutterBottom>
                                Gender:
                            </Typography>
                            <FormControl sx={{ minWidth: 120, borderRadius: 2 }} size="small">
                                <Select
                                    value={gender}
                                    onChange={(value) => handleChange(value, 'gender')}
                                    displayEmpty
                                    input={<BootstrapInput />}
                                >
                                    <MenuItem value={1}>Male</MenuItem>
                                    <MenuItem value={0}>Female</MenuItem>
                                </Select>
                            </FormControl>
                            <Typography gutterBottom>
                                Color:
                            </Typography>
                            <InputComponent onChange={(value) => handleChange(value, 'color')} value={color} />
                            <Typography gutterBottom>
                                Breed:
                            </Typography>
                            <InputComponent onChange={(value) => handleChange(value, 'breed')} value={breed} />
                            <Typography gutterBottom>
                                Weight:
                            </Typography>
                            <OutlinedInput
                                sx={{ borderRadius: 3, borderColor: '#ced4da', paddingY: 0.5, width: 320 }}
                                size='small'
                                type='text'
                                value={weight}
                                onChange={(value) => handleChange(value, 'weight')}
                                inputMode={<BootstrapInput />}
                                endAdornment={<InputAdornment position="end">kg</InputAdornment>}
                            />
                            <Typography gutterBottom>
                                Age:
                            </Typography>
                            <InputComponent type='number' onChange={(value) => handleChange(value, 'age')} value={age} />
                            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 1 }}>
                                <FormControlLabel control={<Checkbox checked={sterilization} onChange={(e) => handleChange(e, 'sterilization')} />} label="Sterilization" />
                                <FormControlLabel control={<Checkbox checked={rabiesVaccination} onChange={(e) => handleChange(e, 'rabiesVaccination')} />} label="RabiesVaccination" />
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <FormControlLabel control={<Checkbox checked={vaccination} onChange={(e) => handleChange(e, 'vaccination')} />} label="Vaccination" />
                                <FormControlLabel control={<Checkbox checked={safe} onChange={(e) => handleChange(e, 'safe')} />} label="Safe" />
                            </Box>
                        </Box>
                        <Box>
                            <Typography gutterBottom>
                                Price:
                            </Typography>
                            <OutlinedInput
                                sx={{ borderRadius: 3, borderColor: '#ced4da', paddingY: 0.5, width: 320 }}
                                size='small'
                                type='number'
                                value={price}
                                onChange={(value) => handleChange(value, 'price')}
                                inputMode={<BootstrapInput />}
                                endAdornment={<InputAdornment position="end">$</InputAdornment>}
                            />
                            <Typography gutterBottom>
                                Date received:
                            </Typography>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker sx={{ width: 320 }} slotProps={{ textField: { size: 'small' } }} onChange={(value) => handleChange(value, 'dateReceive')} value={dateReceived} />
                            </LocalizationProvider>
                            <Typography gutterBottom>
                                Description:
                            </Typography>
                            <StyledTextarea minRows={3} maxRows={4} onChange={(value) => handleChange(value, 'description')} value={description} />
                            <Typography gutterBottom>
                                Image:
                            </Typography>
                            <Stack spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap flexWrap="wrap">
                                <Stack direction="column" spacing={{ xs: 2 }}>
                                    <ImageComponent image={image1} onHandleUploadImage={(value) => handleUploadImage(value, 'image1')} />
                                    <ImageComponent image={image2} onHandleUploadImage={(value) => handleUploadImage(value, 'image2')} />
                                </Stack>
                                <Stack direction="column" spacing={{ xs: 2 }}>
                                    <ImageComponent image={image3} onHandleUploadImage={(value) => handleUploadImage(value, 'image3')} />
                                    <ImageComponent image={image4} onHandleUploadImage={(value) => handleUploadImage(value, 'image4')} />
                                </Stack>
                            </Stack>
                        </Box>
                    </Stack>
                    {error && <span className='error'>{error}</span>}
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={updatePet}>
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
                        Edit pet successful!
                    </Alert>
                </Snackbar>
            </BootstrapDialog>
        </div>
    );
};

export default ModalEditPet;