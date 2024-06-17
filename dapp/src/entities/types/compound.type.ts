export interface Compound {
  poolName: string;
  utilization: string;
  supplyAPY: string;
  borrowAPY: string;
  TotalSupply: string;
  TotalBorrow: string;
}

export interface CompoundItem {
  symbol: string;
  totalBalance: string;
  totalBalanceParsed: any;
  decimals: string;
}

export interface CompoundComptrollerItem {
  name: string;
  totalBorrows: string;
  totalSupply: string;
  totalReserves: string;
  supplyBalance: string;
  utilization: string;
  cash: string;
  exchangeRate: string;
  totalEarnings: string;
  borrowRatePerBlock: string;
  supplyRatePerBlock: string;
  earnedARP: string;
}
