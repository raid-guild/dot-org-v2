import { Stack, Heading, Text, Flex, Button } from '@raidguild/design-system';

interface Props {
  handleNext: () => void;
}

const Intro = ({ handleNext }: Props) => (
  <Stack spacing={10} maxW='60%'>
    <Heading mb='1rem'>Apply to Join RaidGuild</Heading>

    <Text fontFamily='spaceMono'>
      Humans wanted for hazardous journey into the ether. Smol wages to start, but a lifetime of rewards. Bitter cold
      winters to build, glorious summers to reap. Long months of navigating the dark forest. Constant danger lurking in
      the mempool. Safe return to normalcy doubtful. Great honor and recognition in case of success.
    </Text>

    <Text fontFamily='spaceMono'>
      Your path is marked by this first command - fill this form to apply to RaidGuild firsthand. Pledges are studied by
      our counsel forth. Last, not least, we&apos;ll invite you to join a training cohort in due course.
    </Text>
    <Flex gap={4} justify='center' mt='2rem'>
      <Button fontFamily='spaceMono' onClick={handleNext}>
        Start Application
      </Button>
    </Flex>
  </Stack>
);

export default Intro;

// <Stack p='0.5rem 1rem' >
//   <Text>
//     Status: Season 3
//   </Text>
//   <Text>
//     Cohorts are being trained & building cool stuff. Applications are
//     closed for season 3 but open for next season. Selected applicants
//     will be notified via email when it's time.
//   </Text>
// </Stack>
