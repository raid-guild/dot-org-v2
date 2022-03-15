import { useState, useEffect, useContext } from 'react';
import { Box, Flex } from '@chakra-ui/react';

import { AppContext } from '../context/AppContext';

import { Meta } from '../shared/Meta';
import { Header } from '../shared/Header';
import { Footer } from '../shared/Footer';
import { Loader } from '../shared/Loader';
import { AllSubmissions } from '../views/dashboard/AllSubmissions';

import {
  StyledHeadingLabels,
  StyledPrimaryHeading,
  StyledSecondaryButton,
  StyledBodyText
} from '../themes/styled';

import { fetchClientInfoFromAirtable } from '../utils/requests';
import { CONSULTATION_REQUEST_FEE } from '../config';

const Hire = () => {
  const context = useContext(AppContext);

  const [windowWidth, setWindowWidth] = useState('');
  const [clientInfo, setClientInfo] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    window.removeEventListener('resize', () => {});
    window.addEventListener('resize', (e) => {
      setWindowWidth(window.innerWidth);
    });
  }, []);

  useEffect(() => {
    if (context.signerAddress) getClientInfo();
  }, [context.signerAddress]);

  const getClientInfo = async () => {
    setIsFetching(true);
    const result = await fetchClientInfoFromAirtable(context.signerAddress);
    setClientInfo(result.data);
    setIsFetching(false);
  };

  return (
    <Flex
      width='100vw'
      minHeight='100vh'
      direction='column'
      justifyContent='space-between'
      alignItems='center'
    >
      <Meta />
      <Box px={{ base: '2rem', lg: '5rem' }} w='100%'>
        <Header
          windowWidth={windowWidth}
          navLinks={false}
          getClientInfo={getClientInfo}
        />
      </Box>

      <Flex
        direction='column'
        px={{ base: '2rem', lg: '5rem' }}
        w='100%'
        my='4rem'
      >
        {!context.signerAddress && !isFetching && (
          <StyledHeadingLabels my='auto' fontSize={{ base: '16px' }}>
            Connect wallet to view your hire applications.
          </StyledHeadingLabels>
        )}

        {isFetching ? (
          <Loader />
        ) : context.signerAddress && !clientInfo.length ? (
          <StyledHeadingLabels>
            No hire applications found for this address.
          </StyledHeadingLabels>
        ) : null}

        {clientInfo.length > 0 && !isFetching && (
          <Flex direction='column'>
            <StyledPrimaryHeading
              fontSize={{ base: '1.5rem', lg: '36px' }}
              mb='1rem'
            >
              Your hire applications
            </StyledPrimaryHeading>
            <StyledBodyText
              fontSize={{ base: '12px', lg: '16px' }}
              maxWidth='100%'
              mb='2rem'
            >
              {`Find below all the applications that you have submitted to the guild for hire. Once your bid is accepted, you can secure your consultation with the guild by paying a one time ${CONSULTATION_REQUEST_FEE} $RAID.`}
            </StyledBodyText>
            <StyledSecondaryButton
              mr='auto'
              mb='2rem'
              onClick={() =>
                window.open(`https://bids.raidguild.org/`, '_blank')
              }
            >
              Go to bidding page
            </StyledSecondaryButton>
            <AllSubmissions
              clientInfo={clientInfo}
              web3={context.web3}
              getClientInfo={getClientInfo}
            />
          </Flex>
        )}
      </Flex>

      <Footer />
    </Flex>
  );
};

export default Hire;
