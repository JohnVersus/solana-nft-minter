import { useEffect } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import apiPost from 'utils/apiPost';
import { theme, useToast } from '@chakra-ui/react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';
import base58 from 'bs58';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { useColorModeValue } from '@chakra-ui/react';

const ConnectButton = () => {
  const { data: session } = useSession();
  const { publicKey, signMessage, disconnect, disconnecting, connected } = useWallet();
  const toast = useToast();
  const router = useRouter();

  const StyledWalletMultiButton = styled(WalletMultiButton)`
    color: ${useColorModeValue(theme.colors.blue[900], theme.colors.white)};
    background-color: ${useColorModeValue(theme.colors.gray[100], theme.colors.blackAlpha[200])};
    :hover {
      color: ${useColorModeValue(theme.colors.blue[900], theme.colors.white)};
    }
    :not([disabled]):hover {
      background-color: ${useColorModeValue(theme.colors.gray[300], theme.colors.blue[900])};
    }
  `;

  const handleAuth = async () => {
    const address = publicKey?.toBase58();
    const chain = 'devnet';
    const network = 'solana';
    const account = {
      address,
      chain,
      network,
    };
    const { message } = await apiPost('/auth/request-message', account);
    const encodedMessage = new TextEncoder().encode(message);
    // @ts-ignore: Undefined invoke error
    const signedMessage = await signMessage(encodedMessage).catch((e) => {
      disconnect();
      throw toast({
        title: 'Signature Failed',
        description: `Error: ${e.message}`,
        status: 'error',
        position: 'bottom-right',
        isClosable: true,
      });
    });
    const signature = base58.encode(signedMessage);

    const data = await signIn('credentials', {
      message,
      signature,
      redirect: false,
    });
    if (data?.ok) {
      toast({
        title: 'Authorization Successful',
        description: 'Session Activated',
        status: 'success',
        position: 'bottom-right',
        isClosable: true,
      });
      router.replace(router.asPath);
    } else {
      toast({
        title: 'Authentication Failed',
        description: `Error: ${data?.error}`,
        status: 'error',
        position: 'bottom-right',
        isClosable: true,
      });
      disconnect();
    }
  };

  useEffect(() => {
    if (connected && publicKey && session !== undefined && session?.user.address !== publicKey?.toBase58()) {
      console.log({ connected, publicKey, session });
      handleAuth();
    }
  }, [connected, publicKey]);

  useEffect(() => {
    if (disconnecting) {
      signOut({ redirect: false });
    }
  }, [disconnecting]);

  useEffect(() => {
    if (session === null) {
      router.replace(router.asPath);
    }
  }, [session]);

  return <StyledWalletMultiButton />;
};

export default ConnectButton;
