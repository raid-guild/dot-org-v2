import { SimpleGrid, VStack, Box } from '@chakra-ui/react';
import Image from 'next/image';

import {
  StyledPrimaryButton,
  StyledPrimaryHeading,
  StyledBodyText
} from '../../themes/styled';

import raidFantasy from '../../public/assets/illustrations/raid__fantasy.webp';

import styled from '@emotion/styled'

const StyledAnimationReferenceElement = styled('div')`
  width: 400px;
  background: rgba(255, 255, 0, 0.3);
  margin-left: -5%;

  > div {
    width: 100%;
    padding-bottom: 146%;
    border: 1px solid aqua;
    margin-left: 5%;
  }
  @media only screen and (max-width: 600px) {
    width: 250px;
  }
`

export const SectionTwo = () => {
  return (
    <SimpleGrid
      id='manifesto'
      columns={{ base: 1, md: 1, lg: 2 }}
      px={{ base: '2rem', lg: '8rem' }}
      my='4rem'
      mb='0'
      placeItems='center'
    >
     <StyledAnimationReferenceElement id="raid-fantasy"><div></div></StyledAnimationReferenceElement>

      <VStack spacing={5} justifyContent='center' ml={{ md: '1rem' }}>
        <StyledPrimaryHeading fontSize={{ base: '1.5rem', lg: '36px' }}>
          Manifesto
        </StyledPrimaryHeading>
        <div>
          <StyledBodyText fontSize={{ base: '1rem', lg: '18px' }}>
            We believe that DAOs will power the future of work. Through the
            MetaCartel network, we assembled a fellowship of the best builders,
            designers and hustlers in the space in order to make this future a
            reality. By sharing resources, branding and collaboration tools, we
            can create positive-sum value for the Ethereum ecosystem in a way
            that has never been possible before the advent of DAOs.
          </StyledBodyText>
          <br></br>
          <StyledBodyText fontSize={{ base: '1rem', lg: '18px' }}>
            We believe in Web3 and are here to build it, use it, and propogate
            it. The profits from our work will be used to fund development of
            open source tooling and public goods. We will share the learnings
            from our experiments and open source our processes for the community
            to learn and build from.
          </StyledBodyText>
          <br></br>
          <StyledBodyText fontSize={{ base: '1rem', lg: '18px' }}>
            "If you want to go fast, go alone. If you want to go far, go
            together."
          </StyledBodyText>
        </div>
        <br />
        <StyledPrimaryButton
          fontSize={{ base: '16px', lg: '18px' }}
          onClick={() =>
            window.open('https://handbook.raidguild.org', '_blank')
          }
        >
          Handbook
        </StyledPrimaryButton>
      </VStack>
    </SimpleGrid>
  );
};
