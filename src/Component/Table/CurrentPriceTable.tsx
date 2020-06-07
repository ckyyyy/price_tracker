import React, { Component } from 'react';
import { Table } from 'antd';
import moment from 'moment';

import { CurrentPriceTableState, NowPriceResponseData } from '../../Interface/Interface'

class CurrentPriceTable extends Component<{}, CurrentPriceTableState> {
    state: CurrentPriceTableState = {
        nowPrice: undefined
    };

    interval: any;

    componentDidMount() {
        this.fetchCurrentBtcPrice();
        this.interval = setInterval(() => this.fetchCurrentBtcPrice(), 60000);
    }

    componentWillUnmount() {
        clearTimeout(this.interval);
    }

    fetchCurrentBtcPrice = () => {
        fetch('https://api.coindesk.com/v1/bpi/currentprice/usd.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error()
                }
                return response.json() as Promise<NowPriceResponseData>
            })
            .then(json =>
                this.setState({ nowPrice: json })
                // console.log(moment.utc(json.time.updatedISO).format("YYYY-MM-DD HH:mm:ss"))
            )
            .catch(error => console.error(error))
    }

    render() {
        const { nowPrice } = this.state;
        const dataSource = [
            {
                key: '1',
                utcTime: <div style={{ textAlign: 'right' }}> {nowPrice ? moment.utc(nowPrice.time.updatedISO).format("YYYY-MM-DD HH:mm:ss") : null} </div>,
                localTime: <div style={{ textAlign: 'center' }}> {nowPrice ? moment.utc(nowPrice.time.updatedISO).local().format("YYYY-MM-DD HH:mm:ss") : null}</div>,
                bpi: nowPrice?.bpi.USD.rate
            }
        ]

        const columns = [
            {
                title: <div style={{ textAlign: 'right' }}>Time (UTC)</div>,
                dataIndex: 'utcTime',
                key: 'utcTime',
            },
            {
                title: <div style={{ textAlign: 'center' }}>Time (local)</div>,
                dataIndex: 'localTime',
                key: 'localTime',
            },
            {
                title: 'Bitcoin Price Index (USD)',
                dataIndex: 'bpi',
                key: 'bpi',
            },
        ];

        return (

            <div className="CurrentPrice">
                <h2>Current Bitcoin Price in USD</h2>
                <Table className="PriceTable" dataSource={dataSource} columns={columns} pagination={false} footer={() => nowPrice?.disclaimer} />
            </div>
        );

    }
}
export default CurrentPriceTable;