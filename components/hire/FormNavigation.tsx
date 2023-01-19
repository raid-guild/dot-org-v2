import { Button, HStack } from '@raidguild/design-system';

interface Props {
  handleBack: () => void;
  handleNext: () => void;
}

const FormNavigation = ({ handleBack, handleNext }: Props) => {
  return (
    <HStack mt='2rem'>
      <Button onClick={handleBack} variant='outline'>
        Back
      </Button>
      <Button onClick={handleNext}>Next</Button>
    </HStack>
  );
};

export default FormNavigation;
