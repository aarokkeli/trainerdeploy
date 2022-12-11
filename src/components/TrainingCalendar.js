import { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

export default function TrainingCalendar() {

    const [events, setEvents] = useState([]);
    const localizer = momentLocalizer(moment);

    useEffect(() => fetchTrainings(), []);

    const fetchTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
            .then(response => response.json())
            .then(data => setEvents(eventConverter(data)))
            .catch(err => console.error(err))
    }

    const eventConverter = (list) => {
        const newList = list.map((event) => {
            return {
                start: moment(event.date).toDate(),
                end: moment(event.date).add(event.duration, 'm').toDate(),
                title: event.activity + ' / ' + event.customer?.firstname + ' ' + event.customer?.lastname
            }
        });
        return newList;
    }

    return (
        <div>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
            />
        </div>
    );
}