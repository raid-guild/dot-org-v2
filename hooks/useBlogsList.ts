import { useQuery } from '@tanstack/react-query';
import { getBlogsList } from '../gql';

interface Props {
  initialData?: any;
  token?: string; // TODO remove with permissions fix
}

const useBlogsList = ({ initialData, token }: Props) => {
  const { status, error, data, isLoading } = useQuery<any, Error>(['blogsList'], () => getBlogsList(token), {
    // enabled: !!token,
    initialData,
  });

  return {
    status,
    error,
    data,
    isLoading,
  };
};

export default useBlogsList;
