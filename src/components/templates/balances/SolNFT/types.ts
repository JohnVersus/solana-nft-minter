import Moralis from 'moralis';

export type TSolNFTBalance = Pick<Awaited<ReturnType<typeof Moralis.SolApi.account.getNFTs>>, 'result'>['result'];

export interface ISolNFTBalances {
  balances?: TSolNFTBalance;
}
