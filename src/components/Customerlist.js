import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import AddCustomer from './AddCustomer';
import AddTraining from './AddTraining';
import EditCustomer from './EditCustomer';
import Snackbar from '@mui/material/Snackbar';
import { IconButton, Tooltip } from '@mui/material';
import { DeleteSharp } from '@mui/icons-material';
import ExportCSV from './ExportCSV';

export default function Customerlist() {

    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => fetchCustomers(), []);

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    }

    const fetchCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
            .then(response => response.json())
            .then(data => setCustomers(data.content))
            .catch(err => console.error(err))
    }

    const addCustomer = (customer) => {
        fetch('https://customerrest.herokuapp.com/api/customers', {
            method: 'POST',
            body: JSON.stringify(customer),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => fetchCustomers())
            .catch(err => console.error(err))
    }

    const deleteCustomer = (link) => {
        if (window.confirm('Are you sure you want to delete this customer?')) {
            fetch(link, { method: 'DELETE' })
                .then(res => fetchCustomers())
                .catch(err => console.error(err))
            setMessage('Customer deleted!');
            handleClickOpen();
        }
    }

    const editCustomer = (customer, link) => {
        fetch(link, {
            method: 'PUT',
            body: JSON.stringify(customer),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => fetchCustomers())
            .catch(err => console.error(err))
    }

    const addTraining = (training) => {
        fetch('https://customerrest.herokuapp.com/api/trainings', {
            method: 'POST',
            body: JSON.stringify(training),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                setMessage('Training added!')
                setOpen(true);
            })
            .catch(err => console.error(err))
    }

    const sizeToFit = () => {
        gridOptions.api.sizeColumnsToFit();
    }

    const columns = [
        {
            headerName: '',
            width: '70',
            valueGetter: (params) => params.data.links[0].href,
            cellRenderer: params =>
                <EditCustomer customer={params.data} url={params.value} editCustomer={editCustomer} />
        },
        {
            headerName: '',
            field: 'link',
            width: '70',
            valueGetter: (params) => params.data.links[0].href,
            cellRenderer: params =>
                <Tooltip disableFocusListener title='Delete customer'>
                    <IconButton size='small' onClick={() => deleteCustomer(params.value)}><DeleteSharp /></IconButton>
                </Tooltip>
        },
        {
            headerName: '',
            width: '70',
            valueGetter: (params) => params.data.links[0].href,
            cellRenderer: params =>
                <AddTraining addTraining={addTraining} url={params.value} customer={params.data} />
        },
        {
            headerName: 'First name',
            field: 'firstname',
            sortable: true,
            filter: true
        },
        {
            headerName: 'Last name',
            field: 'lastname',
            sortable: true,
            filter: true,
        },
        {
            headerName: 'Email',
            field: 'email',
            sortable: true,
            filter: true
        },
        {
            headerName: 'Phone',
            field: 'phone',
            sortable: true,
            filter: true
        },
        {
            headerName: 'Address',
            field: 'streetaddress',
            sortable: true,
            filter: true
        },
        {
            headerName: 'Postcode',
            field: 'postcode',
            sortable: true,
            filter: true
        },
        {
            headerName: 'City',
            field: 'city',
            sortable: true,
            filter: true
        }
    ]

    const gridOptions = {
        columnDefs: columns,
        animateRows: true,
        onGridReady: _ => sizeToFit()
    }

    return (
        <div>
            <AddCustomer addCustomer={addCustomer} />
            <ExportCSV customers={customers} />
            <div
                className='ag-theme-material'
                style={{
                    height: '900px',
                    width: 'auto',
                    margin: 'auto'
                }}
            >
                <AgGridReact
                    rowData={customers}
                    gridOptions={gridOptions}
                />
            </div>
            <Snackbar
                open={open}
                autoHideDuration={5000}
                onClose={handleClose}
                message={message}
                action={deleteCustomer}
            />
        </div>
    );
}