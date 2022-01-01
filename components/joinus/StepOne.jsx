import React, { useState, useContext } from 'react';
import {
  Flex,
  FormControl,
  FormLabel,
  Stack,
  useToast,
  Box
} from '@chakra-ui/react';
// import { Magic } from 'magic-sdk';

import { AppContext } from '../../context/AppContext';

import {
  StyledPrimaryButton,
  StyledSecondaryButton,
  StyledInput,
  StyledTextArea
} from '../../themes/styled';

export const StepOne = () => {
  const context = useContext(AppContext);
  // const [emailVerifyStatus, setEmailVerifyStatus] = useState(false);
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
          // isLoading={emailVerifyStatus}
          // loadingText='Verifying Email'
          onClick={async () => {
            if (context.name && context.email && context.bio && context.goals) {
              setButtonClickStatus(false);
              // setEmailVerifyStatus(true);
              context.updateStage('next');
              // try {
              //   const magic = new Magic(
              //     process.env.NEXT_PUBLIC_MAGIC_PUBLIC_KEY
              //   );
              //   const did = await magic.auth.loginWithMagicLink({
              //     email: context.email
              //   });

              //   if (did) {
              //     setEmailVerifyStatus(false);
              //     context.updateStage('next');
              //   }
              // } catch (err) {
              //   setEmailVerifyStatus(false);
              //   setButtonClickStatus(true);
              //   toast({
              //     duration: 3000,
              //     position: 'top',
              //     render: () => (
              //       <Box color='white' p={3} bg='red' fontFamily='jetbrains'>
              //         Please provide a valid email address.
              //       </Box>
              //     )
              //   });
              // }
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
        </StyledPrimaryButton>
      </Flex>
    </Flex>
  );
};
