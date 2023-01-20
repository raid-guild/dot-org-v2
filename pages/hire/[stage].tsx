/* eslint-disable no-nested-ternary */
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useAccount } from 'wagmi';
import { Button, Flex, SimpleGrid, Stack, Text } from '@raidguild/design-system';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import SiteLayout from '../../components/page-components/SiteLayout';
import Link from '../../components/atoms/ChakraNextLink';
import Intro from '../../components/hire/0-Intro';
import Contact from '../../components/hire/1-Contact';
import ProjectOverview from '../../components/hire/2-ProjectOverview';
import Services from '../../components/hire/3-Services';
import Payment from '../../components/hire/4-Payment';
import Confirmation from '../../components/hire/5-Confirmation';
import useCreateConsult from '../../hooks/useCreateConsult';
import { hireSchema } from '../../utils';

const HireUs = () => {
  const router = useRouter();
  const { isConnected } = useAccount();
  const { data: session } = useSession();
  const stage = Number(router.query.stage) || 1;
  const localForm = useForm({ mode: 'onBlur', resolver: yupResolver(hireSchema) });
  const { address } = useAccount();
  const { openConnectModal } = useConnectModal();
  const { mutateAsync } = useCreateConsult();

  const { handleSubmit } = localForm;

  const onSubmit = async (data: any) => {
    mutateAsync(data);
  };

  const handleNext = () => {
    router.push(`/hire/${stage + 1}`);
  };

  const handleBack = () => {
    router.push(`/hire/${stage - 1}`);
  };

  if (!session || !isConnected) {
    return (
      <SiteLayout>
        <Stack mt='2rem' mx='auto' w='80%' spacing={10}>
          <Text>Please sign in with your wallet to continue</Text>
        </Stack>
      </SiteLayout>
    );
  }
  // TODO make sure on gnosis chain

  return (
    <SiteLayout>
      <Stack w='80%' spacing={20}>
        {/* FORM PARTS */}
        {stage === 1 && <Intro handleNext={handleNext} />}
        {stage === 2 && <Contact handleNext={handleNext} handleBack={handleBack} />}
        {stage === 3 && <ProjectOverview handleNext={handleNext} handleBack={handleBack} />}
        {stage === 4 && <Services handleNext={handleNext} handleBack={handleBack} />}
        {stage === 5 && <Payment handleNext={handleNext} handleBack={handleBack} />}
        {stage === 6 && <Confirmation />}

        <Flex justify='center'>
          {/* NAVIGATION BUTTONS */}
          {stage === 0 && address && (
            <SimpleGrid gridTemplateColumns={['1fr', null, null, '1fr']} mx='auto' gap={2}>
              <Link href={`/hire/${stage + 1}/`}>
                <Button>New Consultation</Button>
              </Link>

              <Link href='/dashboard'>
                <Button variant='outline'>View My Submissions</Button>
              </Link>
            </SimpleGrid>
          )}
        </Flex>
      </Stack>
    </SiteLayout>
  );
};

export default HireUs;
