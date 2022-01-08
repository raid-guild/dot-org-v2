import React, { useState, useContext } from 'react';
import { Flex, FormControl, FormLabel, Stack } from '@chakra-ui/react';

import { AppContext } from '../../context/AppContext';

import RadioBox from '../../shared/RadioBox';
import AlertModal from '../../shared/AlertModal';

import {
  StyledTextArea,
  StyledPrimaryButton,
  StyledSecondaryButton
} from '../../themes/styled';

import useWallet from '../../hooks/useWallet';
import useSubmit from '../../hooks/useSubmit';
import useWarnings from '../../hooks/useWarnings';

export const StepFour = ({ windowWidth }) => {
  const context = useContext(AppContext);

  const { connectWallet } = useWallet();
  const { submissionTextUpdates, submissionPendingStatus, submitApplication } =
    useSubmit('hire');
  const { triggerToast } = useWarnings();

  const [priorities, setPriorities] = useState(
    context.h_priorities || 'Fast & Polished'
  );

  const [buttonClick, setButtonClickStatus] = useState(false);

  const submitHandler = async () => {
    if (context.h_specificNeed === '') {
      setButtonClickStatus(true);
      triggerToast('Please fill in all the fields');
      return;
    }
    if (context.h_specificNeed !== '') {
      setButtonClickStatus(false);
      context.setHireStepFourData(priorities);
      if (context.signerAddress) {
        submitApplication();
      } else {
        await connectWallet();
      }
    }
  };

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
              onClick={() => context.updateFaqModalStatus(true, 'hire')}
            >
              Read FAQ
            </StyledSecondaryButton>
          </Flex>
        )}

        <StyledPrimaryButton
          isLoading={submissionPendingStatus}
          loadingText={submissionTextUpdates}
          onClick={submitHandler}
        >
          {context.signerAddress ? 'PAY 500 $RAID' : 'CONNECT WALLET'}
        </StyledPrimaryButton>
      </Flex>

      <AlertModal
        alertTitle='INSUFFICIENT $RAID'
        alertMessage='You need at least 1 $RAID to submit the application & get into the
            consultation queue. You can buy more $RAID from honeyswap on xDai.'
        alertAction='https://app.honeyswap.org/#/swap?inputCurrency=0x18e9262e68cc6c6004db93105cc7c001bb103e49&outputCurrency=0x6a023ccd1ff6f2045c3309768ead9e68f978f6e1&chainId=100'
      />
    </Flex>
  );
};
