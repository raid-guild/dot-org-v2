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
  Text,
  defaultTheme,
} from '@raidguild/design-system';
import { FiChevronDown, FiKey, FiXCircle } from 'react-icons/fi';
import { MdReportGmailerrorred } from 'react-icons/md';
import { useDisconnect } from 'wagmi';
import { truncateAddress } from '../../utils';
import GradientConnectButton from './GradientConnectButton';

type Props = {
  label?: string;
};

export const ConnectWallet: React.FC<Props> = ({ label }: Props) => {
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
                return <GradientConnectButton onClick={openConnectModal}>{label}</GradientConnectButton>;
              }

              if (chain.unsupported) {
                return (
                  <Button onClick={openChainModal} variant='outline' bg='red.500' borderRadius={2}>
                    <Icon as={MdReportGmailerrorred} color='primary.500' w='18px' h='18px' textColor='white' />
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

                    <MenuButton as={Button} variant='outline' width='fit' borderRadius={2}>
                      <HStack spacing={3}>
                        <Text color='white' fontFamily='mono'>
                          {account.ensName ? account.ensName : truncateAddress(account.address)}
                        </Text>
                        <Icon as={FiChevronDown} color='primary.500' />
                      </HStack>
                    </MenuButton>
                    <MenuList minWidth='none'>
                      <MenuItem onClick={() => openAccountModal()} borderRadius={0} p={0}>
                        <HStack
                          spacing={2}
                          h='full'
                          w='full'
                          p={2}
                          color='primary.500'
                          fontFamily='mono'
                          _hover={{ color: 'white', backgroundColor: 'primary.500' }}>
                          <Icon as={FiKey} />
                          <Box>Wallet</Box>
                        </HStack>
                      </MenuItem>
                      <MenuItem onClick={() => disconnect()} borderRadius={0} p={0}>
                        <HStack
                          spacing={2}
                          h='full'
                          w='full'
                          p={2}
                          color='primary.500'
                          fontFamily='mono'
                          _hover={{ backgroundColor: defaultTheme.colors.primary[500], color: 'white' }}>
                          <Icon as={FiXCircle} />
                          <Box>Sign Out</Box>
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
