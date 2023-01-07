import { useRouter } from 'next/router';

const Index = () => {
  const router = useRouter();
  router.push('/join/1');
};

export default Index;
