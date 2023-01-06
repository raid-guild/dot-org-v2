import { useState } from 'react';
import { useForm } from 'react-hook-form';

import StepOne from '../components/hire/StepOne';
import useConsultationCreate from '../hooks/useConsultationCreate';

const HireUs = () => {
  const localForm = useForm();
  const { mutate, mutateAsync, isLoading, isError, isSuccess } = useConsultationCreate();

  const { handleSubmit } = localForm;

  const onSubmit = async (data: any) => {
    mutateAsync(data);
  };

  const [formStage, setFormStage] = useState(0);

  const incrementStage = () => {
    setFormStage(formStage + 1);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {formStage === 0 && <StepOne localForm={localForm} incrementer={incrementStage} />}
      <button type='submit'>Submit</button>
    </form>
  );
};

export default HireUs;
