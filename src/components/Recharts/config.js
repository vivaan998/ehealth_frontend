// ReCharts styling configuration
import colors from './../../colors';

export default {
    grid: {
        stroke: '#CED4DA',
        strokeWidth: 1,
        strokeDasharray: '1px'
    },
    polarGrid: {
        stroke: '#CED4DA',
    },
    axis: {
        stroke: '#ADB5BD',
        strokeWidth: 1,
        style: {
            fontSize: '12px'
        },
        tick: {
            // Axis Labels color:
            fill: '#353C48'
        }
    },
    polarRadiusAxis: {
        stroke: '#CED4DA',
        tick: {
            fill: '#353C48'
        }
    },
    polarAngleAxis: {
        tick: {
            fill: '#353C48'
        },
        style: {
            fontSize: '12px'
        }
    },
    label: {
        fontSize: 11,
        fill: '#353C48'
    },
    legend: {
        wrapperStyle: {
            color: '#353C48'
        }
    },
    pieLabel: {
        fontSize: 12,
        fill: colors[100]
    },
    tooltip: {
        cursor: {
            fill: '#1EB7FF',
            opacity: 0.1
        },
        contentStyle: {
            background: '#353C48',
            border: `1px solid #FFF`,
            color: '#FFF'
        }
    }
};