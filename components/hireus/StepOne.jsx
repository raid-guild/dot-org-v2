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
// import { Magic } from 'magic-sdk';
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
              onClick={() => context.updateFaqModalStatus(true, 'hire')}
            >
              Read FAQ
            </Button>
          </Flex>
        )}

        <Button
          variant='primary'
          // isLoading={emailVerifyStatus}
          // loadingText='Verifying Email'
          onClick={async () => {
            if (
              context.h_name &&
              context.h_email &&
              context.h_bio &&
              context.h_discordHandle
            ) {
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
        </Button>
      </Flex>
    </Flex>
  );
};
