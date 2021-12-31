import React, { useState, useContext } from 'react';
import {
  Flex,
  FormControl,
  FormLabel,
  Textarea,
  Stack,
  useToast,
  Input,
  Tooltip,
  Button,
  Box
} from '@chakra-ui/react';
import styled from '@emotion/styled';

import { InfoIcon } from '@chakra-ui/icons';

import RadioBox from '../../shared/RadioBox';

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

export const StepFive = ({ windowWidth }) => {
  const context = useContext(AppContext);
  const toast = useToast();

  const [daoFamiliarity, setDaoFamiliarity] = useState(
    context.daoFamiliarity || 'Expert'
  );

  const [availability, setAvailability] = useState(
    context.availability || '6-12 hours'
  );

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
        mb={{ base: 10, lg: 0 }}
        spacing={{ base: 0, lg: 5 }}
      >
        <FormControl isRequired fontFamily='spaceMono' color='white' mb={10}>
          <FormLabel as='legend'>
            Our power is a DAO (a 'Decentralized Autonomous Organization'). Of
            this term you are familiar?
          </FormLabel>
          <RadioBox
            stack={windowWidth < 400 ? 'vertical' : 'horizontal'}
            options={['Expert', 'Familiar', 'A Little', 'None']}
            updateRadio={setDaoFamiliarity}
            name='daoFamiliarity'
            defaultValue={context.daoFamiliarity || daoFamiliarity}
            value={context.daoFamiliarity || daoFamiliarity}
          />
        </FormControl>

        <FormControl
          isRequired
          isInvalid={context.cryptoExp === '' && buttonClick ? true : false}
          fontFamily='spaceMono'
          color='white'
        >
          <FormLabel>Ho, you know of Crypto yes? For how long?</FormLabel>
          <StyledInput
            placeholder='In years'
            onChange={context.inputChangeHandler}
            name='cryptoExp'
            value={context.cryptoExp}
          />
        </FormControl>
      </Stack>

      <Stack
        direction={{ base: 'column', lg: 'row' }}
        mb={{ base: 10, lg: 0 }}
        spacing={{ base: 0, lg: 5 }}
      >
        <FormControl isRequired fontFamily='spaceMono' color='white' mb={10}>
          <FormLabel as='legend'>
            What say you to your status, within our RaidGuild here?{' '}
            <Tooltip
              hasArrow
              placement='top'
              label="Hear, Apprentice, hear, for the time in which you're clear. Raids doft blasts and fogs, from which some time forbear. Take counsel with yourself, and come unto us well prepared."
              aria-label='disclaimer tooltip'
            >
              <InfoIcon />
            </Tooltip>
          </FormLabel>
          <RadioBox
            stack={windowWidth < 400 ? 'vertical' : 'horizontal'}
            options={['0-5 hours', '6-12 hours', '13-35 hours', '36+ hours']}
            updateRadio={setAvailability}
            name='daoFamiliarity'
            defaultValue={context.availability || availability}
            value={context.availability || availability}
          />
        </FormControl>
        <FormControl mb={10} fontFamily='spaceMono' color='white'>
          <FormLabel>Any comments that still remain, Apprentice?</FormLabel>
          <StyledTextArea
            onChange={context.inputChangeHandler}
            name='comments'
            value={context.comments}
          />
        </FormControl>
      </Stack>

      <Flex
        direction={{ base: 'column-reverse', lg: 'row' }}
        justifyContent='space-between'
        mt='2rem'
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
              onClick={() => context.updateFaqModalStatus(true, 'join')}
            >
              Read FAQ
            </Button>
          </Flex>
        )}
        <Button
          variant='primary'
          onClick={() => {
            if (context.cryptoExp !== '') {
              setButtonClickStatus(false);
              context.setCryptoData(daoFamiliarity, availability);
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
