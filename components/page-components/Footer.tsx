import { Box, Button, Flex, HStack, Icon, Image, SimpleGrid, Text, VStack } from '@raidguild/design-system';
import { FaDiscord, FaGithub, FaMedium, FaNewspaper, FaTwitter } from 'react-icons/fa';
import raidGuildFooter from '../../assets/illustrations/raidguild-footer.png';
import raidGuildLogo from '../../assets/illustrations/raidguild.webp';
import Link from '../atoms/ChakraNextLink';



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
    bgPos='center bottom'
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
      alignItems={{ base: 'center', md: 'flex-start' }}
      justifyContent='space-between'
      px={{ base: '2rem', lg: '5rem' }}
      pb='8rem'>
      <Image
        src={raidGuildLogo.src}
        filter={{ base: 'brightness(0) invert(1)', md: 'none' }}
        alt='raidguild logo'
        width={{ base: '150px', lg: '168px' }}
        mt={{ base: '8rem', md: 0 }}
      />
      <SimpleGrid
        columns={{ base: 1, md: 3, lg: 3 }}
        spacing={{ base: '6rem', lg: '5rem' }}
        fontSize='1rem'
        color='greyLight'>
        <VStack alignItems={{ base: 'center', md: 'flex-start' }} gap={4}>
          <Text fontFamily='spaceMono' fontWeight={800}>
            For Clients
          </Text>
          <Link href='/hire'>Hire Us</Link>
          <Link href='/#portfolio'>Our Portfolio</Link>
        </VStack>
        <VStack alignItems={{ base: 'center', md: 'flex-start' }} gap={4}>
          <Text fontFamily='spaceMono' fontWeight={800}>
            For Raiders
          </Text>
          <Link href='/join'>Join Us</Link>
          <Link href='https://handbook.raidguild.org' isExternal>
            Our Handbook
          </Link>
        </VStack>
        <VStack alignItems={{ base: 'center', md: 'flex-start' }} gap={4}>
          <Text fontFamily='spaceMono' fontWeight={800}>
            For Everyone
          </Text>
          <HStack spacing={3}>
            {forAllLinks.slice(0, 3).map((link) => (
              <Link href={link.link} isExternal key={link.link}>
                {link.icon}
              </Link>
            ))}
          </HStack>

          {forAllLinks.slice(3, 5).map((link) => (
            <Link href={link.link} isExternal key={link.link}>
              {link.label}
            </Link>
          ))}
        </VStack>
      </SimpleGrid>
    </Flex>
  </Box>
);

export default Footer;
