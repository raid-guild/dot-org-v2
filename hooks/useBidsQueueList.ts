import _ from 'lodash';
import { useQuery } from '@tanstack/react-query';
import { client, BIDS_QUEUED_QUERY } from '../gql';

interface Props {
  details: string;
}

const useBidsQueueList = ({ details }: Props) => {
  const getBidsQueue = async (_details: string) => {
    const result = await client({}).request(BIDS_QUEUED_QUERY, {
      details: _details,
    });

    return _.get(result, 'bids');
  };

  const { status, error, data, isLoading } = useQuery<any, Error>(['slimMemberList'], () => getBidsQueue(details), {
    enabled: !!details,
  });

  return {
    status,
    error,
    data,
    isLoading,
  };
};

export default useBidsQueueList;
