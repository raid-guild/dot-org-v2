import React, { useState, useContext } from 'react';
import {
  Flex,
  FormControl,
  FormLabel,
  Stack,
  useToast,
  Box
} from '@chakra-ui/react';

import { AppContext } from '../../context/AppContext';

import {
  StyledPrimaryButton,
  StyledSecondaryButton,
  StyledInput
} from '../../themes/styled';

export const StepTwo = () => {
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
          isInvalid={context.discordHandle === '' && buttonClick ? true : false}
          fontFamily='spaceMono'
          color='white'
          mb={10}
        >
          <FormLabel>What is your Discord handle?</FormLabel>
          <StyledInput
            placeholder="Include the unique identifier after the #, no '@'"
            onChange={context.inputChangeHandler}
            name='discordHandle'
            value={context.discordHandle}
          />
        </FormControl>
        <FormControl fontFamily='spaceMono' color='white'>
          <FormLabel>What say of your Github Handle?</FormLabel>
          <StyledInput
            placeholder="no '@"
            name='githubHandle'
            onChange={context.inputChangeHandler}
            value={context.githubHandle}
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
            name='telegramHandle'
            onChange={context.inputChangeHandler}
            value={context.telegramHandle}
          />
        </FormControl>
        <FormControl fontFamily='spaceMono' color='white'>
          <FormLabel>Your well flown Twitter bird?</FormLabel>
          <StyledInput
            placeholder="no '@'"
            name='twitterHandle'
            onChange={context.inputChangeHandler}
            value={context.twitterHandle}
          />
        </FormControl>
      </Stack>

      <Stack mb={{ base: 10, lg: 0 }} direction={{ base: 'column', lg: 'row' }}>
        <FormControl
          isRequired
          isInvalid={
            context.ethereumAddress === '' && buttonClick ? true : false
          }
          fontFamily='spaceMono'
          color='white'
          mb={10}
        >
          <FormLabel>Your Ethereum address</FormLabel>
          {!context.ethereumAddress ? (
            <StyledPrimaryButton onClick={context.connectAccount('join')}>
              Fetch from Wallet
            </StyledPrimaryButton>
          ) : (
            <StyledInput
              placeholder='0x...'
              name='ethereumAddress'
              value={context.ethereumAddress}
              isReadOnly={true}
              isDisabled={true}
            />
          )}
        </FormControl>
        <FormControl fontFamily='spaceMono' color='white'>
          <FormLabel>Your ENS address</FormLabel>
          <StyledInput
            placeholder='no .eth'
            name='ensAddress'
            value={context.ensAddress}
            isReadOnly={true}
            isDisabled={true}
          />
        </FormControl>
      </Stack>

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
          onClick={() => {
            if (context.discordHandle && context.ethereumAddress) {
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
        </StyledPrimaryButton>
      </Flex>
    </Flex>
  );
};
