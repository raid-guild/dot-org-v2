/* eslint-disable no-nested-ternary */
import { useRouter } from 'next/router';
import { Button, Flex, Stack, SimpleGrid } from '@raidguild/design-system';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAccount } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';

import SiteLayout from '../../components/page-components/SiteLayout';
import Link from '../../components/atoms/ChakraNextLink';
import Intro from '../../components/hire/0-Intro';
import Contact from '../../components/hire/1-Contact';
import ProjectOverview from '../../components/hire/2-ProjectOverview';
import Services from '../../components/hire/3-Services';
import Payment from '../../components/hire/4-Payment';
import Confirmation from '../../components/hire/5-Confirmation';
import useConsultationCreate from '../../hooks/useConsultationCreate';
import { hireSchema, SUBMISSION_REQUEST_FEE } from '../../utils';

const HireUs = () => {
  const router = useRouter();
  const stage = Number(router.query.stage) || 1;
  const localForm = useForm({ mode: 'onBlur', resolver: yupResolver(hireSchema) });
  const { address } = useAccount();
  const { openConnectModal } = useConnectModal();
  const { mutateAsync } = useConsultationCreate();

  const { handleSubmit } = localForm;

  const onSubmit = async (data: any) => {
    mutateAsync(data);
  };
  const isMember = false;

  // TODO make sure on gnosis chain

  return (
    <SiteLayout>
      <Stack as='form' onSubmit={handleSubmit(onSubmit)} w='80%' spacing={20}>
        {/* FORM PARTS */}
        {stage === 1 && <Intro />}
        {stage === 2 && <Contact localForm={localForm} />}
        {stage === 3 && <ProjectOverview localForm={localForm} />}
        {stage === 4 && <Services localForm={localForm} />}
        {stage === 5 && <Payment localForm={localForm} />}
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

          {stage > 0 && stage < 5 && (
            <SimpleGrid gridTemplateColumns={['1fr', null, null, '1fr 1fr']} mx='auto' gap={2}>
              <Link href={`/hire/${stage - 1}/`}>
                <Button variant='outline' isDisabled={stage === 1}>
                  Back
                </Button>
              </Link>
              <Link href={`/hire/${stage + 1}/`}>
                <Button>Next</Button>
              </Link>
            </SimpleGrid>
          )}

          {stage === 5 && (
            <SimpleGrid columns={2} mx='auto' gap={2}>
              <Link href={`/hire/${stage - 1}/`}>
                <Button variant='outline'>Back</Button>
              </Link>
              {!address ? (
                <Button onClick={openConnectModal}>Connect Wallet</Button>
              ) : isMember ? (
                <Button type='submit'>Submit</Button>
              ) : (
                <Button type='submit'>Pay {SUBMISSION_REQUEST_FEE} $RAID</Button>
              )}
            </SimpleGrid>
          )}
        </Flex>
      </Stack>
    </SiteLayout>
  );
};

export default HireUs;
