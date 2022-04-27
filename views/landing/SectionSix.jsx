import { Flex, Box } from '@chakra-ui/react';
import Image from 'next/image';

import { StyledPrimaryHeading } from '../../themes/styled';

import metacartel from '../../public/assets/logos/metacartel.webp';
import daohaus from '../../public/assets/logos/daohaus.webp';
import moloch from '../../public/assets/logos/moloch.webp';

export const SectionSix = () => {
  return (
    <Flex
      direction='column'
      alignItems='center'
      justifyContent='center'
      padding={{ base: '2rem', lg: '2rem 4rem' }}
      bg='#201F1D'
    >
      <StyledPrimaryHeading
        mb='2rem'
        mt='2rem'
        fontSize={{ base: '1.5rem', lg: '36px' }}
      >
        Supported by
      </StyledPrimaryHeading>
      <Flex
        w='100%'
        justifyContent='space-evenly'
        alignItems='center'
        direction={{ base: 'column', md: 'row', lg: 'row' }}
      >
        <Box w={{ base: '120px', lg: '200px' }}>
          <Image src={metacartel} alt='metacartel' placeholder='blur' />
        </Box>
        <Box w={{ base: '120px', lg: '200px' }}>
          <Image src={daohaus} alt='daohaus' placeholder='blur' />
        </Box>
        <Box w={{ base: '120px', lg: '200px' }}>
          <Image src={moloch} alt='molochdao' placeholder='blur' />
        </Box>
      </Flex>
    </Flex>
  );
};
