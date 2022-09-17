// Balance API Param Types
import Moralis from 'moralis';
import { NextApiRequest, NextApiResponse } from 'next';

export type getNFTMetadataParams = Parameters<typeof Moralis.SolApi.nft.getNFTMetadata>[0];

interface getNativeBalanceRequest extends NextApiRequest {
  body: getNFTMetadataParams;
}

export default async function handler(req: getNativeBalanceRequest, res: NextApiResponse) {
  const { address, network } = req.body;
  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

  try {
    const data = await Moralis.SolApi.nft.getNFTMetadata({
      address,
      network,
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
}
