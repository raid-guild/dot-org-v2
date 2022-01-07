import React, { useState, useContext } from 'react';
import { Flex, FormControl, FormLabel, Stack } from '@chakra-ui/react';
import { AppContext } from '../../context/AppContext';
import { StyledPrimaryButton, StyledInput } from '../../themes/styled';
import StageButtonGroup from '../../shared/StageButtonGroup';
import useWallet from '../../hooks/useWallet';

export const StepTwo = () => {
  const context = useContext(AppContext);
  const { connectionInfo, connectWallet } = useWallet(true);

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
            context.signerAddress === null && buttonClick ? true : false
          }
          fontFamily='spaceMono'
          color='white'
          mb={10}
        >
          <FormLabel>Your Ethereum address</FormLabel>
          {!context.signerAddress ? (
            <StyledPrimaryButton onClick={connectWallet}>
              Fetch from Wallet
            </StyledPrimaryButton>
          ) : (
            <StyledInput
              placeholder='0x...'
              name='ethereumAddress'
              value={context.signerAddress}
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
            value={context.signerEns}
            isReadOnly={true}
            isDisabled={true}
          />
        </FormControl>
      </Stack>

      <StageButtonGroup
        formType={'join'}
        updateStage={context.updateStage}
        updateFaqModalStatus={context.updateFaqModalStatus}
        setButtonClickStatus={setButtonClickStatus}
        stageRule={context.discordHandle && context.signerAddress}
      />
    </Flex>
  );
};
