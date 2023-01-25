import { Box, Flex, Button, Heading, Text } from '@raidguild/design-system';
import Link from '../components/atoms/ChakraNextLink';
import Meta from '../components/page-components/Meta';
import Nav from '../components/page-components/Nav';
import Footer from '../components/page-components/Footer';
// import { AllSubmissions } from '../views/dashboard/AllSubmissions';

// import { fetchClientInfoFromAirtable } from '../utils/requests';
// import { CONSULTATION_REQUEST_FEE } from '../config';

const Dashboard = () => {
  // TODO lookup consultations by client address

  return (
    <Flex width='100vw' minHeight='100vh' direction='column' justifyContent='space-between' alignItems='center'>
      <Meta />
      <Box px={{ base: '2rem', lg: '5rem' }} w='100%'>
        <Nav />
      </Box>

      <Flex direction='column' px={{ base: '2rem', lg: '5rem' }} w='100%' my='4rem'>
        {/* {!context.signerAddress && !isFetching && ( */}
        <Heading my='auto' size='md'>
          Connect wallet to view your hire applications.
        </Heading>
        {/* )} */}

        {/* {isFetching ? (
          <Loader />
        ) : context.signerAddress && !clientInfo.length ? (
          <StyledHeadingLabels>No hire applications found for this address.</StyledHeadingLabels>
        ) : null} */}

        {/* {clientInfo.length > 0 && !isFetching && ( */}
        <Flex direction='column'>
          <Heading size='md' mb='1rem'>
            Your hire applications
          </Heading>
          <Text maxWidth='100%' mb='2rem'>
            {`Find below all the applications that you have submitted to the guild for hire. Once your bid is accepted, you can secure your consultation with the guild by paying a one time ${0} $RAID.`}
          </Text>
          <Link href='https://bids.raidguild.org/' isExternal>
            <Button variant='outline' mr='auto' mb='2rem'>
              Go to bidding page
            </Button>
          </Link>
          {/* <AllSubmissions clientInfo={clientInfo} web3={context.web3} getClientInfo={getClientInfo} /> */}
        </Flex>
        {/* )} */}
      </Flex>

      <Footer />
    </Flex>
  );
};

export default Dashboard;
