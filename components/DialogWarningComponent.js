import React from 'react';

import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';
import WarningIcon from '@mui/icons-material/Warning';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const DialogWarningComponent = ({setOpen, open, title, description}) => {

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Dialog
            open={open}
            fullWidth={true}
            maxWidth="xs"
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>
                <>
                    <Grid container justifyContent="center" alignItems="center">
                        <WarningIcon sx={{fontSize: "45px", marginRight: "15px", color: "#de2d2d"}}/>
                        {title}

                    </Grid>
                </>
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    {description}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cerrar</Button>
            </DialogActions>
        </Dialog>
    );
}

export default DialogWarningComponent;