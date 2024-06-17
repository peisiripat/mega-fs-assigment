export interface Compound {
  poolName: string;
  utilization: string;
  supplyAPY: string;
  borrowAPY: string;
  TotalSupply: string;
  TotalBorrow: string;
}

// export interface CompoundItem {
//   symbol: string;
//   totalBalance: string;
//   totalBalanceParsed: any;
// }

export interface CompoundComptrollerItem {
  name: string;
  totalBorrows: string;
  totalSupply: string;
  totalReserves: string;
  supplyBalance: string;
  cash: string;
  exchangeRate: string;
  totalEarnings: string;
  borrowRatePerBlock: string;
  supplyRatePerBlock: string;
  decimals: string;
  supplyAPY: string;
  borrowAPY: string;
}

export interface CompoundABIItem {
  name: string;
  totalBorrows: bigint;
  totalSupply: bigint;
  totalReserves: bigint;
  supplyBalance: bigint;
  cash: bigint;
  exchangeRate: string;
  totalEarnings: string;
  borrowRatePerBlock: string;
  supplyRatePerBlock: string;
  decimals: string;
  supplyAPY: bigint;
  borrowAPY: bigint;
}
