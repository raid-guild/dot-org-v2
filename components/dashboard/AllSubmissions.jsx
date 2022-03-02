import { useState } from 'react';
import { utils } from 'ethers';
import { Flex, SimpleGrid } from '@chakra-ui/react';

import { theme } from '../../themes/theme';

import { getBids } from '../../graphql/getBids';

import useSubmit from '../../hooks/useSubmit';
import { CONSULTATION_REQUEST_FEE } from '../../config';

import {
  StyledPrimaryButton,
  StyledSecondaryHeading,
  StyledMessageText,
  StyledBodyText
} from '../../themes/styled';

export const AllSubmissions = ({ clientInfo, web3, getClientInfo }) => {
  const [loading, setLoading] = useState({});
  const [fetched, setFetched] = useState({});
  const [bids, setBids] = useState({});

  const { submissionTextUpdates, submissionPendingStatus, bookConsultation } =
    useSubmit();

  const fetchBidInfo = async (submissionHash) => {
    try {
      setLoading({ ...loading, [submissionHash]: true });
      // const hex = web3.utils.asciiToHex(submissionHash);
      const data = await getBids(submissionHash);
      console.log(data);
      setBids({ ...bids, [submissionHash]: data[data.length - 1] });
      setLoading({ ...loading, [submissionHash]: false });
      setFetched({ ...fetched, [submissionHash]: true });
    } catch (err) {
      console.log(err);
    }
  };

  const submitHandler = async (submissionHash, airtableRecordId) => {
    setLoading({ ...loading, [submissionHash]: true });
    await bookConsultation(submissionHash, airtableRecordId);
    await getClientInfo();
    setLoading({ ...loading, [submissionHash]: false });
  };

  return (
    <SimpleGrid columns={1} w='100%'>
      {clientInfo.map((item, index) => (
        <Flex
          minH='200px'
          key={item}
          direction='column'
          py='2rem'
          px='1.5rem'
          bg={(index + 1) % 2 === 0 ? 'blackLight' : 'blackLighter'}
        >
          <StyledSecondaryHeading
            fontSize={{ base: '16px' }}
            color={theme.colors.red}
            mb='1rem'
          >
            {item['fields']['Project Name']}
          </StyledSecondaryHeading>

          <StyledBodyText
            fontSize={{ base: '12px', lg: '16px' }}
            maxWidth='100%'
            mb='2rem'
          >
            {item['fields']['Project Description']}
          </StyledBodyText>

          {/* if none of the bids are accepted */}
          {fetched[item['fields']['Submission Hash']] &&
            !bids[item['fields']['Submission Hash']] && (
              <StyledMessageText
                fontSize={{ base: '16px' }}
                textAlign='left'
                color={theme.colors.white}
                mb='.2rem'
              >
                No bids / Bid not accepted{' '}
                <i className='fas fa-external-link-square-alt'></i>
              </StyledMessageText>
            )}

          <Flex
            direction={{ base: 'column', lg: 'row' }}
            justifyContent='space-between'
            alignItems='center'
          >
            <Flex direction='row'>
              <StyledMessageText
                fontSize={{ base: '12px' }}
                color={theme.colors.white}
                bg={theme.colors.blackDark}
                p='5px 10px'
                cursor='pointer'
                borderRadius='5px'
                mr='.5rem'
                _hover={{
                  bg: theme.colors.red
                }}
                onClick={() =>
                  (window.location.href = `https://blockscout.com/xdai/mainnet/tx/${item['fields']['Submission Hash']}`)
                }
              >
                Application receipt
              </StyledMessageText>
              {item['fields']['Consultation Hash'] && (
                <StyledMessageText
                  fontSize={{ base: '12px' }}
                  color={theme.colors.white}
                  bg={theme.colors.blackDark}
                  p='5px 10px'
                  cursor='pointer'
                  borderRadius='5px'
                  _hover={{
                    bg: theme.colors.red
                  }}
                  onClick={() =>
                    (window.location.href = `https://blockscout.com/xdai/mainnet/tx/${item['fields']['Submission Hash']}`)
                  }
                >
                  Consultation receipt
                </StyledMessageText>
              )}
            </Flex>
            {/* check status of bids initially */}
            {!item['fields']['Consultation Hash'] &&
              !fetched[item['fields']['Submission Hash']] && (
                <StyledPrimaryButton
                  ml={{ lg: 'auto' }}
                  mt='1rem'
                  isLoading={loading[item['fields']['Submission Hash']]}
                  onClick={() =>
                    fetchBidInfo(item['fields']['Submission Hash'])
                  }
                >
                  Check bid status
                </StyledPrimaryButton>
              )}
            {bids[item['fields']['Submission Hash']] && (
              <>
                <StyledMessageText
                  fontSize={{ base: '12px' }}
                  color={theme.colors.white}
                  bg={theme.colors.blackDark}
                  p='5px 10px'
                  cursor='pointer'
                  borderRadius='5px'
                  _hover={{
                    bg: theme.colors.red
                  }}
                >
                  {utils.formatEther(
                    bids[item['fields']['Submission Hash']]['amount']
                  )}{' '}
                  $RAID <i className='fas fa-external-link-square-alt'></i>
                </StyledMessageText>
                <br />

                <StyledPrimaryButton
                  ml='auto'
                  isLoading={loading[item['fields']['Submission Hash']]}
                  loadingText={submissionTextUpdates}
                  onClick={() => {
                    submitHandler(
                      item['fields']['Submission Hash'],
                      item['fields']['ID']
                    );
                  }}
                >
                  Secure Consultation
                </StyledPrimaryButton>
              </>
            )}
          </Flex>
        </Flex>
      ))}
    </SimpleGrid>
  );
};
