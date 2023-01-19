import { Flex, Stack, Input, Checkbox } from '@raidguild/design-system';
import { UseFormReturn } from 'react-hook-form';

import RadioBox from '../atoms/RadioBox';

import { hireUsServices } from '../../utils/constants';

type Props = {
  localForm: UseFormReturn;
};

const StepThree = ({ localForm }: Props) => {
  //  TODO use date picker for expected deadline

  return (
    <Flex w='100%' direction='column' px={{ base: '2rem', lg: '5rem' }} py='2rem'>
      <Stack direction={{ base: 'column', lg: 'row' }} mb={10} spacing={10}>
        <Checkbox direction='column' options={hireUsServices} localForm={localForm} />

        <Stack direction='column' mb={10} spacing={10}>
          <RadioBox
            name='budget'
            label="What's your budget range?"
            options={['< $5k', '$5k - $20k', '$20k - $50k', '$50k +', 'Not Sure']}
            stack='vertical'
            localForm={localForm}
          />

          <Input label='Expected Deadline' name='expectedDeadline' localForm={localForm} />
        </Stack>
      </Stack>
    </Flex>
  );
};

export default StepThree;
