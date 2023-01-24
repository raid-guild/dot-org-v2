import { useEffect } from 'react';
import { VStack, useToast, GridItem, SimpleGrid, Input, Textarea } from '@raidguild/design-system';
import { useForm, FieldValues } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import FormNavigation from './FormNavigation';
import { useHireState } from '../../context/appState';
import handleError from '../../utils/forms';
import RadioBox from '../atoms/RadioBox';

interface Props {
  handleBack: () => void;
  handleNext: () => void;
}

const validationSchema = Yup.object().shape({
  projectType: Yup.string().required(),
  specsType: Yup.string().required(),
  projectName: Yup.string().required(),
  projectLink: Yup.string(),
  projectDescription: Yup.string().required(),
});

const StepTwo = ({ handleNext, handleBack }: Props) => {
  const { hireState, setHireState } = useHireState();
  const toast = useToast();
  const localForm = useForm({ resolver: yupResolver(validationSchema) });
  const { handleSubmit, reset } = localForm;

  useEffect(() => {
    reset({ ...hireState.hire2 });
  }, []);

  const onNext = (data: FieldValues) => {
    setHireState({
      ...hireState,
      hire2: { ...data },
    });
    handleNext();
  };
  return (
    <VStack>
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={{ base: 0, lg: 5 }} w='100%' mb='2rem'>
        <RadioBox
          name='projectType'
          label='New or Existing Project*'
          options={['New', 'Existing']}
          stack='horizontal'
          localForm={localForm}
        />
        <RadioBox
          name='specsType'
          label='Have the project specs ready?*'
          options={['Yes', 'Partial', 'None']}
          stack='horizontal'
          localForm={localForm}
        />
        <Input label='Project Name?*' name='projectName' localForm={localForm} />
        <Input label='Link to Specs' name='projectLink' localForm={localForm} />
        <GridItem gridColumn='span 2'>
          <Textarea label='Project Description*' name='projectDescription' localForm={localForm} />
        </GridItem>
      </SimpleGrid>
      <FormNavigation handleBack={handleBack} handleNext={handleSubmit(onNext, handleError(toast))} />
    </VStack>
  );
};

export default StepTwo;
