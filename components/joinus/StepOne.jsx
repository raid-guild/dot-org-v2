import React, { useState, useContext } from 'react';
import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Stack,
  useToast,
  Heading,
  Button
} from '@chakra-ui/react';
import styled from '@emotion/styled';

import { AppContext } from '../../context/AppContext';
import { theme } from '../../themes/theme';

const StyledInput = styled(Input)`
  background: ${theme.colors.blackLight};
  border: none;
  border-radius: 0;
`;

const StyledTextArea = styled(Textarea)`
  background: ${theme.colors.blackLight};
  border: none;
  border-radius: 0;
`;

export const StepOne = () => {
  const context = useContext(AppContext);
  const toast = useToast();

  const [buttonClick, setButtonClickStatus] = useState(false);

  return (
    <Flex
      w='100%'
      direction='column'
      px={{ base: '2rem', lg: '5rem' }}
      py='5rem'
    >
      <Heading
        variant='headingThree'
        fontSize={{ base: '1.5rem', lg: '26px' }}
        mb='1rem'
      >
        Step 1 of 6: A Quick Intro
      </Heading>
      <Stack mb={10} direction='row'>
        <FormControl
          isRequired
          isInvalid={context.name === '' && buttonClick ? true : false}
          fontFamily='spaceMono'
          color='white'
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

      <Flex direction='row' justifyContent='space-between'>
        {context.stage !== 1 && context.stage !== 8 && (
          <Flex>
            <Button
              mr='1rem'
              variant='secondary'
              onClick={() => context.updateStage('previous')}
            >
              Back
            </Button>
            <Button
              variant='secondary'
              onClick={() => context.updateFaqModalStatus(true)}
            >
              Read FAQ
            </Button>
          </Flex>
        )}
        <Button
          variant='primary'
          onClick={() => {
            if (context.name && context.email && context.bio && context.goals) {
              setButtonClickStatus(false);
              context.updateStage('next');
            } else {
              setButtonClickStatus(true);
              toast({
                title: 'Please fill in all the required fields.',
                status: 'warning',
                duration: 3000,
                position: 'top'
              });
            }
          }}
        >
          Next
        </Button>
      </Flex>
    </Flex>
  );
};
