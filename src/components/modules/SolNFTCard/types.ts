import { SolAddress } from '@moralisweb3/sol-utils';

export interface NFTAddress {
  nftAddress: SolAddress;
}

export interface Metadata {
  name: string;
  description: string;
  image: string;
  symbol: string;
}
