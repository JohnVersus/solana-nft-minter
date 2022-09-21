/* eslint-disable no-undef */
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
  useToast,
  FormHelperText,
} from '@chakra-ui/react';
import { FC, useState, ChangeEvent } from 'react';
import { toMetaplexFileFromBrowser, UploadMetadataOutput } from '@metaplex-foundation/js';

import { Metaplex, bundlrStorage, walletAdapterIdentity } from '@metaplex-foundation/js';
import { useWallet } from '@solana/wallet-adapter-react';
import { Connection, clusterApiUrl } from '@solana/web3.js';
import apiPost from 'utils/apiPost';

const NFTMinter: FC = () => {
  const BgColor = useColorModeValue('gray.100', 'gray.600');
  const [file, setFile] = useState<FileList>();
  const [imageUrl, setImageUrl] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, SetStatus] = useState('');
  const toast = useToast();

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files);
      setImageUrl(URL.createObjectURL(e.target.files[0]));
    }
  };
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  // TODO: Setup Metaplex and wallet provider
  const wallet = useWallet();
  const connection = new Connection(clusterApiUrl('devnet'));
  const metaplex = new Metaplex(connection);

  const mintNFT = async () => {
    if (!file || !name || !description || !imageUrl) {
      throw toast({
        title: 'Add the required details',
        status: 'error',
        position: 'bottom-right',
        isClosable: true,
      });
    }
    metaplex.use(walletAdapterIdentity(wallet));
    metaplex.use(
      bundlrStorage({
        address: 'https://devnet.bundlr.network',
        providerUrl: 'https://api.devnet.solana.com',
        timeout: 60000,
      }),
    );

    // TODO: Upload to Arweave
    SetStatus('Uploading Metadata');
    const convertBase64 = (inputFile: any) => {
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(inputFile);

        fileReader.onload = () => {
          resolve(fileReader.result);
        };

        fileReader.onerror = (error) => {
          reject(error);
        };
      });
    };

    const base64Data = await convertBase64(file[0]);
    const options = {
      name,
      description,
      image: base64Data,
      symbol: 'M-NFT',
    };

    const uri = await apiPost('/upload', options)
      .then((data: UploadMetadataOutput) => {
        console.log(data);
        return data.uri;
      })
      .catch((e) => {
        console.log(e);
      });

    // const { uri } = await metaplex
    //   .nfts()
    //   .uploadMetadata({
    //     name,
    //     description,
    //     image: await toMetaplexFileFromBrowser(file[0]),
    //     symbol: 'M-NFT',
    //   })
    //   .run();

    if (!uri) {
      SetStatus('');
      throw toast({
        title: 'Upload Failed',
        status: 'error',
        position: 'bottom-right',
        isClosable: true,
      });
    }

    // TODO: Processing Mint
    SetStatus('Processing Mint');
    const data = await metaplex
      .nfts()
      .create({
        uri,
        name,
        sellerFeeBasisPoints: 500,
      })
      .run()
      .catch((e) => {
        SetStatus('');
        throw toast({
          title: 'Mint Failed',
          description: `Error: ${e.message}`,
          status: 'error',
          position: 'bottom-right',
          isClosable: true,
        });
      });
    console.log({ data });

    // TODO: Mint Successful Message
    SetStatus('');
    toast({
      title: 'Mint Successful',
      status: 'success',
      position: 'bottom-right',
      isClosable: true,
    });
  };

  return (
    <>
      <Heading size="lg" marginBottom={6}>
        Solana NFT Minter
      </Heading>
      <FormControl>
        <SimpleGrid
          h={450}
          columns={2}
          row={1}
          spacing={2}
          bgColor={BgColor}
          padding={4}
          borderRadius="xl"
          marginTop={2}
        >
          <Flex alignItems={'center'} justifyContent={'center'}>
            <Image
              src={`${imageUrl}`}
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
            <Button
              mt={4}
              colorScheme="teal"
              isLoading={status ? true : false}
              onClick={() => {
                mintNFT().catch((e: Error) => {
                  return e.message;
                });
              }}
            >
              Mint
            </Button>
            <FormHelperText>{status && status}</FormHelperText>
          </Flex>
        </SimpleGrid>
      </FormControl>
    </>
  );
};

export default NFTMinter;
