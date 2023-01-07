import React, { useState } from 'react';
import {
  Flex,
  FormControl,
  FormLabel,
  SimpleGrid,
  Tooltip,
  Input,
  useMediaQuery,
  Icon,
  Textarea,
} from '@raidguild/design-system';
import { UseFormReturn } from 'react-hook-form';
import { FaInfoCircle } from 'react-icons/fa';

import RadioBox from '../atoms/RadioBox';

interface Props {
  localForm: UseFormReturn;
}

const StepFive = ({ localForm }: Props) => {
  const [upTo780] = useMediaQuery('(max-width: 780px)');
  const [daoFamiliarity, setDaoFamiliarity] = useState('Expert');

  const [availability, setAvailability] = useState('6-12 hours');

  return (
    <Flex w='100%' direction='column' px={{ base: '2rem', lg: '5rem' }} py='2rem'>
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={{ base: 0, lg: 5 }}>
        <FormControl isRequired fontFamily='spaceMono' color='white' mb={10}>
          <FormLabel as='legend'>
            Our power is a DAO (a &apos;Decentralized Autonomous Organization&apos;). Of this term you are familiar?
          </FormLabel>
          <RadioBox
            stack={upTo780 ? 'vertical' : 'horizontal'}
            options={['Expert', 'Familiar', 'A Little', 'None']}
            updateRadio={setDaoFamiliarity}
            name='daoFamiliarity'
            value={daoFamiliarity}
          />
        </FormControl>

        <Input label='Ho, you know of Crypto yes? For how long?' name='j_cryptoExp' localForm={localForm} />

        <FormControl isRequired fontFamily='spaceMono' color='white' mb={10}>
          <FormLabel as='legend'>
            What say you to your status, within our RaidGuild here?{' '}
            <Tooltip
              hasArrow
              placement='top'
              label="Hear, Apprentice, hear, for the time in which you're clear. Raids doft blasts and fogs, from which some time forbear. Take counsel with yourself, and come unto us well prepared."
              aria-label='disclaimer tooltip'
              shouldWrapChildren>
              <Icon as={FaInfoCircle} />
            </Tooltip>
          </FormLabel>
          <RadioBox
            stack={upTo780 ? 'vertical' : 'horizontal'}
            options={['0-5 hours', '6-12 hours', '13-35 hours', '36+ hours']}
            updateRadio={setAvailability}
            name='daoFamiliarity'
            value={availability}
          />
        </FormControl>

        <Textarea label='Any comments that still remain, Apprentice?' name='comments' localForm={localForm} />
      </SimpleGrid>
    </Flex>
  );
};

export default StepFive;
