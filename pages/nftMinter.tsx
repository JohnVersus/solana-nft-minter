import { Default } from 'components/layouts/Default';
import { GetServerSideProps, NextPage } from 'next';
import NFTMinter from 'components/templates/nftMinter/NFTMinter';

const NFTMinterPage: NextPage = (props) => {
  return (
    <Default pageName="Transactions">
      <NFTMinter {...props} />
    </Default>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};

export default NFTMinterPage;
