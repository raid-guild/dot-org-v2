import { useState } from 'react';
import { utils } from 'ethers';
import { Flex, SimpleGrid } from '@chakra-ui/react';

import { theme } from '../../themes/theme';

import { getBids } from '../../graphql/getBids';

import useSubmit from '../../hooks/useSubmit';

import { updateBidToAirtable } from '../../utils/requests';

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

  const { submissionTextUpdates, bookConsultation } = useSubmit();

  const fetchBidInfo = async (submissionHash, airtableRecordId) => {
    try {
      setLoading({ ...loading, [submissionHash]: true });
      // const hex = web3.utils.asciiToHex(submissionHash);
      const data = await getBids(submissionHash);
      console.log(data);
      if (data.length > 0) {
        await updateBidToAirtable(
          airtableRecordId,
          data[data.length - 1]['acceptTxHash'],
          data[data.length - 1]['amount']
        );
      }

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
                  window.open(
                    `https://blockscout.com/xdai/mainnet/tx/${item['fields']['Submission Hash']}`,
                    '_blank'
                  )
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
                  mr='.5rem'
                  _hover={{
                    bg: theme.colors.red
                  }}
                  onClick={() =>
                    window.open(
                      `https://blockscout.com/xdai/mainnet/tx/${item['fields']['Consultation Hash']}`,
                      '_blank'
                    )
                  }
                >
                  Consultation receipt
                </StyledMessageText>
              )}
              {(item['fields']['Bid Hash'] ||
                bids[item['fields']['Submission Hash']]) && (
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
                    window.open(
                      `https://blockscout.com/xdai/mainnet/tx/${item['fields']['Bid Hash']}`,
                      '_blank'
                    )
                  }
                >
                  {item['fields']['Bid Hash']
                    ? utils.formatEther(item['fields']['Bid Amount'])
                    : utils.formatEther(
                        bids[item['fields']['Submission Hash']]['amount']
                      )}{' '}
                  $RAID <i className='fas fa-external-link-square-alt'></i>
                </StyledMessageText>
              )}
            </Flex>

            {/* check status of bids initially */}
            {!item['fields']['Bid Hash'] &&
              !fetched[item['fields']['Submission Hash']] && (
                <StyledPrimaryButton
                  ml={{ lg: 'auto' }}
                  mt='1rem'
                  isLoading={loading[item['fields']['Submission Hash']]}
                  onClick={() =>
                    fetchBidInfo(
                      item['fields']['Submission Hash'],
                      item['fields']['ID']
                    )
                  }
                >
                  Check bid status
                </StyledPrimaryButton>
              )}

            {/* if none of the bids are accepted */}
            {fetched[item['fields']['Submission Hash']] &&
              !bids[item['fields']['Submission Hash']] && (
                <StyledMessageText
                  fontSize={{ base: '16px' }}
                  textAlign='left'
                  color={theme.colors.white}
                  mb='.2rem'
                  cursor='pointer'
                  onClick={() =>
                    window.open(`https://bids.raidguild.org/`, '_blank')
                  }
                >
                  No bids / Bid not accepted{' '}
                  <i className='fas fa-external-link-square-alt'></i>
                </StyledMessageText>
              )}

            {!item['fields']['Consultation Hash'] &&
              item['fields']['Bid Hash'] && (
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
              )}

            {!item['fields']['Consultation Hash'] &&
              bids[item['fields']['Submission Hash']] && (
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
              )}
          </Flex>
        </Flex>
      ))}
    </SimpleGrid>
  );
};
