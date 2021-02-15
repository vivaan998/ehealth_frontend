import React from 'react';
import {  
    ResponsiveContainer,
    Radar, 
    RadarChart, 
    PolarGrid, 
    Legend,
    PolarAngleAxis, 
    PolarRadiusAxis
} from './../../../../components/recharts';

import colors from './../../../../colors';

const data = [
    { subject: 'Math', A: 120, B: 110, fullMark: 150 },
    { subject: 'Chinese', A: 98, B: 130, fullMark: 150 },
    { subject: 'English', A: 86, B: 130, fullMark: 150 },
    { subject: 'Geography', A: 99, B: 100, fullMark: 150 },
    { subject: 'Physics', A: 85, B: 90, fullMark: 150 },
    { subject: 'History', A: 65, B: 85, fullMark: 150 },
];

class SpecifiedDomainRadarChart extends React.Component{
    constructor(props){
        super(props);
        console.log('radar >>>', props.data);
        this.state = {
            data: props.data,
            
        }

    }
    render(){        
        var max = Math.max.apply(Math, (this.state.data).map(function(o) { return o.total_immunizations; }));
        var min = Math.min.apply(Math, (this.state.data).map(function(o) { return o.total_immunizations; }));
        return(
            <ResponsiveContainer width='100%' aspect={ 1/1 }>
                <RadarChart outerRadius={120} data={this.state.data}>
                <PolarGrid stroke='#CED4DA' />
                <PolarAngleAxis dataKey="provider" />
                <PolarRadiusAxis angle={0} domain={[max, min]} />
                <Radar name="Immunizations" dataKey="total_immunizations" stroke='#6610f2' fill='#6610f2' fillOpacity={0.3}/>
                <Legend />
                </RadarChart>
            </ResponsiveContainer>
        )
    }
}

export default SpecifiedDomainRadarChart;
