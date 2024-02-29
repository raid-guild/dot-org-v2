import _ from 'lodash';
import { useQuery } from '@tanstack/react-query';

import { client, REFERRER_TYPES_QUERY } from '../gql';

const useReferrerTypes = () => {
  const getReferrerTypes = async () => {
    const result = await client({}).request(REFERRER_TYPES_QUERY);

    return _.map(_.get(result, 'referrer_types'), (r: any) => ({
      value: r.referrer_type,
      label: _.startCase(_.toLower(r.referrer_type.replace('_', ' '))),
    }));
  };

  const { status, error, data, isLoading } = useQuery<any, Error>(['referrerTypes'], getReferrerTypes, {
    enabled: typeof window !== null,
  });

  return {
    status,
    error,
    data,
    isLoading,
  };
};

export default useReferrerTypes;
