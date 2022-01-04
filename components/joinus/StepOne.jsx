import React, { useState, useContext } from 'react';
import { Flex, FormControl, FormLabel, Stack } from '@chakra-ui/react';

import { AppContext } from '../../context/AppContext';

import StageButtonGroup from '../../shared/StageButtonGroup';

import { StyledInput, StyledTextArea } from '../../themes/styled';

export const StepOne = () => {
  const context = useContext(AppContext);

  const [buttonClick, setButtonClickStatus] = useState(false);

  return (
    <Flex
      w='100%'
      direction='column'
      px={{ base: '2rem', lg: '5rem' }}
      py='2rem'
    >
      <Stack
        mb={{ base: 10, lg: 0 }}
        direction={{ base: 'column', lg: 'row' }}
        spacing={{ base: 0, lg: 5 }}
      >
        <FormControl
          isRequired
          isInvalid={context.name === '' && buttonClick ? true : false}
          fontFamily='spaceMono'
          color='white'
          mb={10}
        >
          <FormLabel>Enter, Apprentice! What is your name?</FormLabel>
          <StyledInput
            placeholder='Your Name'
            onChange={context.inputChangeHandler}
            name='name'
            value={context.name}
          />
        </FormControl>

        <FormControl
          isRequired
          isInvalid={context.email === '' && buttonClick ? true : false}
          fontFamily='spaceMono'
          color='white'
        >
          <FormLabel>What is your email address?</FormLabel>
          <StyledInput
            type='email'
            placeholder='Your email address'
            onChange={context.inputChangeHandler}
            name='email'
            value={context.email}
          />
        </FormControl>
      </Stack>

      <FormControl
        mb={10}
        isRequired
        isInvalid={context.bio === '' && buttonClick ? true : false}
        fontFamily='spaceMono'
        color='white'
      >
        <FormLabel>
          What is your profession? How do you busy yourself?{' '}
        </FormLabel>
        <StyledTextArea
          placeholder='A short introduction'
          onChange={context.inputChangeHandler}
          name='bio'
          value={context.bio}
        />
      </FormControl>

      <FormControl
        mb={10}
        isRequired
        isInvalid={context.bio === '' && buttonClick ? true : false}
        fontFamily='spaceMono'
        color='white'
      >
        <FormLabel color='white'>How do you like to learn?</FormLabel>
        <StyledTextArea
          placeholder='Your learning goals'
          onChange={context.inputChangeHandler}
          name='goals'
          value={context.goals}
        />
      </FormControl>

      <StageButtonGroup
        formType={'join'}
        updateStage={context.updateStage}
        updateFaqModalStatus={context.updateFaqModalStatus}
        setButtonClickStatus={setButtonClickStatus}
        stageRule={
          context.name && context.email && context.bio && context.goals
        }
      />
    </Flex>
  );
};
