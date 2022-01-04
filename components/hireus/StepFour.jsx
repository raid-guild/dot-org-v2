import React, { useState, useContext } from 'react';
import { Flex, FormControl, FormLabel, Stack } from '@chakra-ui/react';

import { AppContext } from '../../context/AppContext';

import RadioBox from '../../shared/RadioBox';
import StageButtonGroup from '../../shared/StageButtonGroup';

import { StyledTextArea } from '../../themes/styled';

export const StepFour = ({ windowWidth }) => {
  const context = useContext(AppContext);

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

      <StageButtonGroup
        formType={'hire'}
        updateStage={context.updateStage}
        updateFaqModalStatus={context.updateFaqModalStatus}
        setButtonClickStatus={setButtonClickStatus}
        stageRule={context.h_specificNeed !== ''}
        setData={context.submitConsultation}
        dataValues={[priorities]}
        isLoading={context.submitting}
        loadingText={context.submitLoadingText}
        buttonText={'Pay 500 $RAID & SUBMIT'}
      />
    </Flex>
  );
};
