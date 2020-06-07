import React, { Component } from 'react';
import { Table } from 'antd';

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
            )
            .catch(error => console.error(error))
    }

    render() {
        const { nowPrice } = this.state;
        const dataSource = [
            {
                key: '1',
                time: nowPrice?.time.updated,
                bpi: nowPrice?.bpi.USD.rate
            }
        ]

        const columns = [
            {
                title: 'Time',
                dataIndex: 'time',
                key: 'time',
            },
            {
                title: 'Bitcoin Price Index (USD)',
                dataIndex: 'bpi',
                key: 'bpi',
            },
        ];

        return (
            
            <div className="PriceTable">
                    <h2>Current Bitcoin Price in USD</h2>
                    <Table dataSource={dataSource} columns={columns} pagination={false} footer={() => nowPrice?.disclaimer}
                        style={{
                            padding: '10px 10px 20px', width: '60%', display: "flex",
                            flexDirection: "column",
                            justifyItems: "center",
                            alignItems: "center",
                            margin: "auto"
                        }}
                    />
            </div>
        );

    }
}
export default CurrentPriceTable;