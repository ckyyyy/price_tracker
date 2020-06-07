import React, { Component } from 'react';
import { Row, Col, Select } from 'antd';

import moment from 'moment';

import { OldPriceCardState, OldPriceResponseData, ChartPriceData } from '../../Interface/Interface'
import HistoricalPriceChart from '../Chart/HistoricalPriceChart';

class HistoricalPriceCard extends Component<{}, OldPriceCardState> {
    state: OldPriceCardState = {
        oldPrices: [],
        byMinutes: true
    };

    componentDidMount() {
        this.fetchHistoricalBtcPrice();
    }

    fetchHistoricalBtcPrice = () => {
        fetch('https://gist.githubusercontent.com/minocys/8abb34a2e3fc58a8d53e04b003718362/raw/4451215a4e9acd8192d39f1b9e6edf0a75af4a42/front-end-data.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error()
                }

                return response.json() as Promise<OldPriceResponseData>
            })
            .then(json =>
                this.setState({ oldPrices: json.data })
            )
            .catch(error => console.error(error))
    }

    handleChange = (value: any): void => {
        this.setState({ byMinutes: value === 'byMinutes' })
    }

    render() {
        const { oldPrices, byMinutes } = this.state;

        const { Option } = Select;

        const minutesData: ChartPriceData[]
            = oldPrices.map(oldPrice => ({ time: moment(oldPrice.quote_time).format("HH:mm"), value: oldPrice.usd_price }));
        const hourlyData: ChartPriceData[]
            = oldPrices.filter(oldPrice => (moment(oldPrice.quote_time).minutes() === 0)).map(hourlyPrice => ({ time: moment(hourlyPrice.quote_time).format("HH:mm"), value: hourlyPrice.usd_price }));

        return (
            <div className="Chart">
                <h2>Historical Bitcoin Price</h2>

                <div className="chartTitle">
                    <Row>
                        <Col span={6} offset={9}>
                            <h3>Price on 2020-01-01</h3>
                        </Col>
                        <Col span={4} offset={4}>
                            <Select defaultValue="byMinutes" style={{ width: 120 }} onChange={this.handleChange}>
                                <Option value="byMinutes">By Minutes</Option>
                                <Option value="byHours">By Hours</Option>
                            </Select>
                        </Col>
                    </Row>
                </div>

                {byMinutes ?
                    <HistoricalPriceChart data={minutesData} /> :
                    <HistoricalPriceChart data={hourlyData} />
                }
            </div>
        );

    }
}
export default HistoricalPriceCard;