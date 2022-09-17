import { Box, Grid, Heading } from '@chakra-ui/react';
import { SolNFTCard } from 'components/modules';
import { FC, useEffect } from 'react';
import { ISolNFTBalances } from './types';

const SolNFTBalances: FC<ISolNFTBalances> = ({ balances }) => {
  useEffect(() => console.log('balances: ', balances), [balances]);
  return (
    <>
      <Heading size="lg" marginBottom={6}>
        NFT Balances
      </Heading>
      {balances?.length ? (
        <Grid templateColumns="repeat(auto-fit, minmax(280px, 1fr))" gap={6}>
          {balances?.map((balance, key) => (
            <SolNFTCard nftAddress={balance.mint} key={key} />
          ))}
        </Grid>
      ) : (
        <Box>Looks Like you do not have any NFTs</Box>
      )}
    </>
  );
};

export default SolNFTBalances;
