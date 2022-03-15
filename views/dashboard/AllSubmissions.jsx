import { useState } from 'react';
import { utils } from 'ethers';
import { Flex, SimpleGrid, Heading, Text, Tooltip } from '@chakra-ui/react';
import styled from '@emotion/styled';

import { getAcceptedBids, getQueuedBids } from '../../graphql/getBids';
import useSubmit from '../../hooks/useSubmit';
import { updateBidToAirtable } from '../../utils/requests';

import { theme } from '../../themes/theme';
import { StyledPrimaryButton } from '../../themes/styled';

const StyledSecondaryHeading = styled(Heading)`
  font-family: ${theme.fonts.uncial};
  letter-spacing: 1.2px;
  color: ${theme.colors.red};
  color: ${theme.colors.red};
  margin-bottom: 1rem;
`;

const StyledBodyText = styled(Text)`
  font-family: ${theme.fonts.texturina};
  line-height: 1.8;
  color: white;
  margin-bottom: 2rem;
`;

const StyledMessageText = styled(Text)`
  font-family: ${theme.fonts.jetbrains};
  color: white;
  line-height: 1.4;
  background-color: ${theme.colors.blackDark};
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;
  margin-right: 0.5rem;
`;

export const AllSubmissions = ({ clientInfo, getClientInfo }) => {
  const [loading, setLoading] = useState({});
  const [fetched, setFetched] = useState({});

  const [acceptedBids, setAcceptedBids] = useState([]);
  const [queuedBids, setQueuedBids] = useState([]);

  const { submissionTextUpdates, bookConsultation } = useSubmit();

  const fetchBidInfo = async (submissionHash, airtableRecordId) => {
    try {
      setLoading({ ...loading, [submissionHash]: true });
      const _acceptedBids = await getAcceptedBids(submissionHash);

      if (_acceptedBids.length > 0) {
        await updateBidToAirtable(
          airtableRecordId,
          _acceptedBids[_acceptedBids.length - 1]['acceptTxHash'],
          _acceptedBids[_acceptedBids.length - 1]['amount']
        );
        setAcceptedBids({
          ...acceptedBids,
          [submissionHash]: _acceptedBids[_acceptedBids.length - 1]
        });
      } else {
        const _queuedBids = await getQueuedBids(submissionHash);
        setQueuedBids({
          ...queuedBids,
          [submissionHash]: _queuedBids[_queuedBids.length - 1]
        });
      }

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
          <StyledSecondaryHeading fontSize={{ base: '16px' }}>
            {item['fields']['Project Name']}
          </StyledSecondaryHeading>

          <StyledBodyText fontSize={{ base: '12px', lg: '16px' }}>
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
                acceptedBids[item['fields']['Submission Hash']]) && (
                <StyledMessageText
                  fontSize={{ base: '12px' }}
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
                        acceptedBids[item['fields']['Submission Hash']][
                          'amount'
                        ]
                      )}{' '}
                  $RAID
                </StyledMessageText>
              )}
            </Flex>

            {/* 
              if no consultation hash in airtable && (
                if accepted bid hash in airtable ? secure consultation : (
                  if bid status not fetched from subgraph && check bid status
                )
              )    
            */}

            {!item['fields']['Consultation Hash'] &&
              (item['fields']['Bid Hash'] ? (
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
              ) : (
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
                )
              ))}

            {/* 
              if bid status fetched from subgraph && (
                if there are accepted bids ? secure consultation : (
                  if there are queued bids ? bids in queue : no bids yet
                )
              )    
            */}

            {fetched[item['fields']['Submission Hash']] &&
              (acceptedBids[item['fields']['Submission Hash']] ? (
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
              ) : queuedBids[item['fields']['Submission Hash']] ? (
                <Tooltip
                  fontFamily={theme.fonts.mono}
                  label='Click to go to bidding page'
                  placement='left'
                >
                  <StyledMessageText
                    fontSize={{ base: '16px' }}
                    textAlign='left'
                    mb='.2rem'
                    textDecoration='underline'
                    onClick={() =>
                      window.open(
                        `https://bids.raidguild.org/bids/${item['fields']['Submission Hash']}`,
                        '_blank'
                      )
                    }
                  >
                    Bids in queue
                  </StyledMessageText>
                </Tooltip>
              ) : (
                <Tooltip
                  fontFamily={theme.fonts.mono}
                  label='Click to go to bidding page'
                  placement='left'
                >
                  <StyledMessageText
                    fontSize={{ base: '16px' }}
                    textAlign='left'
                    mb='.2rem'
                    textDecoration='underline'
                    onClick={() =>
                      window.open(
                        `https://bids.raidguild.org/bids/${item['fields']['Submission Hash']}`,
                        '_blank'
                      )
                    }
                  >
                    No bids yet
                  </StyledMessageText>
                </Tooltip>
              ))}
          </Flex>
        </Flex>
      ))}
    </SimpleGrid>
  );
};
