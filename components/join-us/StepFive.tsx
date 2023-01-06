import React, { useState } from 'react';
import {
  Flex,
  FormControl,
  FormLabel,
  Stack,
  Tooltip,
  Input,
  useMediaQuery,
  Icon,
  Textarea,
} from '@raidguild/design-system';
import { UseFormReturn } from 'react-hook-form';
import { FaInfoCircle } from 'react-icons/fa';

import RadioBox from '../atoms/RadioBox';
// import StageButtonGroup from '../../shared/StageButtonGroup';

interface Props {
  localForm: UseFormReturn;
}

const StepFive = ({ localForm }: Props) => {
  const [upTo780] = useMediaQuery('(max-width: 780px)');
  const [daoFamiliarity, setDaoFamiliarity] = useState('Expert');

  const [availability, setAvailability] = useState('6-12 hours');

  const [buttonClick, setButtonClickStatus] = useState(false);

  return (
    <Flex w='100%' direction='column' px={{ base: '2rem', lg: '5rem' }} py='2rem'>
      <Stack direction={{ base: 'column', lg: 'row' }} mb={{ base: 10, lg: 0 }} spacing={{ base: 0, lg: 5 }}>
        <FormControl isRequired fontFamily='spaceMono' color='white' mb={10}>
          <FormLabel as='legend'>
            Our power is a DAO (a &apos;Decentralized Autonomous Organization&apos;). Of this term you are familiar?
          </FormLabel>
          <RadioBox
            stack={upTo780 ? 'vertical' : 'horizontal'}
            options={['Expert', 'Familiar', 'A Little', 'None']}
            updateRadio={setDaoFamiliarity}
            name='j_daoFamiliarity'
            defaultValue={daoFamiliarity}
            value={daoFamiliarity}
          />
        </FormControl>

        <Input label='Ho, you know of Crypto yes? For how long?' name='j_cryptoExp' localForm={localForm} />
      </Stack>

      <Stack direction={{ base: 'column', lg: 'row' }} mb={{ base: 10, lg: 0 }} spacing={{ base: 0, lg: 5 }}>
        <FormControl isRequired fontFamily='spaceMono' color='white' mb={10}>
          <FormLabel as='legend'>
            What say you to your status, within our RaidGuild here?{' '}
            <Tooltip
              hasArrow
              placement='top'
              label="Hear, Apprentice, hear, for the time in which you're clear. Raids doft blasts and fogs, from which some time forbear. Take counsel with yourself, and come unto us well prepared."
              aria-label='disclaimer tooltip'>
              <Icon as={FaInfoCircle} />
            </Tooltip>
          </FormLabel>
          <RadioBox
            stack={upTo780 ? 'vertical' : 'horizontal'}
            options={['0-5 hours', '6-12 hours', '13-35 hours', '36+ hours']}
            updateRadio={setAvailability}
            name='j_daoFamiliarity'
            defaultValue={availability}
            value={availability}
          />
        </FormControl>

        <Textarea label='Any comments that still remain, Apprentice?' name='j_comments' localForm={localForm} />
      </Stack>

      {/* <StageButtonGroup
        formType={'join'}
        updateStage={context.updateStage}
        updateFaqModalStatus={context.updateFaqModalStatus}
        setButtonClickStatus={setButtonClickStatus}
        stageRule={context.j_cryptoExp !== ''}
        setData={context.setJoinStepFiveData}
        dataValues={[daoFamiliarity, availability]}
      /> */}
    </Flex>
  );
};

export default StepFive;
