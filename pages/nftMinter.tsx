import { Default } from 'components/layouts/Default';
import { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import Moralis from 'moralis';
import NFTMinter from 'components/templates/nftMinter/NFTMinter';

const NFTMinterPage: NextPage = (props) => {
  return (
    <Default pageName="Transactions">
      <NFTMinter {...props} />
    </Default>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {},
  };
};

export default NFTMinterPage;
