import { Flex, Stack, Checkbox } from '@raidguild/design-system';
import { UseFormReturn } from 'react-hook-form';

import RadioBox from '../atoms/RadioBox';

import { skills } from '../../utils/constants';

interface Props {
  localForm: UseFormReturn;
}

// TODO add CheckboxGroup component to design-system

const StepThree = ({ localForm }: Props) => (
  <Flex w='100%' direction='column' px={{ base: '2rem', lg: '5rem' }} py='2rem'>
    <Stack direction={{ base: 'column', lg: 'row' }} mb={10} spacing={10}>
      <Checkbox options={skills} localForm={localForm} />

      <RadioBox
        name='technicalSkillType'
        label='Do you bethink yourself as technical, or non-technical?'
        localForm={localForm}
        options={['Technical', 'Non - Technical', 'Other']}
        stack='horizontal'
      />
    </Stack>
  </Flex>
);

export default StepThree;
