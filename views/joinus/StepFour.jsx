import React, { useState, useContext } from 'react';
import { Flex, FormControl, FormLabel, Stack } from '@chakra-ui/react';

import { AppContext } from '../../context/AppContext';

import StageButtonGroup from '../../shared/StageButtonGroup';

import { StyledTextArea } from '../../themes/styled';

export const StepFour = () => {
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
        direction={{ base: 'column', lg: 'row' }}
        spacing={{ base: 0, lg: 5 }}
        mb={{ base: 10, lg: 0 }}
      >
        <FormControl
          isRequired
          isInvalid={context.j_passion === '' && buttonClick ? true : false}
          fontFamily='spaceMono'
          color='white'
          mb={10}
        >
          <FormLabel>
            Now prithee, Apprentice; tell us of your passions & desires!
          </FormLabel>
          <StyledTextArea
            placeholder='What are you into?'
            onChange={context.inputChangeHandler}
            name='j_passion'
            value={context.j_passion}
          />
        </FormControl>

        <FormControl
          isRequired
          isInvalid={
            context.j_favoriteMedia === '' && buttonClick ? true : false
          }
          fontFamily='spaceMono'
          color='white'
        >
          <FormLabel>
            How doth entertain yourself? A curious book, swift blog or
            intelligent podcast?
          </FormLabel>
          <StyledTextArea
            placeholder='Favorite media'
            onChange={context.inputChangeHandler}
            name='j_favoriteMedia'
            value={context.j_favoriteMedia}
          />
        </FormControl>
      </Stack>

      <Stack
        direction={{ base: 'column', lg: 'row' }}
        mb={{ base: 10, lg: 0 }}
        spacing={{ base: 0, lg: 5 }}
      >
        <FormControl
          isRequired
          isInvalid={context.j_thrills === '' && buttonClick ? true : false}
          fontFamily='spaceMono'
          color='white'
          mb={10}
        >
          <FormLabel>
            Of the unnumber'd idle pebbles, what of Crypto thrills you most?{' '}
          </FormLabel>
          <StyledTextArea
            placeholder='Tell us which subset of Crypto excites you most'
            onChange={context.inputChangeHandler}
            name='j_thrills'
            value={context.j_thrills}
          />
        </FormControl>
        <FormControl
          isRequired
          isInvalid={context.j_interest === '' && buttonClick ? true : false}
          fontFamily='spaceMono'
          color='white'
        >
          <FormLabel>
            State your interest, Apprentice, in joining the Guild.
          </FormLabel>
          <StyledTextArea
            placeholder="Let us be well inform'd of your intentions"
            onChange={context.inputChangeHandler}
            name='j_interest'
            value={context.j_interest}
          />
        </FormControl>
      </Stack>

      <StageButtonGroup
        formType={'join'}
        updateStage={context.updateStage}
        updateFaqModalStatus={context.updateFaqModalStatus}
        setButtonClickStatus={setButtonClickStatus}
        stageRule={
          context.j_passion !== '' &&
          context.j_favoriteMedia !== '' &&
          context.j_thrills !== '' &&
          context.j_interest !== ''
        }
      />
    </Flex>
  );
};
