import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { 
    Line, 
    CartesianGrid, 
    XAxis, 
    YAxis, 
    Tooltip, 
    ResponsiveContainer,
    Legend, 
    LineChart,
    Dot
} from './../../../../components/recharts';

import colors from './../../../../colors';


class SimpleLineChart extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data: props.data
        }
        console.log(this.state.data);
    }
    render(){
        return(
            <ResponsiveContainer width='100%'   aspect={4 / 1}>
                <LineChart data={this.state.data}
                    margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                <XAxis dataKey="Week"/>
                <YAxis/>
                <CartesianGrid strokeDasharray="3 3"/>
                <Tooltip/>
                <Legend />
                <Line dataKey="total_appointments" stroke='#1BB934'/>
            </LineChart>
            </ResponsiveContainer>
        );
    }
}


export default SimpleLineChart;
