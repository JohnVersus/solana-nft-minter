import type { NextApiRequest, NextApiResponse } from 'next';
import { Connection, clusterApiUrl, Keypair } from '@solana/web3.js';
import { bundlrStorage, Metaplex, walletAdapterIdentity } from '@metaplex-foundation/js';
import base58 from 'bs58';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '5mb',
    },
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!process.env.PRIVATE_KEY) {
    throw new Error('Add Private Key in env File');
  }
  const { name, description, image, symbol } = req.body;
  const connection = new Connection(clusterApiUrl('devnet'));
  const metaplex = new Metaplex(connection);
  const key = Uint8Array.from(base58.decode(process.env.PRIVATE_KEY));

  const keypair = Keypair.fromSecretKey(key);
  console.log(`keypair created: ${keypair.publicKey.toString()}`);

  metaplex.use(walletAdapterIdentity(keypair));
  console.log('Using key');
  metaplex.use(
    bundlrStorage({
      address: 'https://devnet.bundlr.network',
      providerUrl: 'https://api.devnet.solana.com',
      timeout: 60000,
      identity: keypair,
    }),
  );
  console.log('Uploading');

  try {
    const data = await metaplex
      .nfts()
      .uploadMetadata({
        name,
        description,
        image,
        symbol
      })
      .run();

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error });
    console.log(error);
  }
}
