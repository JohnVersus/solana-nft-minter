import { Default } from 'components/layouts/Default';
import { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import Moralis from 'moralis';
import { SPLBalances, ISPLBalances } from 'components/templates/balances/SPL';

const SPL: NextPage<ISPLBalances> = (props) => {
  return (
    <Default pageName="ERC20 Balances">
      <SPLBalances {...props} />
    </Default>
  );
};

// TO-DO: SPL for SPL contract need to be added when available
// TO-DO: Requires fix for contract name and other data when available from api

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

  if (!session?.user.address) {
    return { props: { error: 'Connect your wallet first' } };
  }

  const balances = await Moralis.SolApi.account.getSPL({
    address: session?.user.address,
    network: process.env.APP_CHAIN_ID,
  });

  return {
    props: {
      balances: JSON.parse(JSON.stringify(balances)),
    },
  };
};

export default SPL;
