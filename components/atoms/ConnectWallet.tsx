/* eslint-disable react/jsx-props-no-spreading */
import { ConnectButton } from '@rainbow-me/rainbowkit';
import React from 'react';

import {
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text
} from '@raidguild/design-system';
import { FiChevronDown, FiKey, FiXCircle } from 'react-icons/fi';
import { useDisconnect } from 'wagmi';
import { truncateAddress } from '../../utils';
import tokens from '../../utils/extendedTokens';

type Props = {
  label?: string;
};

export const ConnectWallet: React.FC<Props> = ({ label }: Props) => {
  // const { isConnecting } = useAccount();
  const { disconnect } = useDisconnect();
  const showNetwork = false; // maybe unhide, in some cases

  return (
    <ConnectButton.Custom>
      {({ account, chain, openAccountModal, openChainModal, openConnectModal, mounted, authenticationStatus }) => {
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready && account && chain && (!authenticationStatus || authenticationStatus === 'authenticated');

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}>
            {(() => {
              if (!connected) {
                return (
                  <Button
                    variant='outline'
                    transition='all 100ms ease-in-out'
                    leftIcon={<Icon as={FiKey} color='primary.500' w='20px' h='20px' textColor='white' />}
                    onClick={openConnectModal}
                    data-cy='connect-wallet'
                    fontFamily='mono'
                    bgGradient={tokens.orangeToPurpleGradient}
                    borderRadius={2}>
                    {label || 'Connect'}
                  </Button>
                );
              }

              if (chain.unsupported) {
                return (
                  <Button onClick={openChainModal} variant='outline' borderRadius={2}>
                    Unsupported network
                  </Button>
                );
              }

              return (
                <Flex gap={3}>
                  <Menu offset={[0, 4]} placement='bottom-end' autoSelect={false}>
                    {showNetwork && (
                      <Button variant='outline' width='fit' onClick={openChainModal}>
                        <Image alt={chain.name ?? 'Chain icon'} src={chain.iconUrl} width={25} height={25} mr={2} />
                        {chain.name}
                      </Button>
                    )}

                    <MenuButton as={Button} variant='outline' width='fit'>
                      <HStack spacing={3}>
                        <Text color='white'>
                          {account.ensName ? account.ensName : truncateAddress(account.address)}
                        </Text>
                        <Icon as={FiChevronDown} color='primary.500' />
                      </HStack>
                    </MenuButton>
                    <MenuList minWidth='none'>
                      <MenuItem onClick={() => openAccountModal()} _hover={{ backgroundColor: 'gray.600' }}>
                        <HStack>
                          <Icon as={FiKey} color='white' />
                          <Box color='white'>Wallet</Box>
                        </HStack>
                      </MenuItem>
                      <MenuItem onClick={() => disconnect()} _hover={{ backgroundColor: 'gray.600' }}>
                        <HStack spacing={2}>
                          <Icon as={FiXCircle} color='primary.500' />
                          <Box color='primary.500'>Sign Out</Box>
                        </HStack>
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Flex>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default ConnectWallet;
