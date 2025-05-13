export interface Quota {
  id: string;
  type: string;
  attributes: {
    date: string;
    price: number;
    fixed_management_fee: number;
    fixed_management_fee_type: string;
    iva_exclusive_expenses: number;
    iva_exclusive_expenses_type: string;
    iva_inclusive_expenses: number;
    iva_inclusive_expenses_type: string;
    net_asset_value: number;
    net_asset_value_type: string;
    purchase_fee: number;
    purchase_fee_type: string;
    redemption_fee: number;
    redemption_fee_type: string;
    total_assets: number;
    total_assets_type: string;
    total_net_assets: number;
    total_net_assets_type: string;
    variable_management_fee: number;
    variable_management_fee_type: string;
    fixed_fee: number;
    fixed_fee_type: string;
    new_shares: number;
    new_shares_type: string;
    outstanding_shares: number;
    outstanding_shares_type: string;
    redeemed_shares: number;
    redeemed_shares_type: string;
    institutional_investors: number;
    institutional_investors_type: string;
    shareholders: number;
    shareholders_type: string;
  }
}

export interface QuotaResponse {
  data: Quota[];
}

export interface QuotaLite {
  id: string;
  date: string;
  price: number;
}
