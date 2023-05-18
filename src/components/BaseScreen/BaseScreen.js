import './BaseScreen.css'
import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Slide from '@mui/material/Slide';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const BaseScreen = (props) => {
    return (
        <div className="container">
            {props.children}
            <Dialog
                open={props.open}
                TransitionComponent={Transition}
                keepMounted
                onClose={props.handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{props.title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        {props.content}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleClose}>OK</Button>
                </DialogActions>
            </Dialog>
            {props.isLoading && <Dialog open={props.isLoading}>
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={props.isLoading}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            </Dialog>}
        </div>
    )
}

export default BaseScreen
