import React from 'react';
import { Grid, Typography, Box, FormControl, Select, MenuItem } from '@mui/material';
import AppWidgetSummary from '../../../components/AppWidgetSummary/AppWidgetSummary';
import { useState } from 'react';
import BaseScreen from '../../../components/BaseScreen/BaseScreen';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import Moment from 'moment'
import Api from '../../../api/Api';
import { useEffect } from 'react';

const quarterList = {
    '01': 1,
    '02': 1,
    '03': 1,
    '04': 2,
    '05': 2,
    '06': 2,
    '07': 3,
    '08': 3,
    '09': 3,
    '10': 4,
    '11': 4,
    '12': 4,
}
const StatisticByQuarterPage = () => {
    const [isLoading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const [content, setContent] = useState('');
    const [quarter, setQuarter] = useState(quarterList[Moment(new Date()).format("MM")]);

    const title = "Statistic";

    const [numberPetAdoption, setNumberPetAdoption] = useState(0)
    const [numberBookService, setNumberBookService] = useState(0)
    const [numberBookVeterinarian, setNumberVeterinarian] = useState(0)
    const [totalPriceBookService, setTotalPriceBookService] = useState(0)
    const [totalPriceBookVeterinarian, setTotalPriceBookVeterinarian] = useState(0)
    const [yearChosen, setYearChosen] = useState(new Date())


    const handleSelected = async (e) => {
        setQuarter(e.target.value)
        await getStatistic(e.target.value, yearChosen)
    }

    const handleSelectYear = async (value) => {
        setYearChosen(value.$d)
        await getStatistic(quarter, value.$d)
    }

    const getStatistic = async (quarter, year) => {
        try {
            setLoading(true)
            const response = await Api.getStatisticByQuarter(quarter, Moment(year).format('yyyy'))
            console.log(response.data.data)
            if (response.data.status == "Success") {
                setNumberPetAdoption(response.data.data.numberPetAdopt)
                setNumberBookService(response.data.data.numberBookService)
                setNumberVeterinarian(response.data.data.numberBookVeterinarian)
                setTotalPriceBookService(response.data.data.totalPriceOfService)
                setTotalPriceBookVeterinarian(response.data.data.totalPriceVeterinarian)
            }
            setLoading(false)
        } catch (error) {
            setContent(error.message)
            setOpen(true)
            setLoading(false)
        }
    }

    useEffect(() => {
        getStatistic(quarter, Moment(yearChosen).format('yyyy'))
    }, [])

    return (
        <BaseScreen isLoading={isLoading} title={title} handleClose={() => setOpen(false)} open={open} content={content}>
            <Typography variant="h4" mb={2}>
                Statistic by quarter
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <FormControl sx={{ minWidth: 120, borderRadius: 2, marginBottom: 2, marginRight: 2 }} size="small">
                    <Select
                        value={quarter}
                        displayEmpty
                        onChange={handleSelected}
                    >
                        <MenuItem value={1}>Quarter 1</MenuItem>
                        <MenuItem value={2}>Quarter 2</MenuItem>
                        <MenuItem value={3}>Quarter 3</MenuItem>
                        <MenuItem value={4}>Quarter 4</MenuItem>
                    </Select>
                </FormControl>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker sx={{ width: 120 }} slotProps={{ textField: { size: 'small' } }} onChange={handleSelectYear} value={dayjs(yearChosen)} views={['year']} />
                </LocalizationProvider>
            </Box>
            <Grid container spacing={3} sx={{ marginTop: 1 }}>
                <Grid item xs={12} sm={6} md={6}>
                    <AppWidgetSummary title="Pet Adoption" total={numberPetAdoption} icon={'mdi:pets'} />
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                    <AppWidgetSummary title="Ordered Service" total={numberBookService} color="info" icon={'mdi:dog-service'} />
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                    <AppWidgetSummary title="Order Veterinarian" total={numberBookVeterinarian} color="warning" icon={'mdi:doctor'} />
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <AppWidgetSummary title="Profit Service" total={totalPriceBookService} color="error" icon={'game-icons:profit'} type="price" />
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <AppWidgetSummary title="Profit Veterinarian" total={totalPriceBookVeterinarian} color="error" icon={'game-icons:profit'} type="price" />
                </Grid>
            </Grid>
        </BaseScreen>
    );
};

export default StatisticByQuarterPage;