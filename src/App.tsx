import React, { Component } from 'react';
import './App.css';
import CurrentPriceTable from './Component/Table/CurrentPriceTable';
import HistoricalPriceCard from './Component/Card/HistoricalPriceCard';

class App extends Component<{}>{
  render() {
    return (
      <div className="App">
        <h1>Bitcoin Price Tracker</h1>
        <CurrentPriceTable />
        <HistoricalPriceCard />
      </div>
    )
  }
}

export default App;
