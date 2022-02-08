import { useState, useEffect, useContext } from 'react';
import { Box, Flex } from '@chakra-ui/react';

import { AppContext } from '../context/AppContext';

import { Meta } from '../shared/Meta';
import { Header } from '../shared/Header';
import { Footer } from '../shared/Footer';
import { Loader } from '../shared/Loader';
import { AllSubmissions } from '../components/dashboard/AllSubmissions';

import { StyledHeadingLabels } from '../themes/styled';

import { fetchClientInfoFromAirtable } from '../utils/requests';

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
        <Header windowWidth={windowWidth} navLinks={false} />
      </Box>

      <Flex
        direction='column'
        px={{ base: '2rem', lg: '5rem' }}
        w='100%'
        my='4rem'
      >
        {!context.signerAddress && !isFetching && (
          <StyledHeadingLabels my='auto' fontSize={{ base: '16px' }}>
            Connect your wallet to see your submissions.
          </StyledHeadingLabels>
        )}

        {isFetching ? (
          <Loader />
        ) : context.signerAddress && !clientInfo.length ? (
          <StyledHeadingLabels>
            No submissions found for this address.
          </StyledHeadingLabels>
        ) : null}

        {clientInfo.length && !isFetching && (
          <AllSubmissions clientInfo={clientInfo} web3={context.web3} />
        )}
      </Flex>

      <Footer />
    </Flex>
  );
};

export default Hire;
