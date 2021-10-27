import React, { useState, useContext } from 'react';
import {
  Flex,
  FormControl,
  FormLabel,
  Textarea,
  Stack,
  useToast,
  Heading,
  Button
} from '@chakra-ui/react';
import styled from '@emotion/styled';

import { AppContext } from '../../context/AppContext';
import { theme } from '../../themes/theme';

const StyledTextArea = styled(Textarea)`
  background: ${theme.colors.blackLight};
  border: none;
  border-radius: 0;
`;

export const StepFour = () => {
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
        Step 4 of 6: Tell Us More
      </Heading>
      <Stack direction='row' spacing={5}>
        <FormControl
          mb={10}
          isRequired
          isInvalid={context.passion === '' && buttonClick ? true : false}
          fontFamily='spaceMono'
          color='white'
        >
          <FormLabel>
            Now prithee, Apprentice; tell us of your passions!
          </FormLabel>
          <StyledTextArea
            placeholder='What are you into?'
            onChange={context.inputChangeHandler}
            name='passion'
            value={context.passion}
          />
        </FormControl>

        <FormControl
          mb={10}
          isRequired
          isInvalid={context.favoriteMedia === '' && buttonClick ? true : false}
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
            name='favoriteMedia'
            value={context.favoriteMedia}
          />
        </FormControl>
      </Stack>

      <Stack direction='row' spacing={5}>
        <FormControl
          mb={10}
          isRequired
          isInvalid={context.thrills === '' && buttonClick ? true : false}
          fontFamily='spaceMono'
          color='white'
        >
          <FormLabel>
            Of the unnumber'd idle pebbles, what of Crypto thrills you most?{' '}
          </FormLabel>
          <StyledTextArea
            placeholder='Tell us which subset of Crypto excites you most'
            onChange={context.inputChangeHandler}
            name='thrills'
            value={context.thrills}
          />
        </FormControl>
        <FormControl
          mb={10}
          isRequired
          isInvalid={context.interest === '' && buttonClick ? true : false}
          fontFamily='spaceMono'
          color='white'
        >
          <FormLabel>
            State your interest, Apprentice, in joining the Guild.
          </FormLabel>
          <StyledTextArea
            placeholder="Let us be well inform'd of your intentions"
            onChange={context.inputChangeHandler}
            name='interest'
            value={context.interest}
          />
        </FormControl>
      </Stack>

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
            if (
              context.passion !== '' &&
              context.favoriteMedia !== '' &&
              context.thrills !== '' &&
              context.interest !== ''
            ) {
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
