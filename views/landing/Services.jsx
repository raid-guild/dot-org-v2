import { Flex, VStack, SimpleGrid, Image } from '@chakra-ui/react';
import Link from 'next/link';

import {
  StyledPrimaryButton,
  StyledPrimaryHeading,
  StyledHeadingLabels,
  StyledBodyText,
  StyledCardText
} from '../../themes/styled';
import { services } from '../../utils/constants';

export const Services = () => {
  return (
    <SimpleGrid
      id='services'
      minHeight='95vh'
      columns={{ base: 1, md: 1, lg: 2 }}
      px={{ base: '2rem', lg: '8rem' }}
      py='2rem'
      my='4rem'
      bg='linear-gradient(157.1deg, #2B0000 0%, #39040D 29.17%, #48093A 61.98%, #1F0442 100%)'
    >
      <VStack spacing={5} justifyContent='center' lineHeight='1.8' my='5rem'>
        <StyledPrimaryHeading fontSize={{ base: '1.5rem', lg: '36px' }}>
          Our Services
        </StyledPrimaryHeading>
        <StyledBodyText fontSize={{ base: '1rem', lg: '18px' }}>
          RaidGuild is the premier design and dev agency of the Web3 ecosystem.
          We are deeply entrenched in the bleeding edge of DAOs, DeFi, dApps and
          everything else in between. Hailing from the MetaCartel network, our
          team consists of a diverse group of talent with over 9000 years of
          combined experience.
        </StyledBodyText>
        <StyledBodyText fontSize={{ base: '1rem', lg: '18px' }}>
          We know how to buidl and have the connections, talent and experience
          to turn your ideas into reality. We are lean to the core and deliver
          high quality results with quick turnarounds.
        </StyledBodyText>
        <br />
        <Link href='/hire' passHref>
          <StyledPrimaryButton fontSize={{ base: '16px', lg: '18px' }}>
            Hire Us
          </StyledPrimaryButton>
        </Link>
      </VStack>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 2 }}
        gap={5}
        my='2rem'
        ml={{ lg: '3rem' }}
      >
        {services.map((item, index) => {
          return (
            <Flex
              key={index}
              direction='column'
              alignItems='center'
              justifyContent='space-evenly'
              py='2rem'
              px='1.5rem'
              bg='black'
              borderTop='2px solid'
              borderColor='red'
            >
              <StyledHeadingLabels fontSize={{ base: '16px' }} mb={3}>
                {item.name}
              </StyledHeadingLabels>

              <Image src={item.img} alt='consultations' my='.5rem' />

              <StyledCardText fontSize={{ base: '16px' }}>
                {item.text}
              </StyledCardText>
            </Flex>
          );
        })}
      </SimpleGrid>
    </SimpleGrid>
  );
};
