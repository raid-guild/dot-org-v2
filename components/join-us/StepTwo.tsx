import { Flex, Stack, Input } from '@raidguild/design-system';
import { UseFormReturn } from 'react-hook-form';

// import StageButtonGroup from '../../shared/StageButtonGroup';

const inputs = [
  {
    label: 'What is your Discord handle?',
    placeholder: 'Include the unique identifier after the #, no @',
    name: 'j_discordHandle',
  },
  {
    label: 'What is your Github Handle?',
    placeholder: 'no @',
    name: 'j_githubHandle',
  },
  {
    label: 'And of Telegram?',
    placeholder: 'no @',
    name: 'j_telegramHandle',
  },
  {
    label: 'Your well flown Twitter bird?',
    placeholder: 'no @',
    name: 'j_twitterHandle',
  },
];

interface Props {
  localForm: UseFormReturn;
}

const StepTwo = ({ localForm }: Props) => {
  return (
    <Flex w='100%' direction='column' px={{ base: '2rem', lg: '5rem' }} py='2rem'>
      <Stack mb={{ base: 10, lg: 0 }} direction={{ base: 'column', lg: 'row' }} spacing={{ base: 0, lg: 5 }}>
        {inputs.map((input) => (
          <Input
            key={input.label}
            label={input.label}
            name={input.name}
            placeholder={input.placeholder}
            localForm={localForm}
          />
        ))}
      </Stack>

      {/* TODO handle address & ens fetch */}
      {/* <Stack mb={{ base: 10, lg: 0 }} direction={{ base: 'column', lg: 'row' }}>
        <FormControl
          isRequired
          isInvalid={context.signerAddress === null && buttonClick ? true : false}
          fontFamily='spaceMono'
          color='white'
          mb={10}>
          <FormLabel>Your Ethereum address</FormLabel>
          {!context.signerAddress ? (
            <Button onClick={connectWallet}>Fetch from Wallet</Button>
          ) : (
            <StyledInput
              placeholder='0x...'
              name='signerAddress'
              value={context.signerAddress}
              isReadOnly={true}
              isDisabled={true}
            />
          )}
        </FormControl>
        <FormControl fontFamily='spaceMono' color='white'>
          <FormLabel>Your ENS address</FormLabel>
          <ChakraInput
            placeholder='no .eth'
            name='signerEns'
            value={context.signerEns}
            isReadOnly={true}
            isDisabled={true}
          />
        </FormControl>
      </Stack> */}

      {/* <StageButtonGroup
        formType={'join'}
        updateStage={context.updateStage}
        updateFaqModalStatus={context.updateFaqModalStatus}
        setButtonClickStatus={setButtonClickStatus}
        stageRule={context.j_discordHandle && context.signerAddress}
      /> */}
    </Flex>
  );
};

export default StepTwo;
