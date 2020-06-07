import React, { Component } from 'react';
import { Line } from '@ant-design/charts';

import { OldPriceChartState } from '../../Interface/Interface'

class HistoricalPriceChart extends Component<{ data: Array<any> }, OldPriceChartState> {
    state: OldPriceChartState = {
        data: this.props.data
    };

    render() {
        const { data } = this.props;

        const config = {
            title: {
                visible: false,
                text: 'Price on 2020-01-01',
            },
            description: {
                visible: true,
                text: 'Bitcoin Price Index (USD)',
            },
            padding: 'auto',
            forceFit: true,
            data,
            xField: 'time',
            yField: 'value',
            label: {
                visible: false,
                type: 'point',
            },
            point: {
                visible: true,
                size: 1,
                shape: 'diamond',
                style: {
                    fill: 'white',
                    stroke: '#2593fc',
                    lineWidth: 2,
                },
            },
            yAxis: {
                visble: true,
                max: 7250,
                min: 7150,
            },
            style:
            {
                height: '450px'
            }
        };


        return (
            <div className="Chart">
                <Line {...config} />
            </div>
        );

    }
}
export default HistoricalPriceChart;