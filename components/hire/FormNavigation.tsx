import { Button, HStack } from '@raidguild/design-system';

interface Props {
  handleBack: () => void;
  handleNext: () => void;
}

const FormNavigation = ({ handleBack, handleNext }: Props) => {
  return (
    <HStack>
      <Button variant='gradientOutline' onClick={handleBack} width='150px' fontWeight={500} fontFamily='spaceMono'>
        Back
      </Button>
      <Button variant='bright' onClick={handleNext} width='150px' fontWeight={500} fontFamily='spaceMono'>
        Next
      </Button>
    </HStack>
  );
};

export default FormNavigation;
