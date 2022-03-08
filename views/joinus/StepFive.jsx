import React, { useState, useContext } from 'react';
import { Flex, FormControl, FormLabel, Stack, Tooltip } from '@chakra-ui/react';

import { InfoIcon } from '@chakra-ui/icons';

import RadioBox from '../../shared/RadioBox';
import StageButtonGroup from '../../shared/StageButtonGroup';

import { AppContext } from '../../context/AppContext';

import { StyledInput, StyledTextArea } from '../../themes/styled';

export const StepFive = ({ windowWidth }) => {
  const context = useContext(AppContext);

  const [daoFamiliarity, setDaoFamiliarity] = useState(
    context.j_daoFamiliarity || 'Expert'
  );

  const [availability, setAvailability] = useState(
    context.j_availability || '6-12 hours'
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
            name='j_daoFamiliarity'
            defaultValue={context.j_daoFamiliarity || daoFamiliarity}
            value={context.j_daoFamiliarity || daoFamiliarity}
          />
        </FormControl>

        <FormControl
          isRequired
          isInvalid={context.j_cryptoExp === '' && buttonClick ? true : false}
          fontFamily='spaceMono'
          color='white'
        >
          <FormLabel>Ho, you know of Crypto yes? For how long?</FormLabel>
          <StyledInput
            placeholder='In years'
            onChange={context.inputChangeHandler}
            name='j_cryptoExp'
            value={context.j_cryptoExp}
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
            name='j_daoFamiliarity'
            defaultValue={context.j_availability || availability}
            value={context.j_availability || availability}
          />
        </FormControl>
        <FormControl mb={10} fontFamily='spaceMono' color='white'>
          <FormLabel>Any comments that still remain, Apprentice?</FormLabel>
          <StyledTextArea
            onChange={context.inputChangeHandler}
            name='j_comments'
            value={context.j_comments}
          />
        </FormControl>
      </Stack>

      <StageButtonGroup
        formType={'join'}
        updateStage={context.updateStage}
        updateFaqModalStatus={context.updateFaqModalStatus}
        setButtonClickStatus={setButtonClickStatus}
        stageRule={context.j_cryptoExp !== ''}
        setData={context.setJoinStepFiveData}
        dataValues={[daoFamiliarity, availability]}
      />
    </Flex>
  );
};
