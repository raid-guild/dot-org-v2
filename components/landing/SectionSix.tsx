import { Flex, Box, Heading } from '@raidguild/design-system';
import Image from 'next/image';

import metacartel from '../../assets/logos/metacartel.webp';
import daohaus from '../../assets/logos/daohaus.webp';
import moloch from '../../assets/logos/moloch.webp';

const SectionSix = () => {
  return (
    <Flex
      direction='column'
      alignItems='center'
      justifyContent='center'
      padding={{ base: '2rem', lg: '2rem 4rem' }}
      margin='8rem 0'>
      <Heading my='2rem' fontSize={{ base: '1.5rem', lg: '36px' }}>
        Supported by
      </Heading>
      <Flex
        w='100%'
        justifyContent='space-evenly'
        alignItems='center'
        direction={{ base: 'column', md: 'row', lg: 'row' }}>
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

export default SectionSix;
