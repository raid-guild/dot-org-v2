import { Flex, Stack, Input, Textarea } from '@raidguild/design-system';
import { UseFormReturn } from 'react-hook-form';

// import StageButtonGroup from '../../shared/StageButtonGroup';

interface Props {
  localForm: UseFormReturn;
}

const inputs = [
  {
    label: 'Enter, Apprentice! What is your name?',
    placeholder: 'Your Name',
    name: 'j_name',
    type: 'input',
  },
  {
    label: 'What is your email address?',
    placeholder: 'Your email address',
    name: 'j_email',
    type: 'input',
  },
  {
    label: 'What is your profession? How do you busy yourself?',
    placeholder: 'A short introduction',
    name: 'j_bio',
    type: 'textarea',
  },
  {
    label: 'How do you like to learn?',
    placeholder: 'Your learning goals',
    name: 'j_goals',
    type: 'textarea',
  },
];

const StepOne = ({ localForm }: Props) => (
  <Flex w='100%' direction='column' px={{ base: '2rem', lg: '5rem' }} py='2rem'>
    <Stack mb={{ base: 10, lg: 0 }} direction={{ base: 'column', lg: 'row' }} spacing={{ base: 0, lg: 5 }}>
      {inputs.map((input) =>
        input.type === 'input' ? (
          <Input label={input.label} name={input.name} placeholder={input.placeholder} localForm={localForm} />
        ) : (
          <Textarea label={input.label} name={input.name} placeholder={input.placeholder} localForm={localForm} />
        ),
      )}
    </Stack>

    {/* <StageButtonGroup
        formType={'join'}
        updateStage={context.updateStage}
        updateFaqModalStatus={context.updateFaqModalStatus}
        setButtonClickStatus={setButtonClickStatus}
        stageRule={context.j_name && context.j_email && context.j_bio && context.j_goals}
      /> */}
  </Flex>
);

export default StepOne;
