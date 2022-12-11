import React, { useState } from 'react';
import { Button, IconButton, Tooltip } from '@mui/material';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { EditSharp } from '@mui/icons-material';

export default function EditCustomer(props) {

    const [open, setOpen] = useState(false);
    const [customer, setCustomer] = useState(
        { firstname: '', lastname: '', email: '', phone: '', streetaddress: '', postcode: '', city: '' }
    );

    const handleClickOpen = () => {
        setCustomer({
            firstname: props.customer.firstname,
            lastname: props.customer.lastname,
            email: props.customer.email,
            phone: props.customer.phone,
            streetaddress: props.customer.streetaddress,
            postcode: props.customer.postcode,
            city: props.customer.city
        });
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleInputChange = (event) => {
        setCustomer({ ...customer, [event.target.name]: event.target.value });
    }

    const handleSave = () => {
        props.editCustomer(customer, props.url);
        handleClose();
    }

    return (
        <div>
            <Tooltip disableFocusListener title='Edit customer'>
                <IconButton variant='outlined' onClick={handleClickOpen}><EditSharp /></IconButton>
            </Tooltip>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Customer</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin='dense'
                        name='firstname'
                        value={customer.firstname}
                        onChange={e => handleInputChange(e)}
                        label='First name'
                        fullWidth
                        variant='standard'
                    />
                    <TextField
                        margin='dense'
                        name='lastname'
                        value={customer.lastname}
                        onChange={e => handleInputChange(e)}
                        label='Last name'
                        fullWidth
                        variant='standard'
                    />
                    <TextField
                        margin='dense'
                        name='email'
                        value={customer.email}
                        onChange={e => handleInputChange(e)}
                        label='Email'
                        fullWidth
                        variant='standard'
                    />
                    <TextField
                        margin='dense'
                        name='phone'
                        value={customer.phone}
                        onChange={e => handleInputChange(e)}
                        label='Phone'
                        fullWidth
                        variant='standard'
                    />
                    <TextField
                        margin='dense'
                        name='streetaddress'
                        value={customer.streetaddress}
                        onChange={e => handleInputChange(e)}
                        label='Address'
                        fullWidth
                        variant='standard'
                    />
                    <TextField
                        margin='dense'
                        name='postcode'
                        value={customer.postcode}
                        onChange={e => handleInputChange(e)}
                        label='Postcode'
                        fullWidth
                        variant='standard'
                    />
                    <TextField
                        margin='dense'
                        name='city'
                        value={customer.city}
                        onChange={e => handleInputChange(e)}
                        label='City'
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
    )
}