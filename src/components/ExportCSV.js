import { CSVLink } from 'react-csv';

export default function ExportCSV(props) {

    const headers = [
        { label: 'firstname', key: 'firstname' },
        { label: 'lastname', key: 'lastname' },
        { label: 'email', key: 'email' },
        { label: 'phone', key: 'phone' },
        { label: 'streetaddress', key: 'streetaddress' },
        { label: 'postcode', key: 'postcode' },
        { label: 'city', key: 'city' },
    ]

    return (
        <div>
            <CSVLink
                headers={headers}
                data={props.customers}
                filename={'customers.csv'}
                className='btn btn_primary'
                target='_blank'
            >
                Download .CSV file
            </CSVLink>
        </div>
    )
}