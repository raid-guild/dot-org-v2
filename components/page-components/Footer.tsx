import {
  Center,
  Flex,
  HStack,
  Heading,
  Icon,
  Image,
  SimpleGrid,
  Stack,
  Text,
  VStack,
  useBreakpointValue,
} from '@raidguild/design-system';
import { FaDiscord, FaGithub, FaMedium, FaNewspaper, FaTwitter } from 'react-icons/fa';
import CTABtnGroup from '../atoms/CTABtnGroup';
import raidGuildFooter from '../../assets/illustrations/raidguild-footer.png';
import raidGuildLogo from '../../assets/illustrations/raidguild.webp';
import tokens from '../../utils/extendedTokens';
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

const Footer = () => {
  const hideOnBase = useBreakpointValue({ base: true, md: false });

  return (
    <Center
      backgroundImage={raidGuildFooter.src}
      backgroundSize='cover'
      bgPos='center bottom'
      padding='100px 0px 0px 0px'
      w='100%'
      textTransform='uppercase'
      fontFamily='spaceMono'
      flexDirection='column'>
      <Center
        bg={{ base: 'transparent', lg: tokens.purpleToIndigoGradient }}
        mt={{ base: '2rem' }}
        width={{ base: '100%', lg: '80%' }}
        height={200}
        m={{ base: 8, md: 24 }}
        justifyContent='center'
        alignItems='center'
        flexDir='column'>
        <Heading hidden={hideOnBase} fontSize={24} variant='shadow' color='white'>
          Hire Raidguild
        </Heading>
        <Stack flexDirection={{ base: 'column', lg: 'row' }} gap={6}>
          <CTABtnGroup />
        </Stack>
      </Center>
      <Flex
        direction={{ base: 'column-reverse', md: 'row', lg: 'row' }}
        w='100%'
        m='0 auto'
        marginTop='100px'
        alignItems={{ base: 'center', md: 'flex-start' }}
        justifyContent='space-between'
        px={{ base: '2rem', lg: '5rem' }}
        pb='8rem'
        color='white'>
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
            <Link href='/hire' _hover={{ textColor: 'primary.500', opacity: '80%' }} id='Hire'>
              Hire Us
            </Link>
            <Link href='/#portfolio' _hover={{ textColor: 'primary.500', opacity: '80%' }}>
              Our Portfolio
            </Link>
          </VStack>
          <VStack alignItems={{ base: 'center', md: 'flex-start' }} gap={4}>
            <Text fontFamily='spaceMono' fontWeight={800}>
              For Raiders
            </Text>
            <Link href='/join' _hover={{ textColor: 'primary.500', opacity: '80%' }} id='Join'>
              Join Us
            </Link>
            <Link
              href='https://handbook.raidguild.org'
              _hover={{ textColor: 'primary.500', opacity: '80%' }}
              isExternal>
              Our Handbook
            </Link>
          </VStack>
          <VStack alignItems={{ base: 'center', md: 'flex-start' }} gap={4}>
            <Text fontFamily='spaceMono' fontWeight={800}>
              For Everyone
            </Text>
            <HStack spacing={3}>
              {forAllLinks.slice(0, 3).map((link) => (
                <Link href={link.link} id={link.label} isExternal key={link.link} _hover={{ opacity: '80%' }}>
                  {link.icon}
                </Link>
              ))}
            </HStack>

            {forAllLinks.slice(3, 5).map((link) => (
              <Link
                href={link.link}
                id={link.label}
                isExternal
                key={link.link}
                _hover={{ textColor: 'primary.500', opacity: '80%' }}>
                {link.label}
              </Link>
            ))}
          </VStack>
        </SimpleGrid>
      </Flex>
    </Center>
  );
};
export default Footer;
