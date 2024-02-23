import { Box, Center, Link, SimpleGrid, Text, Tooltip } from '@raidguild/design-system';
import Image from 'next/image';

import lexdao from '../../public/logos/LexDAO-Logo.png';
import tec from '../../public/logos/TokenEngCommons.png';
import daohaus from '../../public/logos/daohaus.webp';
import metacartel from '../../public/logos/metacartel.webp';
import metagame from '../../public/logos/metagame.png';
import moloch from '../../public/logos/moloch.webp';
import PageTitle from '../page-components/PageTitle';

const SectionSix = () => {
  return (
    <Center
      id='Our Supporters'
      bg='black'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      gap={10}
      padding={{ base: '2rem', lg: '10rem' }}
      minH={{ base: 'max', md: '80vh' }}>
      <PageTitle title='Our Ecosystem' />
      <Text maxW='560px' textAlign='center' textColor='white' sx={{ whiteSpace: 'balance' }}>
        {`Raid Guild is a collective of developers with a multitude of talents building the future of the web. It wouldn't
        be possibly without the help of other DAOs such as..`}
      </Text>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3 }}
        alignItems='center'
        justifyItems='center'
        gap={{ base: 16, md: 20 }}
        w='80%'>
        <Box w={{ base: '120px', lg: '200px' }}>
          <Tooltip label='MetaCartel'>
            <Link href='https://www.metacartel.org/'>
              <Image src={metacartel} alt='metacartel' placeholder='blur' />
            </Link>
          </Tooltip>
        </Box>
        <Box w={{ base: '120px', lg: '200px' }}>
          <Tooltip label='Daohaus'>
            <Link href='https://daohaus.club/'>
              <Image src={daohaus} alt='daohaus' placeholder='blur' />
            </Link>
          </Tooltip>
        </Box>
        <Box w={{ base: '120px', lg: '200px' }}>
          <Tooltip label='MolochDAO'>
            <Link href='https://molochdao.com/'>
              <Image src={moloch} alt='molochdao' placeholder='blur' />
            </Link>
          </Tooltip>
        </Box>

        <Box w={{ base: '120px', lg: '160px' }}>
          <Tooltip label='Metagame'>
            <Link href='https://metagame.wtf/'>
              <Image src={metagame} alt='metagame' placeholder='blur' />
            </Link>
          </Tooltip>
        </Box>

        <Box w={{ base: '120px', lg: '200px' }}>
          <Tooltip label='Token Engineering Commons'>
            <Link href='https://tecommons.org/'>
              <Image src={tec} alt='tokenengineering' placeholder='blur' />
            </Link>
          </Tooltip>
        </Box>
        <Box w={{ base: '120px', lg: '160px' }}>
          <Tooltip label='Lex DAO'>
            <Link href='https://lexdao.org/'>
              <Image src={lexdao} alt='lexdao' placeholder='blur' />
            </Link>
          </Tooltip>
        </Box>
      </SimpleGrid>
    </Center>
  );
};

export default SectionSix;
