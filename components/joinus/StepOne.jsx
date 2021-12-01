import React, { useState, useContext } from 'react';
import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Stack,
  useToast,
  Box,
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

      <Flex
        direction={{ base: 'column-reverse', lg: 'row' }}
        justifyContent='space-between'
      >
        {context.stage !== 1 && context.stage !== 8 && (
          <Flex direction={{ base: 'column', md: 'row' }}>
            <Button
              w='100%'
              mr='1rem'
              mt={{ base: '.5rem' }}
              variant='secondary'
              onClick={() => context.updateStage('previous')}
            >
              Back
            </Button>
            <Button
              w='100%'
              mt={{ base: '.5rem' }}
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
          Next
        </Button>
      </Flex>
    </Flex>
  );
};
