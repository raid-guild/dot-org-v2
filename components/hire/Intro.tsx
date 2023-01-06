import { Flex, Link as ChakraLink, Button, Heading, Text } from '@raidguild/design-system';
import Link from 'next/link';

const Intro = () => (
  <Flex direction='column' py='2rem' px={{ base: '1rem', lg: '4rem' }} mx='1rem'>
    <Heading fontSize={{ base: '1.5rem', lg: '36px' }} mb='1rem'>
      Hiring RaidGuild
    </Heading>

    <Text fontSize={{ base: '1rem', lg: '18px' }}>
      To request a consultation, please fill out the form starting on the next screen after connecting your wallet. The
      more information you can provide about the work you want to hire RaidGuild for, the better. The form will have
      space for information about you / your team, background, and description for your project, specs for the work, as
      well as a few questions to give us an initial feel for your needs.
    </Text>
    <br />

    <Text fontSize={{ base: '1rem', lg: '18px' }}>
      You will be prompted to pay a{' '}
      <ChakraLink
        href='https://app.honeyswap.org/#/swap?inputCurrency=0x18e9262e68cc6c6004db93105cc7c001bb103e49&outputCurrency=0x6a023ccd1ff6f2045c3309768ead9e68f978f6e1&chainId=100'
        isExternal
        textDecoration='underline'
        color='red'>
        500 $RAID
      </ChakraLink>{' '}
      application submission fee at the end of the form as a spam filter. Once paid, you will be taken to a client
      dashboard where you can track the status of all your applications. If you prefer to push your application to the
      top of all other requests we received, you can start making bids in{' '}
      <ChakraLink href='https://bids.raidguild.org/' isExternal textDecoration='underline' color={theme.colors.red}>
        the consultation queue
      </ChakraLink>{' '}
      to climb up the queue. Once a bid is accepted, you need to pay a one time fee of{' '}
      <ChakraLink
        href='https://app.honeyswap.org/#/swap?inputCurrency=0x18e9262e68cc6c6004db93105cc7c001bb103e49&outputCurrency=0x6a023ccd1ff6f2045c3309768ead9e68f978f6e1&chainId=100'
        isExternal
        textDecoration='underline'
        color={theme.colors.red}>
        15000 $RAID
      </ChakraLink>{' '}
      to secure your spot for a consultation from your dashboard.
    </Text>
    <br />

    <Text>
      For more info about the consultation process, join our{' '}
      <ChakraLink href='https://handbook.raidguild.org/' isExternal textDecoration='underline' color={theme.colors.red}>
        discord.
      </ChakraLink>
      .
    </Text>
    <br />

    <Flex direction='column' bgColor='white' borderRadius='0.5rem' p='0.5rem 1rem' maxW='720px'>
      <Text fontWeight='bold' mb='.5rem'>
        IMPORTANT
      </Text>
      <Text>
        If you made a bid prior to March 15th, 2022, please use the old version of the Consultation Queue:{' '}
        <ChakraLink href='https://hireus.raidguild.org' isExternal textDecoration='underline'>
          hireus.raidguild.org
        </ChakraLink>
      </Text>
    </Flex>
    <br />

    {/* {context.signerAddress && ( */}
    <Flex w='100%' direction={{ base: 'column', md: 'row', lg: 'row' }} gap={2}>
      <Button
        w='100%'
        fontSize={{ base: '16px', lg: '18px' }}
        // onClick={() => {
        //   if (context.chainId !== 100 && context.chainId !== 1) {
        //     triggerToast('Please switch to the Gnosis or Mainnet Networks.');
        //     return;
        //   }
        //   context.updateStage('next');
        // }}
      >
        New Consultation
      </Button>

      <Link href='/dashboard' passHref>
        <Button w='100%'>View My Submissions</Button>
      </Link>
    </Flex>
    {/* )} */}
  </Flex>
);

export default Intro;
