import React from 'react';
import { 
    Pie, 
    ResponsiveContainer,
    PieChart
}  from './../../../../components/recharts';

import colors from './../../../../colors';

const data01 = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 }
];

const data02 = [
    { name: 'A1', value: 100 },
    { name: 'A2', value: 300 },
    { name: 'B1', value: 100 },
    { name: 'B2', value: 80 },
    { name: 'B3', value: 40 },
    { name: 'B4', value: 30 },
    { name: 'B5', value: 50 },
    { name: 'C1', value: 100 },
    { name: 'C2', value: 200 },
    { name: 'D1', value: 150 },
    { name: 'D2', value: 50 }
];

const TwoLevelPieChart = () => (
    <ResponsiveContainer width='100%' aspect={6.0/3.0}>
        <PieChart>
            <Pie
                data={data01}
                dataKey="value"
                outerRadius={67}
                fill='#1EB7FF'
                stroke='#FFF'
            />
            <Pie
                data={data02}
                dataKey="value"
                innerRadius={70}
                outerRadius={80}
                fill='#CA8EFF'
                stroke='#FFF'
                label={{fill: '#3F4651', fontSize: '12px'}}
            />
       </PieChart>
    </ResponsiveContainer>

)

export { TwoLevelPieChart };
