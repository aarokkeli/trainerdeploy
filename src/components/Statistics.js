import { useState, useEffect } from 'react';
import _ from 'lodash';
import { BarChart, Bar, CartesianGrid, Legend, Tooltip, XAxis, YAxis, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

export default function Statistics() {

    const [trainings, setTrainings] = useState([]);
    const [group, setGroup] = useState([]);
    const [data, setData] = useState([]);
    const colors = ['#8884d8', '#82ca9d', '#FFBB28', '#FF8042', '#AF19FF', '#c3162a', '#db3382', '#b84c18', '#d1da24', '#92f6c1'];

    useEffect(() => fetchTrainings(), []);

    const fetchTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
            .then(response => response.json())
            .then(data => setTrainings(data))
            .catch(err => console.error(err))
    }

    useEffect(() => {
        const arr = [];
        setGroup(_.groupBy(trainings, 'activity'));
        for (const property in group) {
            arr.push({ name: property, duration: _.sumBy(group[property], 'duration') });
        }
        setData(arr);
        // eslint-disable-next-line
    }, [trainings]);

    return (
        <div style={{ width: '100%', height: '500px', display: 'inline-block', maxWidth: '1250px' }}>
            <ResponsiveContainer>
                <BarChart
                    data={data}
                    margin={{ top: 30, left: 0, right: 10, bottom: 0 }}
                >
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis dataKey='name' />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey='duration' fill='#8884d8' name='Duration' />
                </BarChart>
            </ResponsiveContainer>
            <ResponsiveContainer>
                <PieChart>
                    <Pie
                        dataKey='duration'
                        data={data}
                        cx='50%'
                        cy='50%'
                        outerRadius='180'
                        label
                    >
                        {trainings.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={colors[index % colors.length]}
                            />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}