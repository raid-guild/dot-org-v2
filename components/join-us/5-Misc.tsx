import React, { useState } from 'react';
import { Flex, SimpleGrid, Input, useMediaQuery, Textarea } from '@raidguild/design-system';
import { UseFormReturn } from 'react-hook-form';
import { FaInfoCircle } from 'react-icons/fa';

import RadioBox from '../atoms/RadioBox';

interface Props {
  handleBack: () => void;
  handleNext: () => void;
}

// const availabilityTooltip = "Hear, Apprentice, hear, for the time in which you're clear. Raids doft blasts and fogs, from which some time forbear. Take counsel with yourself, and come unto us well prepared."

const StepFive = ({ handleNext, handleBack }: Props) => {
  const [upTo780] = useMediaQuery('(max-width: 780px)');

  return (
    <Flex w='100%' direction='column' px={{ base: '2rem', lg: '5rem' }} py='2rem'>
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={{ base: 0, lg: 5 }}>
        <RadioBox
          stack={upTo780 ? 'vertical' : 'horizontal'}
          options={['Expert', 'Familiar', 'A Little', 'None']}
          name='daoFamiliarity'
          localForm={localForm}
          label="Our power is a DAO (a 'Decentralized Autonomous Organization'). Of this term you are familiar?"
        />

        <Input label='Ho, you know of Crypto yes? For how long?' name='j_cryptoExp' localForm={localForm} />

        <RadioBox
          stack={upTo780 ? 'vertical' : 'horizontal'}
          options={['0-5 hours', '6-12 hours', '13-35 hours', '36+ hours']}
          name='availability'
          localForm={localForm}
          label='What say you to your status, within our RaidGuild here?'
        />

        <Textarea label='Any comments that still remain, Apprentice?' name='comments' localForm={localForm} />
      </SimpleGrid>
    </Flex>
  );
};

export default StepFive;
