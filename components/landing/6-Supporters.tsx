import { Flex, Box, Text, Center, Link } from '@raidguild/design-system';
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
      <Text maxW='560px' textAlign='center' textColor='white' sx={{ whiteSpace: 'balance' }}>
        {`Raid Guild is a collective of developers with a multitude of talents building the future of the web. It wouldn't
        be possibly without the help of other DAOs such as..`}
      </Text>
      <Flex
        w='100%'
        justifyContent='space-evenly'
        alignItems='center'
        mt={24}
        direction={{ base: 'column', md: 'row', lg: 'row' }}>
        <Box w={{ base: '120px', lg: '200px' }}>
          <Link href='https://www.metacartel.org/'>
            <Image src={metacartel} alt='metacartel' placeholder='blur' />
          </Link>
        </Box>
        <Box w={{ base: '120px', lg: '200px' }}>
          <Link href='https://daohaus.club/'>
            <Image src={daohaus} alt='daohaus' placeholder='blur' />
          </Link>
        </Box>
        <Box w={{ base: '120px', lg: '200px' }}>
          <Link href='https://molochdao.com/'>
            <Image src={moloch} alt='molochdao' placeholder='blur' />
          </Link>
        </Box>
      </Flex>
    </Center>
  );
};

export default SectionSix;
