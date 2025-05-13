export interface Fund {
  data: {
    id: string;
    type: string;
    attributes: {
      name: string;
      symbol: string;
      serie: string;
      start_date: Date | string;
      end_date: Date | string;
      previous_asset_id: string | number;
      last_day: {
        net_asset_value: number;
        date: string;
      };
      conceptual_asset_id: number;
    };
  };
}

export interface FundLite {
  id: string;
  name: string;
}
