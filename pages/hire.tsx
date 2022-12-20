import { useState } from "react";
import StepOne from "../components/hire/StepOne";
import { useForm } from "react-hook-form";

import { useCreateConsult } from "../hooks/useCreateConsult";

export default function Hireus(props: any) {
  const localForm = useForm();
  const { mutate, mutateAsync, isLoading, isError, isSuccess } =
    useCreateConsult();

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
      {formStage === 0 && (
        <StepOne localForm={localForm} incrementer={() => incrementStage()} />
      )}
      <button type="submit">Submit</button>
    </form>
  );
}
