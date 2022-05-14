import { Flex, SimpleGrid, Box } from '@chakra-ui/react';
import Link from 'next/link';
import Image from 'next/image';
import styled from '@emotion/styled'

import { Header } from '../../shared/Header';

import {
  StyledPrimaryButton,
  StyledSecondaryButton,
  StyledPrimaryHeading
} from '../../themes/styled';

// import raidBanner from '../../public/assets/illustrations/raid__banner.webp'

const StyledAnimationReferenceElement = styled('div')`
  width: 550px;
  position: relative;
  > div {
    width: 100%;
    padding-bottom: 114%;
  }
  #raid-banner-placeholder {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  @media only screen and (max-width: 600px) {
    width: 80%;
    margin: 0 auto;
  }

  .lds-ellipsis {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
    opacity: 0.3;
  }
  .lds-ellipsis div {
    position: absolute;
    top: 33px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #ff3864;
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
  }
  .lds-ellipsis div:nth-child(1) {
    left: 8px;
    animation: lds-ellipsis1 0.6s infinite;
  }
  .lds-ellipsis div:nth-child(2) {
    left: 8px;
    animation: lds-ellipsis2 0.6s infinite;
  }
  .lds-ellipsis div:nth-child(3) {
    left: 32px;
    animation: lds-ellipsis2 0.6s infinite;
  }
  .lds-ellipsis div:nth-child(4) {
    left: 56px;
    animation: lds-ellipsis3 0.6s infinite;
  }
  @keyframes lds-ellipsis1 {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
  @keyframes lds-ellipsis3 {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  }
  @keyframes lds-ellipsis2 {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(24px, 0);
    }
  }
`

export const SectionOne = ({ windowWidth }) => {
  return (
    <SimpleGrid
      rows="1"
      placeItems="center"
      border="2px solid"
      borderColor="red"
      py="2rem"
      px={{ base: '1rem', lg: '4rem' }}
      mx="1rem"
      minHeight="calc(100vh - 2em)"
    >
      <Header windowWidth={windowWidth} />
      <Flex direction={{ base: 'column-reverse', lg: 'row' }} alignItems="center" justifyContent="space-between" alignSelf="flex-start">
        <Flex direction="column" justifyContent="center" alignItems="start" maxW={{ lg: '50%' }}>
          <StyledPrimaryHeading maxW="720px" fontSize={{ lg: '36px' }}>
            A Decentralized Collective of Mercenaries Ready to Slay Your Web3 Product Demons.
          </StyledPrimaryHeading>
          <Flex w="100%" mt={{ base: '2rem' }} direction="row" justifyContent={{ base: 'center', lg: 'flex-start' }}>
            <Link href="/hire" passHref>
              <StyledPrimaryButton minW={{ base: 'auto' }} fontSize={{ base: '16px', lg: '18px' }} mr="1rem">
                Hire Us
              </StyledPrimaryButton>
            </Link>
            <Link href="/join" passHref>
              <StyledSecondaryButton minW={{ base: 'auto' }} fontSize={{ base: '16px', lg: '18px' }}>
                Join Us
              </StyledSecondaryButton>
            </Link>
          </Flex>
        </Flex>
        <Box width={{ md: '500px', lg: '550px' }}>
          <StyledAnimationReferenceElement id="raid-banner">
            <figure id="raid-banner-placeholder">
              <div className="lds-ellipsis">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>{' '}
            </figure>
            <div></div>
          </StyledAnimationReferenceElement>
        </Box>
      </Flex>
    </SimpleGrid>
  )
};
