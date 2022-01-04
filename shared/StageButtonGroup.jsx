import { Flex, Box, useToast } from '@chakra-ui/react';

import { StyledPrimaryButton, StyledSecondaryButton } from '../themes/styled';

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
  const toast = useToast();
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
            toast({
              duration: 3000,
              position: 'top',
              render: () => (
                <Box color='white' p={3} bg='red' fontFamily='jetbrains'>
                  Please fill in all the required fields.
                </Box>
              )
            });
          }
        }}
      >
        {buttonText}
      </StyledPrimaryButton>
    </Flex>
  );
};

export default StageButtonGroup;
