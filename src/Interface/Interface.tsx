export interface CurrentPriceTableState {
  nowPrice: NowPriceResponseData | undefined,

};

export interface OldPriceCardState {
  oldPrices: Array<OldPriceData>,
  byMinutes: Boolean,
};

export interface OldPriceChartState {
  data: Array<any>
};

export interface ChartPriceData{
  time: string,
  value: number
}

export interface NowPriceResponseData {
  time: {
    updated: string,
    updatedISO: string,
    updateduk: string
  },
  disclaimer: string,
  bpi: {
    USD:
    {
      code: string,
      rate: number,
      description: string,
      rate_float: number
    }
  }
};
  
export interface OldPriceResponseData {
    data: Array<OldPriceData>
  };
  
export interface OldPriceData {
  quote_time: string,
  id: number,
  name: string,
  symbol: string,
  btc_price: number,
  btc_marketcap: number,
  btc_volume_24h: number,
  usd_price: number,
  usd_marketcap: number,
  usd_volume_24h: number,
  token_dominance_rate: number
};