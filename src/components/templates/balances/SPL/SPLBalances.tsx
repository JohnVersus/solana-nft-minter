import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
  VStack,
  Heading,
  Box,
  Text,
  Avatar,
  HStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { FC, useEffect } from 'react';
import { getEllipsisTxt } from 'utils/format';
import { ISPLBalances } from './types';

const SPLBalances: FC<ISPLBalances> = ({ balances }) => {
  const hoverTrColor = useColorModeValue('gray.100', 'gray.700');

  useEffect(() => console.log('balances: ', balances), [balances]);

  return (
    <>
      <Heading size="lg" marginBottom={6}>
        ERC20 Balances
      </Heading>
      {balances?.length ? (
        <Box border="2px" borderColor={hoverTrColor} borderRadius="xl" padding="24px 18px">
          <TableContainer w={'full'}>
            <Table>
              <Thead>
                <Tr>
                  <Th>Token</Th>
                  <Th>Value</Th>
                  <Th isNumeric>Address</Th>
                </Tr>
              </Thead>
              <Tbody>
                {balances?.map(({ mint, amount }, key) => (
                  <Tr key={`${mint}-${key}-tr`} _hover={{ bgColor: hoverTrColor }} cursor="pointer">
                    <Td>
                      <HStack>
                        <Avatar size="sm" name={'N/A'} />
                        <VStack alignItems={'flex-start'}>
                          <Text as={'span'}>{'N/A'}</Text>
                          <Text fontSize={'xs'} as={'span'}>
                            {'N/A'}
                          </Text>
                        </VStack>
                      </HStack>
                    </Td>
                    <Td>{amount}</Td>
                    <Td isNumeric>{getEllipsisTxt(mint || '')}</Td>
                  </Tr>
                ))}
              </Tbody>
              <Tfoot>
                <Tr>
                  <Th>Token</Th>
                  <Th>Value</Th>
                  <Th isNumeric>Address</Th>
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>
        </Box>
      ) : (
        <Box>Looks Like you do not have any ERC20 tokens</Box>
      )}
    </>
  );
};

export default SPLBalances;
