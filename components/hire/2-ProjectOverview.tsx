import { useState } from 'react';
import { FormControl, FormLabel, GridItem, SimpleGrid, Input, Textarea } from '@raidguild/design-system';
import { UseFormReturn } from 'react-hook-form';

import RadioBox from '../atoms/RadioBox';

type Props = {
  localForm: UseFormReturn;
};

const StepTwo = ({ localForm }: Props) => {
  const [projectType, setProjectType] = useState('New');
  const [specsType, setSpecsType] = useState('Yes');
  const [buttonClick, setButtonClickStatus] = useState(false);

  return (
    <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={{ base: 0, lg: 5 }} w='100%'>
      <RadioBox
        name='projectType'
        label='New or Existing Project'
        options={['New', 'Existing']}
        stack='horizontal'
        localForm={localForm}
      />
      <RadioBox
        name='specsType'
        label='Have the project specs ready?'
        options={['Yes', 'Partial', 'None']}
        stack='horizontal'
        localForm={localForm}
      />
      <Input label='Project Name?' name='projectName' localForm={localForm} />
      <Input label='Link to Specs' name='projectLink' localForm={localForm} />
      <GridItem gridColumn='span 2'>
        <Textarea label='Project Description' name='projectDesc' localForm={localForm} />
      </GridItem>
    </SimpleGrid>
  );
};

export default StepTwo;
