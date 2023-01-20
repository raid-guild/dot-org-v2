import { Flex, Box, SimpleGrid, VStack, HStack, Heading, Text, Icon, Image } from '@raidguild/design-system';
import { FaTwitter, FaGithub, FaDiscord, FaNewspaper } from 'react-icons/fa';
// import Image from 'next/image';
import Link from '../atoms/ChakraNextLink';

import raidGuildLogo from '../../assets/illustrations/raidguild.webp';
import raidGuildFooter from '../../assets/illustrations/raidguild-footer.png';

const forAllLinks = [
  {
    link: 'https://twitter.com/RaidGuild',
    label: 'Twitter',
    icon: <Icon as={FaTwitter} />,
  },
  {
    link: 'https://github.com/orgs/raid-guild/',
    label: 'Github',
    icon: <Icon as={FaGithub} />,
  },
  {
    link: 'https://discord.gg/rGFpfQf',
    label: 'Discord',
    icon: <Icon as={FaDiscord} />,
  },
  {
    link: 'https://raidguild.substack.com/',
    label: 'Newsletter',
    icon: <Icon as={FaNewspaper} />,
  },
];

const Footer = () => (
  <Box backgroundImage={raidGuildFooter.src} backgroundSize='cover' padding='100px 0px 0px 0px' w='100%'>
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
        fontFamily='spaceMono'
        fontSize='1rem'
        color='greyLight'>
        <VStack alignItems='flex-start'>
          <Heading>For Clients</Heading>
          <Link href='/hire'>Hire Us</Link>
          <Link href='/#portfolio'>Our Portfolio</Link>
          <Link href='/#portfolio'>Ask Questions</Link>
        </VStack>
        <VStack alignItems='flex-start'>
          <Heading>For Raiders</Heading>
          <Link href='/join'>Join Us</Link>
          <Link href='https://handbook.raidguild.org' isExternal>
            Our Handbook
          </Link>
          {/* {context?.signerAddress == null && <Link onClick={() => connectWallet()}>Log In</Link>}
            {context?.signerAddress !== null && <Link onClick={() => router.push('/admin')}>Admin Panel</Link>} */}
        </VStack>
        <VStack alignItems='flex-start'>
          <Heading>For All</Heading>
          {forAllLinks.map((link) => (
            <Link href={link.link} isExternal key={link.link}>
              <HStack spacing={3}>
                {link.icon}
                <Text>{link.label}</Text>
              </HStack>
            </Link>
          ))}
        </VStack>
      </SimpleGrid>
    </Flex>
  </Box>
);

export default Footer;
