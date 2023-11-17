import { HStack } from '@raidguild/design-system';
import GradientBorderButton from '../atoms/GradientBorderButton';
import GradientButton from '../atoms/GradientButton';

interface Props {
  handleBack: () => void;
  handleNext: () => void;
}

const FormNavigation = ({ handleBack, handleNext }: Props) => {
  return (
    <HStack>
      <GradientBorderButton onClick={handleBack} label='Back' />
      <GradientButton onClick={handleNext}>Next</GradientButton>
    </HStack>
  );
};

export default FormNavigation;
