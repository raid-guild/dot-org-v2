import { Button, HStack } from '@raidguild/design-system';
import GradientShiftButton from '../atoms/GradientShiftButton';

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
      <GradientShiftButton onClick={handleNext} width='150px' fontWeight={500}>
        Next
      </GradientShiftButton>
    </HStack>
  );
};

export default FormNavigation;
