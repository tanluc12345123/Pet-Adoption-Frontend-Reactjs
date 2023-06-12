import React from 'react';
import { Grid, Container, Typography } from '@mui/material';
import AppWidgetSummary from '../../components/AppWidgetSummary/AppWidgetSummary';

const StatisticPage = () => {
    return (
        <>
            <Grid item xs={12} sm={6} md={3}>
                <AppWidgetSummary title="Weekly Sales" total={714000} icon={'ant-design:android-filled'} />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
                <AppWidgetSummary title="New Users" total={1352831} color="info" icon={'ant-design:apple-filled'} />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
                <AppWidgetSummary title="Item Orders" total={1723315} color="warning" icon={'ant-design:windows-filled'} />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
                <AppWidgetSummary title="Bug Reports" total={234} color="error" icon={'ant-design:bug-filled'} />
            </Grid>
        </>
    );
};

export default StatisticPage;
