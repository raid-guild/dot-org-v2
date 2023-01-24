import { Button, HStack } from '@raidguild/design-system';

interface Props {
  handleBack: () => void;
  handleNext: () => void;
}

const FormNavigation = ({ handleBack, handleNext }: Props) => {
  return (
    <HStack>
      <Button fontFamily='spaceMono' onClick={handleBack} variant='outline'>
        Back
      </Button>
      <Button fontFamily='spaceMono' onClick={handleNext}>
        Next
      </Button>
    </HStack>
  );
};

export default FormNavigation;
