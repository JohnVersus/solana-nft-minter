import { Box, HStack, Image, SimpleGrid, useColorModeValue } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { resolveIPFS } from 'utils/resolveIPFS';
import { FC } from 'react';
import apiPost from 'utils/apiPost';
import axios from 'axios';
import type { Metadata, NFTAddress } from './types';

const SolNFTCard: FC<NFTAddress> = ({ nftAddress }) => {
  const bgColor = useColorModeValue('none', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const descBgColor = useColorModeValue('gray.100', 'gray.600');
  const [nftData, setNftData] = useState({ contractType: '', name: '', symbol: '', image: '' });

  const getNFTMetadata = async () => {
    const options = {
      network: 'devnet',
      address: nftAddress,
    };
    const response = await apiPost('/SolApi/nft/getNFTMetadata', options);
    const result = await axios.get<Metadata>(`${response.metaplex.metadataUri}`, {
      headers: {
        'content-type': 'application/json',
      },
    });
    setNftData({
      contractType: response.standard,
      name: result.data.name,
      symbol: result.data.symbol,
      image: result.data.image,
    });
  };

  useEffect(() => {
    if (nftAddress) {
      getNFTMetadata();
    }
  }, [nftAddress]);

  return (
    <>
      <Box maxWidth="315px" bgColor={bgColor} padding={3} borderRadius="xl" borderWidth="1px" borderColor={borderColor}>
        <Box maxHeight="260px" overflow={'hidden'} borderRadius="xl">
          <Image
            src={resolveIPFS(nftData?.image)}
            alt={'nft'}
            minH="260px"
            minW="260px"
            boxSize="100%"
            objectFit="fill"
          />
        </Box>
        <Box mt="1" fontWeight="semibold" as="h4" noOfLines={1} marginTop={2}>
          {nftData?.name ? nftData?.name : <>no name</>}
        </Box>
        <HStack alignItems={'center'}>
          <Box as="h4" noOfLines={1} fontWeight="medium" fontSize="smaller">
            {nftData?.contractType} standard
          </Box>
        </HStack>
        <SimpleGrid columns={1} spacing={4} bgColor={descBgColor} padding={2.5} borderRadius="xl" marginTop={2}>
          <Box>
            <Box as="h4" noOfLines={1} fontWeight="medium" fontSize="sm">
              Symbol
            </Box>
            <Box as="h4" noOfLines={1} fontSize="sm">
              {nftData?.symbol ? nftData?.symbol : <>no symbol</>}
            </Box>
          </Box>
        </SimpleGrid>
      </Box>
    </>
  );
};

export default SolNFTCard;
