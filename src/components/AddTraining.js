import React, { useState } from 'react';
import { IconButton, Button, Tooltip } from '@mui/material';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import moment from 'moment';
import { AddBox } from '@mui/icons-material';

export default function AddTraining(props) {

    const [open, setOpen] = useState(false);
    const [training, setTraining] = useState({
        date: '', duration: 0, activity: '', customer: ''
    });

    const handleClickOpen = () => {
        setTraining({
            ...training,
            customer: props.url,
            date: moment().format('DD/MM/YYYY HH:mm')
        });
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleInputChange = (event) => {
        setTraining({ ...training, [event.target.name]: event.target.value });
    }

    const handleSave = () => {
        props.addTraining(training);
        handleClose();
    }

    return (
        <div>
            <Tooltip disableFocusListener title='Add training'>
                <IconButton variant='outlined' onClick={handleClickOpen}><AddBox /></IconButton>
            </Tooltip>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New training</DialogTitle>
                <DialogContent>
                    <TextField
                        margin='dense'
                        name='date'
                        type='datetime-local'
                        value={training.date}
                        onChange={e => handleInputChange(e)}
                        label='Date'
                        fullWidth
                        variant='standard'
                    />
                    <TextField
                        margin='dense'
                        name='duration'
                        value={training.duration}
                        onChange={e => handleInputChange(e)}
                        label='Duration'
                        fullWidth
                        variant='standard'
                    />
                    <TextField
                        margin='dense'
                        name='activity'
                        value={training.activity}
                        onChange={e => handleInputChange(e)}
                        label='Activity'
                        fullWidth
                        variant='standard'
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}