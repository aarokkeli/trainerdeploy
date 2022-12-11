import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import moment from 'moment';
import 'moment-timezone';
import { IconButton, Snackbar, Tooltip } from '@mui/material';
import { DeleteSharp } from '@mui/icons-material';

export default function Traininglist() {

    const [open, setOpen] = useState(false);
    const [trainings, setTrainings] = useState([]);

    useEffect(() => fetchTrainings(), []);

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    }

    const fetchTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
            .then(response => response.json())
            .then(data => setTrainings(data))
            .catch(err => console.error(err))
    }

    const deleteTraining = (id) => {
        if (window.confirm('Are you sure you want to delete this training?')) {
            fetch('https://customerrest.herokuapp.com/api/trainings/' + id, { method: 'DELETE' })
                .then(res => fetchTrainings())
                .catch(err => console.error(err))
            handleClickOpen();
        }
    }

    const dateFormatter = (params) => {
        return moment(params.value).format('DD/MM/YYYY HH:mm');
    }

    const nameFormatter = (params) => {
        return params.data.customer.firstname + ' ' + params.data.customer.lastname;
    }

    const sizeToFit = () => {
        gridOptions.api.sizeColumnsToFit();
    }

    const columns = [
        {
            headerName: '',
            field: 'id',
            width: '70',
            cellRenderer: params =>
                <Tooltip disableFocusListener title='Delete training'>
                    <IconButton onClick={() => deleteTraining(params.value)}><DeleteSharp /></IconButton>
                </Tooltip>
        },
        {
            headerName: 'Date',
            field: 'date',
            sortable: true,
            filter: true,
            valueFormatter: dateFormatter,
            resizable: true
        },
        {
            headerName: 'Duration (min)',
            field: 'duration',
            sortable: true,
            filter: true,
            resizable: true
        },
        {
            headerName: 'Activity',
            field: 'activity',
            sortable: true,
            filter: true,
            resizable: true
        },
        {
            headerName: 'Customer',
            field: 'customer',
            valueGetter: nameFormatter,
            sortable: true,
            filter: true,
            resizable: true
        },
    ]

    const gridOptions = {
        columnDefs: columns,
        animateRows: true,
        onGridReady: _ => sizeToFit()
    }

    return (
        <div>
            <div
                className='ag-theme-material'
                style={{
                    height: '900px',
                    width: 'auto',
                    margin: 'auto'
                }}
            >
                <AgGridReact
                    rowData={trainings}
                    gridOptions={gridOptions}
                />
            </div>
            <Snackbar
                open={open}
                autoHideDuration={5000}
                onclose={handleClose}
                message='Training deleted!'
                action={deleteTraining}
            />
        </div>
    );
}