import { Flex } from '@chakra-ui/react';

import { StyledPrimaryButton, StyledSecondaryButton } from '../themes/styled';

import useWarnings from '../hooks/useWarnings';

const StageButtonGroup = ({
  formType,
  updateStage,
  updateFaqModalStatus,
  setButtonClickStatus,
  stageRule,
  setData,
  dataValues,
  loadingText,
  isLoading = false,
  buttonText = 'Next'
}) => {
  const { triggerToast } = useWarnings();
  return (
    <Flex
      direction={{ base: 'column-reverse', lg: 'row' }}
      justifyContent='space-between'
    >
      <Flex direction={{ base: 'column', md: 'row' }}>
        <StyledSecondaryButton
          w='100%'
          mr='1rem'
          mt={{ base: '.5rem' }}
          onClick={() => updateStage('previous')}
        >
          Back
        </StyledSecondaryButton>
        <StyledSecondaryButton
          w='100%'
          mt={{ base: '.5rem' }}
          onClick={() => updateFaqModalStatus(true, formType)}
        >
          Read FAQ
        </StyledSecondaryButton>
      </Flex>

      <StyledPrimaryButton
        isLoading={isLoading}
        loadingText={loadingText}
        onClick={async () => {
          if (stageRule) {
            setButtonClickStatus(false);
            let [param1, param2, param3] = dataValues ? dataValues : [];
            dataValues && setData(param1, param2, param3);
            buttonText === 'Next' && updateStage('next');
          } else {
            setButtonClickStatus(true);
            triggerToast('Please fill in all the required fields.');
          }
        }}
      >
        {buttonText}
      </StyledPrimaryButton>
    </Flex>
  );
};

export default StageButtonGroup;
