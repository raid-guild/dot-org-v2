import { Flex, Box, Text, Center } from '@raidguild/design-system';
import Image from 'next/image';

import PageTitle from '../page-components/PageTitle';
import metacartel from '../../assets/logos/metacartel.webp';
import daohaus from '../../assets/logos/daohaus.webp';
import moloch from '../../assets/logos/moloch.webp';
import tokens from '../../utils/extendedTokens';

const SectionSix = () => {
  return (
    <Center
      id='Our Supporters'
      bg={tokens.darkBrownRedGradient}
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      padding={{ base: '2rem', lg: '10rem 4rem' }}
      minH={{ base: 'max', md: '80vh' }}>
      <PageTitle title='Our Ecosystem' />
      <Text maxW='560px' textAlign='center' textColor='white'>
        Raid Guild is a collective of developers with a multitude of talents building the future of the web. It wouldn’t
        be possibly without the help of other DAOs such as..
      </Text>
      <Flex
        w='100%'
        justifyContent='space-evenly'
        alignItems='center'
        mt={24}
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
    </Center>
  );
};

export default SectionSix;
