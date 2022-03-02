import { useState } from 'react';
import { utils } from 'ethers';
import { Flex, SimpleGrid } from '@chakra-ui/react';

import { theme } from '../../themes/theme';

import { getBids } from '../../graphql/getBids';

import {
  StyledPrimaryButton,
  StyledSecondaryHeading,
  StyledMessageText
} from '../../themes/styled';

export const AllSubmissions = ({ clientInfo, web3 }) => {
  const [loading, setLoading] = useState({});
  const [fetched, setFetched] = useState({});
  const [bids, setBids] = useState({});

  const fetchBidInfo = async (submissionHash) => {
    try {
      setLoading({ ...loading, [submissionHash]: true });
      const hex = web3.utils.asciiToHex(submissionHash);
      const data = await getBids(hex);
      console.log(data);
      setBids({ ...bids, [submissionHash]: data[data.length - 1] });
      setLoading({ ...loading, [submissionHash]: false });
      setFetched({ ...fetched, [submissionHash]: true });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={5} w='100%'>
      {clientInfo.map((item) => (
        <Flex
          minH='250px'
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

          <StyledMessageText
            fontSize={{ base: '12px' }}
            color={theme.colors.greyLight}
            cursor='pointer'
            textDecoration='underline'
            onClick={() =>
              (window.location.href = `https://blockscout.com/xdai/mainnet/tx/${item['fields']['Submission Hash']}`)
            }
          >
            submitted on{' '}
            {new Date(item['fields']['Submission Time']).toDateString()}
          </StyledMessageText>

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

          {/* if any of the bids are accepted */}
          {bids[item['fields']['Submission Hash']] && (
            <>
              <StyledMessageText
                fontSize={{ base: '16px' }}
                textAlign='left'
                color={theme.colors.white}
                mb='.2rem'
              >
                {utils.formatEther(
                  bids[item['fields']['Submission Hash']]['amount']
                )}{' '}
                $RAID <i className='fas fa-external-link-square-alt'></i>
              </StyledMessageText>
              <br />

              <StyledPrimaryButton
                isLoading={loading[item['fields']['Submission Hash']]}
                onClick={() => fetchBidInfo(item['fields']['Submission Hash'])}
              >
                Book Consult
              </StyledPrimaryButton>
            </>
          )}

          {/* check status of bids initially */}
          {!item['fields']['Consultation Hash'] &&
            !fetched[item['fields']['Submission Hash']] && (
              <StyledPrimaryButton
                isLoading={loading[item['fields']['Submission Hash']]}
                onClick={() => fetchBidInfo(item['fields']['Submission Hash'])}
              >
                Check Status
              </StyledPrimaryButton>
            )}

          {/* if consultation is already paid */}
          {item['fields']['Consultation Hash'] && (
            <StyledMessageText
              fontSize={{ base: '12px' }}
              color={theme.colors.greyLight}
              cursor='pointer'
              textDecoration='underline'
              onClick={() =>
                (window.location.href = `https://blockscout.com/xdai/mainnet/tx/${item['fields']['Submission Hash']}`)
              }
            >
              Paid for consultation
            </StyledMessageText>
          )}
        </Flex>
      ))}
    </SimpleGrid>
  );
};
