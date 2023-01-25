import { useQuery } from '@tanstack/react-query';
import { getPortfolioList } from '../gql';

interface Props {
  initialData?: any;
  token?: string; // TODO remove with permissions fix
}

const usePortfolioList = ({ initialData, token }: Props) => {
  const { status, error, data, isLoading } = useQuery<any, Error>(['portfolioList'], () => getPortfolioList(token), {
    enabled: !!token,
    initialData,
  });

  return {
    status,
    error,
    data,
    isLoading,
  };
};

export default usePortfolioList;
