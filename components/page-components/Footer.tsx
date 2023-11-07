import { Flex, Box, SimpleGrid, VStack, HStack, Heading, Text, Icon, Image } from '@raidguild/design-system';
import { FaTwitter, FaGithub, FaDiscord, FaNewspaper, FaMedium } from 'react-icons/fa';
// import Image from 'next/image';
import Link from '../atoms/ChakraNextLink';

import raidGuildLogo from '../../assets/illustrations/raidguild.webp';
import raidGuildFooter from '../../assets/illustrations/raidguild-footer.png';

const forAllLinks = [
  {
    link: 'https://twitter.com/RaidGuild',
    label: 'Twitter',
    icon: <Icon as={FaTwitter} boxSize={6} />,
  },
  {
    link: 'https://github.com/orgs/raid-guild/',
    label: 'Github',
    icon: <Icon as={FaGithub} boxSize={6} />,
  },
  {
    link: 'https://discord.gg/rGFpfQf',
    label: 'Discord',
    icon: <Icon as={FaDiscord} boxSize={6} />,
  },
  {
    link: 'https://medium.com/raid-guild/',
    label: 'Blog',
    icon: <Icon as={FaMedium} boxSize={6} />,
  },
  {
    link: 'https://raidguild.substack.com/',
    label: 'Newsletter',
    icon: <Icon as={FaNewspaper} boxSize={6} />,
  },
];

const Footer = () => (
  <Box
    backgroundImage={raidGuildFooter.src}
    backgroundSize='cover'
    padding='100px 0px 0px 0px'
    w='100%'
    textTransform='uppercase'
    fontFamily='spaceMono'>
    {/* <HireUs /> */}
    <Flex
      direction={{ base: 'column-reverse', md: 'row', lg: 'row' }}
      w='100%'
      m='0 auto'
      marginTop='100px'
      alignItems='flex-start'
      justifyContent='space-between'
      px={{ base: '2rem', lg: '5rem' }}
      py='2rem'>
      <Box width={{ base: '150px', lg: '168px' }} mr='auto' mt='2rem'>
        <Image src={raidGuildLogo.src} alt='raidguild logo' />
      </Box>
      <SimpleGrid
        columns={{ base: 1, md: 3, lg: 3 }}
        spacing={{ base: '2rem', lg: '5rem' }}
        fontSize='1rem'
        color='greyLight'>
        <VStack alignItems='flex-start'>
          <Text>For Clients</Text>
          <Link href='/hire'>Hire Us</Link>
          <Link href='/#portfolio'>Our Portfolio</Link>
        </VStack>
        <VStack alignItems='flex-start'>
          <Text>For Raiders</Text>
          <Link href='/join'>Join Us</Link>
          <Link href='https://handbook.raidguild.org' isExternal>
            Our Handbook
          </Link>
        </VStack>
        <VStack alignItems='flex-start' fontFamily='spaceMono'>
          <Text>For All</Text>
          <HStack spacing={3}>
            {forAllLinks.map((link) => (
              <Link href={link.link} isExternal key={link.link}>
                {link.icon}
              </Link>
            ))}
          </HStack>
        </VStack>
      </SimpleGrid>
    </Flex>
  </Box>
);

export default Footer;
