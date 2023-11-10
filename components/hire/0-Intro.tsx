import { Flex, Heading, Text, HStack, Button, Stack } from '@raidguild/design-system';
import { ConnectWallet } from '../atoms/ConnectWallet';
import Link from '../atoms/ChakraNextLink';

type Props = {
  handleNext: () => void;
  isConnected: boolean;
};
const Intro = ({ handleNext, isConnected }: Props) => (
  <Stack spacing={10} maxW={{ base: '100%', md: '60%' }}>
    <Heading mb='1rem'>Hiring RaidGuild</Heading>

    <Text fontFamily='spaceMono'>
      To request a consultation, please fill out the form starting on the next screen after connecting your wallet. The
      more information you can provide about the work you want to hire RaidGuild for, the better. The form will have
      space for information about you / your team, background, and description for your project, specs for the work, as
      well as a few questions to give us an initial feel for your needs.
    </Text>
    <br />
    {/* disabled $500 RAID spam filter payment for now */}

    {/* <Text fontSize={{ base: '1rem', lg: '18px' }}>
      You will be prompted to pay a{' '}
      <Link
        href='https://app.honeyswap.org/#/swap?inputCurrency=0x18e9262e68cc6c6004db93105cc7c001bb103e49&outputCurrency=0x6a023ccd1ff6f2045c3309768ead9e68f978f6e1&chainId=100'
        isExternal
        // textDecoration='underline'
        color='red.500'>
        500 $RAID
      </Link>{' '}
      application submission fee at the end of the form as a spam filter. Once paid, you will be taken to a client
      dashboard where you can track the status of all your applications. If you prefer to push your application to the
      top of all other requests we received, you can start making bids in{' '}
      <Link href='https://bids.raidguild.org/' isExternal color='red.500' textDecoration='underline'>
        the consultation queue
      </Link>{' '}
      to climb up the queue. Once a bid is accepted, you need to pay a one time fee of{' '}
      <Link
        href='https://app.honeyswap.org/#/swap?inputCurrency=0x18e9262e68cc6c6004db93105cc7c001bb103e49&outputCurrency=0x6a023ccd1ff6f2045c3309768ead9e68f978f6e1&chainId=100'
        isExternal
        // textDecoration='underline'
        color='red.500'>
        15000 $RAID
      </Link>{' '}
      to secure your spot for a consultation from your dashboard.
    </Text> */}
    <br />

    <Text fontFamily='spaceMono'>
      For more info about the consultation process, join our{' '}
      <Link href='https://handbook.raidguild.org/' isExternal color='red.500'>
        discord
      </Link>
      .
    </Text>
    <br />
    <HStack mt='2rem'>
      {!isConnected ? (
        <ConnectWallet label='Sign in to Continue' />
      ) : (
        <Button fontFamily='spaceMono' onClick={handleNext}>
          New Consultation
        </Button>
      )}
    </HStack>
  </Stack>
);

export default Intro;
