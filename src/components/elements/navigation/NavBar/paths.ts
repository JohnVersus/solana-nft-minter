import { ISubNav } from '../SubNav/SubNav';

const NAV_LINKS: ISubNav[] = [
  { label: 'Home', href: '/' },
  {
    label: 'Transactions',
    href: '/transactions',
  },
  {
    label: 'Transfers',
    href: '/transfers',
    children: [
      {
        label: 'SPL',
        subLabel: 'Get your SPL transfers',
        href: '/transfers/spl',
        logo: 'token',
      },
      {
        label: 'NFT',
        subLabel: 'Get your NFT transfers',
        href: '/transfers/nft',
        logo: 'lazyNft',
      },
    ],
  },
  {
    label: 'Balances',
    href: '/balances',
    children: [
      {
        label: 'SPL',
        subLabel: 'Get your SPL balances',
        href: '/balances/spl',
        logo: 'token',
      },
      {
        label: 'NFT',
        subLabel: 'Get your NFT balances',
        href: '/balances/nft',
        logo: 'pack',
      },
    ],
  },
];

export default NAV_LINKS;
