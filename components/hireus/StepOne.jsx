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
          isInvalid={context.h_name === '' && buttonClick ? true : false}
          fontFamily='spaceMono'
          color='white'
          mb={10}
        >
          <FormLabel>What is your name?</FormLabel>
          <StyledInput
            placeholder='Your Name'
            onChange={context.inputChangeHandler}
            name='h_name'
            value={context.h_name}
          />
        </FormControl>

        <FormControl
          isRequired
          isInvalid={context.h_email === '' && buttonClick ? true : false}
          fontFamily='spaceMono'
          color='white'
        >
          <FormLabel>What is your email address?</FormLabel>
          <StyledInput
            type='email'
            placeholder='Your email address'
            onChange={context.inputChangeHandler}
            name='h_email'
            value={context.h_email}
          />
        </FormControl>
      </Stack>

      <FormControl
        mb={10}
        isRequired
        isInvalid={context.h_bio === '' && buttonClick ? true : false}
        fontFamily='spaceMono'
        color='white'
      >
        <FormLabel>Your Bio </FormLabel>
        <StyledTextArea
          placeholder='A short introduction'
          onChange={context.inputChangeHandler}
          name='h_bio'
          value={context.h_bio}
        />
      </FormControl>

      <Stack
        mb={{ base: 10, lg: 0 }}
        direction={{ base: 'column', lg: 'row' }}
        spacing={{ base: 0, lg: 5 }}
      >
        <FormControl
          isRequired
          isInvalid={
            context.h_discordHandle === '' && buttonClick ? true : false
          }
          fontFamily='spaceMono'
          color='white'
          mb={10}
        >
          <FormLabel>What is your Discord handle?</FormLabel>
          <StyledInput
            placeholder="Include the unique identifier after the #, no '@'"
            onChange={context.inputChangeHandler}
            name='h_discordHandle'
            value={context.h_discordHandle}
          />
        </FormControl>
        <FormControl fontFamily='spaceMono' color='white'>
          <FormLabel>What say of your Github Handle?</FormLabel>
          <StyledInput
            placeholder="no '@"
            name='h_githubHandle'
            onChange={context.inputChangeHandler}
            value={context.h_githubHandle}
          />
        </FormControl>
      </Stack>

      <Stack
        mb={{ base: 10, lg: 0 }}
        direction={{ base: 'column', lg: 'row' }}
        spacing={{ base: 0, lg: 5 }}
      >
        <FormControl fontFamily='spaceMono' color='white' mb={10}>
          <FormLabel>And of Telegram?</FormLabel>
          <StyledInput
            placeholder="no '@'"
            name='h_telegramHandle'
            onChange={context.inputChangeHandler}
            value={context.h_telegramHandle}
          />
        </FormControl>
        <FormControl fontFamily='spaceMono' color='white'>
          <FormLabel>Your well flown Twitter bird?</FormLabel>
          <StyledInput
            placeholder="no '@'"
            name='h_twitterHandle'
            onChange={context.inputChangeHandler}
            value={context.h_twitterHandle}
          />
        </FormControl>
      </Stack>

      <StageButtonGroup
        formType={'hire'}
        updateStage={context.updateStage}
        updateFaqModalStatus={context.updateFaqModalStatus}
        setButtonClickStatus={setButtonClickStatus}
        stageRule={
          context.h_name &&
          context.h_email &&
          context.h_bio &&
          context.h_discordHandle
        }
      />
    </Flex>
  );
};
