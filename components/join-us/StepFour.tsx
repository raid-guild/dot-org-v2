import { Flex, Stack, Textarea } from '@raidguild/design-system';
import { UseFormReturn } from 'react-hook-form';

// import StageButtonGroup from '../../shared/StageButtonGroup';

interface Props {
  localForm: UseFormReturn;
}

const inputs = [
  {
    label: 'Now prithee, Apprentice; tell us of your passions & desires!',
    placeholder: 'What are you into?',
    name: 'j_passion',
  },
  {
    label: 'How doth entertain yourself? A curious book, swift blog or intelligent podcast?',
    placeholder: 'Favorite media',
    name: 'j_favoriteMedia',
  },
  {
    label: "Of the unnumber'd idle pebbles, what of Crypto thrills you most?",
    placeholder: 'Tell us which subset of Crypto excites you most',
    name: 'j_thrills',
  },
  {
    label: 'State your interest, Apprentice, in joining the Guild.',
    placeholder: "Let us be well inform'd of your intentions",
    name: 'j_interest',
  },
];

const StepFour = ({ localForm }: Props) => (
  <Flex w='100%' direction='column' px={{ base: '2rem', lg: '5rem' }} py='2rem'>
    <Stack direction={{ base: 'column', lg: 'row' }} spacing={{ base: 0, lg: 5 }} mb={{ base: 10, lg: 0 }}>
      {inputs.map((input) => (
        <Textarea
          label={input.label}
          placeholder={input.placeholder}
          name={input.name}
          localForm={localForm}
          key={input.label}
        />
      ))}
    </Stack>

    {/* <StageButtonGroup
        formType={'join'}
        updateStage={context.updateStage}
        updateFaqModalStatus={context.updateFaqModalStatus}
        setButtonClickStatus={setButtonClickStatus}
        stageRule={
          context.j_passion !== '' &&
          context.j_favoriteMedia !== '' &&
          context.j_thrills !== '' &&
          context.j_interest !== ''
        }
      /> */}
  </Flex>
);

export default StepFour;
