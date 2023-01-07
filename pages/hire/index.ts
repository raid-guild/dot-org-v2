import { useRouter } from 'next/router';

const Index = () => {
  const router = useRouter();
  router.push('/hire/1');
};

export default Index;
