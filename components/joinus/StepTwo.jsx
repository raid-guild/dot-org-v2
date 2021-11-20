import React, { useState, useContext } from 'react';
import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  useToast,
  Button,
  Heading
} from '@chakra-ui/react';
import styled from '@emotion/styled';

import { AppContext } from '../../context/AppContext';
import { theme } from '../../themes/theme';

const StyledInput = styled(Input)`
  background: ${theme.colors.blackLight};
  border: none;
  border-radius: 0;
`;

export const StepTwo = () => {
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
        Step 2 of 6: Your Social Presence
      </Heading>

      <Stack mb={10} direction={{ base: 'column', lg: 'row' }}>
        <FormControl
          isRequired
          isInvalid={context.discordHandle === '' && buttonClick ? true : false}
          fontFamily='spaceMono'
          color='white'
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

      <Stack mb={10} direction={{ base: 'column', lg: 'row' }}>
        <FormControl fontFamily='spaceMono' color='white'>
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

      <Stack mb={10} direction={{ base: 'column', lg: 'row' }}>
        <FormControl
          isRequired
          isInvalid={
            context.ethereumAddress === '' && buttonClick ? true : false
          }
          fontFamily='spaceMono'
          color='white'
        >
          <FormLabel>Pray tell, what is your Ethereum address?</FormLabel>
          <StyledInput
            placeholder='0x...'
            name='ethereumAddress'
            onChange={context.inputChangeHandler}
            value={context.ethereumAddress}
          />
        </FormControl>
        <FormControl fontFamily='spaceMono' color='white'>
          <FormLabel>At last, what is your ENS address?</FormLabel>
          <StyledInput
            placeholder='no .eth'
            name='ensAddress'
            onChange={context.inputChangeHandler}
            value={context.ensAddress}
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
              onClick={() => context.updateFaqModalStatus(true)}
            >
              Read FAQ
            </Button>
          </Flex>
        )}
        <Button
          variant='primary'
          onClick={() => {
            if (context.discordHandle && context.ethereumAddress) {
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
