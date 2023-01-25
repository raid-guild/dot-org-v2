import _ from 'lodash';
import { useQuery } from '@tanstack/react-query';
import { client, BIDS_ACCEPTED_QUERY } from '../gql';

interface Props {
  details: string;
}

const useBidsAcceptedList = ({ details }: Props) => {
  console.log('useBidsAcceptedList');

  const getAcceptedBids = async (_details: string) => {
    const result = await client({}).request(BIDS_ACCEPTED_QUERY, {
      details: _details,
    });

    return _.get(result, 'bids');
  };

  const { status, error, data, isLoading } = useQuery<any, Error>(['slimMemberList'], () => getAcceptedBids(details), {
    enabled: !!details,
  });

  return {
    status,
    error,
    data,
    isLoading,
  };
};

export default useBidsAcceptedList;
