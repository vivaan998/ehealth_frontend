import React from 'react';
import {
    BarChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Legend,
    Bar
} from './../../../../components/recharts';

import colors from './../../../../colors';



class SimpleBarChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data
        }
    }

    render() {
        return (
            <ResponsiveContainer width='90%' aspect={1/0.3}>
                <BarChart
                    data={this.state.data}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis dataKey="total_immunizations"/>
                    <Tooltip
                        contentStyle={{
                            background: '#353C48',
                            border: `1px solid #FFF`,
                            color: '#FFF'
                        }}
                    />
                    <Legend wrapperStyle={{ color: '#000000' }} />
                    <Bar dataKey="total_immunizations" fill='#1EB7FF' barSize={25} />
                </BarChart>
            </ResponsiveContainer>
        )
    }
}


export default SimpleBarChart;
