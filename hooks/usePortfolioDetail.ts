import { useQuery } from '@tanstack/react-query';
import { getPortfolioDetail } from '../gql';

interface Props {
  slug: string;
  initialData?: any;
  token?: string; // TODO remove with permissions fix
}

const usePortfolioDetail = ({ slug, initialData, token }: Props) => {
  const { status, error, data, isLoading } = useQuery<any, Error>(
    ['portfolioDetail', slug],
    () => getPortfolioDetail(slug, token),
    {
      enabled: !!slug && !!token,
      initialData,
    },
  );

  return {
    status,
    error,
    data,
    isLoading,
  };
};

export default usePortfolioDetail;
