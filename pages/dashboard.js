import { useState, useEffect, useContext } from 'react';
import { Box, Flex, HStack, SimpleGrid } from '@chakra-ui/react';
import Head from 'next/head';

import { AppContext } from '../context/AppContext';

import { Header } from '../shared/Header';
import { Footer } from '../shared/Footer';
import { Loader } from '../shared/Loader';

import useWallet from '../hooks/useWallet';

import {
  StyledPrimaryButton,
  StyledPrimaryHeading,
  StyledSecondaryHeading,
  StyledHeadingLabels,
  StyledMessageText
} from '../themes/styled';

import { theme } from '../themes/theme';

import { fetchClientInfoFromAirtable } from '../utils/requests';

const Hire = () => {
  const context = useContext(AppContext);
  const { connectWallet } = useWallet();

  const [windowWidth, setWindowWidth] = useState('');
  const [clientInfo, setClientInfo] = useState();

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
    const result = await fetchClientInfoFromAirtable(context.signerAddress);
    setClientInfo(result.data);
  };

  return (
    <Flex
      width='100vw'
      minHeight='100vh'
      direction='column'
      justifyContent='space-between'
      alignItems='center'
    >
      <Head>
        <link
          rel='stylesheet'
          href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css'
          integrity='sha512-1PKOgIY59xJ8Co8+NE6FZ+LOAZKjy+KY8iq0G4B3CyeY6wYHN3yt9PW0XpSriVlkMXe40PTKnXrLnZ9+fkDaog=='
          crossorigin='anonymous'
        />
        <script
          src='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/js/all.min.js'
          integrity='sha512-YSdqvJoZr83hj76AIVdOcvLWYMWzy6sJyIMic2aQz5kh2bPTd9dzY3NtdeEAzPp/PhgZqr4aJObB3ym/vsItMg=='
          crossorigin='anonymous'
        ></script>
      </Head>
      <Box px={{ base: '2rem', lg: '5rem' }} w='100%'>
        <Header windowWidth={windowWidth} />
      </Box>

      <Flex
        direction='column'
        alignItems='center'
        px={{ base: '2rem', lg: '5rem' }}
        w='100%'
        my='2rem'
      >
        {!context.signerAddress && (
          <StyledPrimaryButton onClick={connectWallet}>
            CONNECT WALLET
          </StyledPrimaryButton>
        )}

        {!clientInfo && context.signerAddress && <Loader />}

        {clientInfo && (
          <>
            <StyledPrimaryHeading mb='1rem'>
              Your Consultations
            </StyledPrimaryHeading>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 2 }} gap={5} w='100%'>
              {clientInfo.map((item) => (
                <Flex
                  key={item}
                  direction='column'
                  justifyContent='space-evenly'
                  py='2rem'
                  px='1.5rem'
                  bg='black'
                  borderTop='2px solid'
                  borderColor='red'
                >
                  <StyledSecondaryHeading
                    fontSize={{ base: '16px' }}
                    color={theme.colors.red}
                    mb='1rem'
                  >
                    {item['fields']['Project Name']}
                  </StyledSecondaryHeading>

                  <Flex direction='column' mb='.5rem'>
                    <StyledHeadingLabels
                      fontSize={{ base: '16px' }}
                      textAlign='left'
                      mb='.2rem'
                    >
                      Submission Date
                    </StyledHeadingLabels>

                    <StyledMessageText
                      fontSize={{ base: '16px' }}
                      color={theme.colors.red}
                    >
                      {new Date(
                        item['fields']['Submission Time']
                      ).toDateString()}
                    </StyledMessageText>
                  </Flex>

                  <Flex direction='column' mb='.5rem'>
                    <StyledHeadingLabels
                      fontSize={{ base: '16px' }}
                      textAlign='left'
                      mb='.2rem'
                    >
                      Submission Hash
                    </StyledHeadingLabels>
                    <StyledMessageText
                      fontSize={{ base: '16px' }}
                      color={theme.colors.red}
                      maxW='200px'
                      isTruncated
                    >
                      {item['fields']['Consultation Request Hash']}
                    </StyledMessageText>
                  </Flex>

                  <Flex direction='column' mb='.5rem'>
                    <StyledHeadingLabels
                      fontSize={{ base: '16px' }}
                      textAlign='left'
                      mb='.2rem'
                    >
                      Current Bid
                    </StyledHeadingLabels>
                    <StyledMessageText
                      fontSize={{ base: '16px' }}
                      color={theme.colors.red}
                      maxW='150px'
                      isTruncated
                    >
                      0 $RAID
                    </StyledMessageText>
                  </Flex>

                  <Flex direction='column' mb='.5rem'>
                    <StyledHeadingLabels
                      fontSize={{ base: '16px' }}
                      textAlign='left'
                      mb='.2rem'
                    >
                      Bid Status
                    </StyledHeadingLabels>
                    <StyledMessageText
                      fontSize={{ base: '16px' }}
                      color={theme.colors.yellow}
                    >
                      <i className='fas fa-clock'></i> Pending
                    </StyledMessageText>
                  </Flex>
                </Flex>
              ))}
            </SimpleGrid>
          </>
        )}
      </Flex>

      <Footer />
    </Flex>
  );
};

export default Hire;
