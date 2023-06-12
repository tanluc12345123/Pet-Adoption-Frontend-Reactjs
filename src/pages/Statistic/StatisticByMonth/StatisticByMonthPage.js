import React from 'react';
import { Grid , Typography} from '@mui/material';
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

const StatisticByMonthPage = () => {
    const title = "Statistic";

    const [isLoading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const [content, setContent] = useState('');
    const [monthChosen, setMonthChosen] = useState(new Date())
    const [numberPetAdoption, setNumberPetAdoption] = useState(0)
    const [numberBookService, setNumberBookService] = useState(0)
    const [numberBookVeterinarian, setNumberVeterinarian] = useState(0)
    const [totalPriceBookService, setTotalPriceBookService] = useState(0)
    const [totalPriceBookVeterinarian, setTotalPriceBookVeterinarian] = useState(0)

    const handleSelectMonth = async (value) => {
        setMonthChosen(value.$d)
        await getStatistic(value.$d)
    }

    const getStatistic = async (month) => {
        try {
            setLoading(true)
            const response = await Api.getStatisticByMonth(Moment(month).format('MM/yyyy'))
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
        getStatistic(new Date())
    }, [])

    return (
        <BaseScreen isLoading={isLoading} title={title} handleClose={() => setOpen(false)} open={open} content={content}>
            <Typography variant="h4" mb={2}>
                Statistic by Month
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker sx={{ width: 320 }} slotProps={{ textField: { size: 'small' } }} onChange={handleSelectMonth} value={dayjs(monthChosen)} views={['month', 'year']} />
            </LocalizationProvider>
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

export default StatisticByMonthPage;
