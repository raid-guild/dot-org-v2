import { useQuery } from '@tanstack/react-query';
import { getBlogDetail } from '../gql';

interface Props {
  slug: string;
  initialData?: any;
  token?: string; // TODO remove with permissions fix
}

const useBlogsDetail = ({ slug, initialData, token }: Props) => {
  const { status, error, data, isLoading } = useQuery(['blogsDetail', slug], () => getBlogDetail(slug, token), {
    enabled: !!slug,
    initialData,
  });

  return {
    status,
    error,
    data,
    isLoading,
  };
};

export default useBlogsDetail;
