import React, { useState, useContext } from 'react';
import {
  Flex,
  FormControl,
  FormLabel,
  Stack,
  Box,
  useToast
} from '@chakra-ui/react';

import { AppContext } from '../../context/AppContext';

import RadioBox from '../../shared/RadioBox';

import {
  StyledTextArea,
  StyledPrimaryButton,
  StyledSecondaryButton
} from '../../themes/styled';

import useWallet from '../../hooks/useWallet';
import useSubmit from '../../hooks/useSubmit';

export const StepFour = ({ windowWidth }) => {
  const context = useContext(AppContext);
  const toast = useToast();

  const { connectWallet } = useWallet(false);
  const { submissionTextUpdates, submissionPendingStatus, submitApplication } =
    useSubmit('hire');

  const [priorities, setPriorities] = useState(
    context.h_priorities || 'Fast & Polished'
  );

  const [buttonClick, setButtonClickStatus] = useState(false);

  return (
    <Flex
      w='100%'
      direction='column'
      px={{ base: '2rem', lg: '5rem' }}
      py='2rem'
    >
      <Stack direction='column' spacing={{ base: 0, lg: 5 }} mb={10}>
        <FormControl
          isRequired
          isInvalid={
            context.h_specificNeed === '' && buttonClick ? true : false
          }
          fontFamily='spaceMono'
          color='white'
          mb={10}
        >
          <FormLabel>Do you need something very specific?</FormLabel>
          <StyledTextArea
            placeholder='Tell us how you think we can best help you?'
            onChange={context.inputChangeHandler}
            name='h_specificNeed'
            value={context.h_specificNeed}
          />
        </FormControl>

        <FormControl isRequired fontFamily='spaceMono' color='white'>
          <FormLabel as='legend'>What are your priorities?</FormLabel>
          <RadioBox
            stack={windowWidth < 400 ? 'vertical' : 'horizontal'}
            options={[
              'Fast & Polished',
              'Fast & Inexpensive',
              'Polished & Inexpensive'
            ]}
            updateRadio={setPriorities}
            name='h_priorities'
            defaultValue={context.h_priorities || priorities}
            value={context.h_priorities || priorities}
          />
        </FormControl>
      </Stack>

      <Flex
        direction={{ base: 'column-reverse', lg: 'row' }}
        justifyContent='space-between'
        mt='2rem'
      >
        {context.stage !== 1 && context.stage !== 8 && (
          <Flex direction={{ base: 'column', md: 'row' }}>
            <StyledSecondaryButton
              w='100%'
              mr='1rem'
              mt={{ base: '.5rem' }}
              onClick={() => context.updateStage('previous')}
            >
              Back
            </StyledSecondaryButton>
            <StyledSecondaryButton
              w='100%'
              mt={{ base: '.5rem' }}
              onClick={() => context.updateFaqModalStatus(true, 'join')}
            >
              Read FAQ
            </StyledSecondaryButton>
          </Flex>
        )}

        <StyledPrimaryButton
          isLoading={submissionPendingStatus}
          loadingText={submissionTextUpdates}
          onClick={() => {
            if (context.h_specificNeed !== '') {
              setButtonClickStatus(false);
              context.setHireStepFourData(priorities);
              connectWallet();
              if (context.chainId !== 4) {
                toast({
                  duration: 3000,
                  position: 'top',
                  render: () => (
                    <Box color='white' p={3} bg='red' fontFamily='jetbrains'>
                      Switch to Rinkeby Network
                    </Box>
                  )
                });
                return;
              }
              submitApplication();
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
          Pay 500 $RAID & SUBMIT
        </StyledPrimaryButton>
      </Flex>
    </Flex>
  );
};
