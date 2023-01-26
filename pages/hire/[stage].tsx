/* eslint-disable no-nested-ternary */
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { Stack } from '@raidguild/design-system';
import SiteLayout from '../../components/page-components/SiteLayout';
import Intro from '../../components/hire/0-Intro';
import Contact from '../../components/hire/1-Contact';
import ProjectOverview from '../../components/hire/2-ProjectOverview';
import Services from '../../components/hire/3-Services';
import Payment from '../../components/hire/4-Payment';
import Confirmation from '../../components/hire/5-Confirmation';

const HireUs = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const stage = Number(router.query.stage) || 1;

  useEffect(() => {
    if (stage !== 1 && !session) {
      router.push('/hire/1');
    }
  });

  const handleNext = () => {
    router.push(`/hire/${stage + 1}`);
  };
  const handleBack = () => {
    router.push(`/hire/${stage - 1}`);
  };

  return (
    <SiteLayout>
      <Stack w='80%' spacing={10}>
        {/* FORM PARTS */}
        {stage === 1 && <Intro isConnected={Boolean(session)} handleNext={handleNext} />}
        {stage === 2 && <Contact handleNext={handleNext} handleBack={handleBack} />}
        {stage === 3 && <ProjectOverview handleNext={handleNext} handleBack={handleBack} />}
        {stage === 4 && <Services handleNext={handleNext} handleBack={handleBack} />}
        {stage === 5 && <Payment handleNext={handleNext} handleBack={handleBack} />}
        {stage === 6 && <Confirmation />}
      </Stack>
    </SiteLayout>
  );
};

export default HireUs;
