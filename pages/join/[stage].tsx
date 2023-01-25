import { useRouter } from 'next/router';
import { useAccount, useNetwork, useSwitchNetwork } from 'wagmi';
import { Flex, CircularProgress, CircularProgressLabel, Heading, Stack, Text, Button } from '@raidguild/design-system';
import { useSession } from 'next-auth/react';
import SiteLayout from '../../components/page-components/SiteLayout';
import Intro from '../../components/join-us/0-Intro';
import Overview from '../../components/join-us/1-Overview';
import Contact from '../../components/join-us/2-Contact';
import Skills from '../../components/join-us/3-Skills';
import Interests from '../../components/join-us/4-Interests';
import Misc from '../../components/join-us/5-Misc';
import Agreements from '../../components/join-us/6-Agreements';
import Confirmation from '../../components/join-us/7-Confirmation';

const stageHeadings: { [key: number]: string } = {
  1: 'A Quick Intro',
  2: 'Your Social Presence',
  3: 'Your SkillSet',
  4: 'Tell Us More',
  5: 'Your Crypto Journey',
  6: 'Guild Readiness',
};

const Join = () => {
  const { isConnected } = useAccount();
  const { data: session } = useSession();
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();
  const router = useRouter();
  const stage = Number(router.query.stage) || 0;

  const handleNext = () => {
    router.push(`/join/${stage + 1}`);
  };
  const handleBack = () => {
    router.push(`/join/${stage - 1}`);
  };
  const handleSwitch = () => {
    switchNetwork?.(100);
  };

  if (!session || !isConnected) {
    return (
      <SiteLayout>
        <Stack mt='2rem' mx='auto' w='80%' spacing={10}>
          <Text fontFamily='spaceMono' fontSize='xl'>
            Please sign in with your wallet to continue
          </Text>
        </Stack>
      </SiteLayout>
    );
  }
  if (chain && chain.id !== 100) {
    return (
      <SiteLayout>
        <Stack mt='2rem' mx='auto' w='80%' spacing={10}>
          <Text fontFamily='spaceMono' fontSize='xl'>
            Please switch to the <Button onClick={handleSwitch}>Gnosis chain</Button> to continue
          </Text>
        </Stack>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <Stack mt='2rem' mx='auto' w='80%' spacing={10}>
        {stage > 1 && stage < 8 && (
          <Flex direction='row' alignItems='center'>
            <CircularProgress value={stage - 1} thickness='4px' max={6} color='primary.500'>
              <CircularProgressLabel color='primary.500' fontFamily='jetbrains' fontSize={{ base: '20px', lg: '26px' }}>
                {stage - 1}
              </CircularProgressLabel>
            </CircularProgress>{' '}
            <Heading ml='1rem'>{stageHeadings[stage - 1]}</Heading>
          </Flex>
        )}

        {stage === 1 && <Intro handleNext={handleNext} />}
        {stage === 2 && <Overview handleNext={handleNext} handleBack={handleBack} />}
        {stage === 3 && <Contact handleNext={handleNext} handleBack={handleBack} />}
        {stage === 4 && <Skills handleNext={handleNext} handleBack={handleBack} />}
        {stage === 5 && <Interests handleNext={handleNext} handleBack={handleBack} />}
        {stage === 6 && <Misc handleNext={handleNext} handleBack={handleBack} />}
        {stage === 7 && <Agreements handleNext={handleNext} handleBack={handleBack} />}
        {stage === 8 && <Confirmation />}
      </Stack>
    </SiteLayout>
  );
};

export default Join;
