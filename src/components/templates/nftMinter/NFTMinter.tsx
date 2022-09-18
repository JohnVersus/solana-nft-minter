import {
  FormControl,
  FormLabel,
  useColorModeValue,
  Input,
  SimpleGrid,
  Box,
  Flex,
  Image,
  Textarea,
  Button,
  Heading,
} from '@chakra-ui/react';
import { FC, useState, ChangeEvent, useEffect } from 'react';

const NFTMinter: FC = () => {
  const descBgColor = useColorModeValue('gray.100', 'gray.600');
  const [imageUrl, setImageUrl] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  // eslint-disable-next-line no-undef
  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageUrl(URL.createObjectURL(e.target.files[0]));
    }
  };
  // eslint-disable-next-line no-undef
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  // eslint-disable-next-line no-undef
  const handleDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  useEffect(() => {
    if (name && description) {
      console.log({ name, description });
    }
  }, [name, description]);

  return (
    <>
      <Heading size="lg" marginBottom={6}>
        Solana NFT Minter
      </Heading>
      <FormControl isRequired>
        <SimpleGrid
          h={450}
          columns={2}
          row={1}
          spacing={2}
          bgColor={descBgColor}
          padding={4}
          borderRadius="xl"
          marginTop={2}
        >
          <Flex alignItems={'center'} justifyContent={'center'}>
            <Image
              src={imageUrl}
              fallbackSrc="https://via.placeholder.com/300/657287/FFFFFF?text=Select+Image+To+Mint"
              alt={'No Image'}
              objectFit="cover"
              boxSize="400"
            />
          </Flex>
          <Flex direction={'column'} alignItems={'stretch'} justifyContent={'space-around'}>
            <Box>
              <FormLabel>NFT Name</FormLabel>
              <Input placeholder="NFT Name" onChange={handleInput} />
            </Box>
            <Box>
              <FormLabel>NFT Description</FormLabel>
              <Textarea placeholder="NFT Description" onChange={handleDescription} />
            </Box>
            <Box>
              <FormLabel>Select NFT Image</FormLabel>
              <Input placeholder="NFT" type={'file'} onChange={handleFile} />
            </Box>
            <Button mt={4} colorScheme="teal" isLoading={false}>
              Mint
            </Button>
          </Flex>
        </SimpleGrid>
      </FormControl>
    </>
  );
};

export default NFTMinter;
