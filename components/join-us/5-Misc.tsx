import React, { useEffect } from 'react';
import { Flex, SimpleGrid, Button, Input, useMediaQuery, Textarea, useToast } from '@raidguild/design-system';
import { useForm } from 'react-hook-form';
import { FaInfoCircle } from 'react-icons/fa';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useJoinState } from '../../context/joinState';

import RadioBox from '../atoms/RadioBox';

interface Props {
  handleBack: () => void;
  handleNext: () => void;
}

const validationSchema = Yup.object().shape({
  daoFamiliarity: Yup.string().required(),
  cryptoExp: Yup.string().required(),
  availability: Yup.string().required(),
  comments: Yup.string().required(),
});

const StepFive = ({ handleNext, handleBack }: Props) => {
  const [upTo780] = useMediaQuery('(max-width: 780px)');
  const { joinState, setJoinState } = useJoinState();
  const localForm = useForm({ resolver: yupResolver(validationSchema) });
  const toast = useToast();
  const { handleSubmit, reset } = localForm;
  useEffect(() => {
    reset({ ...joinState.stage5 });
    console.log('reset set', JSON.stringify(joinState.stage5));
  }, []);

  const onNext = (data: any) => {
    console.log('handleNext');
    console.log(`data: ${JSON.stringify(data)}`);

    setJoinState({
      ...joinState,
      stage5: { ...data },
    });
    handleNext();
  };
  const onError = (data: any) => {
    if (Object.keys(data).length > 0) {
      toast.error({
        title: 'Please fill in all required fields',
        iconName: 'alert',
      });
    }
  };

  return (
    <Flex w='100%' direction='column' px={{ base: '2rem', lg: '5rem' }} py='2rem'>
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={{ base: 0, lg: 5 }}>
        <RadioBox
          stack={upTo780 ? 'vertical' : 'horizontal'}
          options={['Expert', 'Familiar', 'A Little', 'None']}
          name='daoFamiliarity'
          localForm={localForm}
          label="Our power is a DAO (a 'Decentralized Autonomous Organization'). Of this term you are familiar?*"
        />

        <Input label='Ho, you know of Crypto yes? For how long?*' name='cryptoExp' localForm={localForm} />

        <RadioBox
          stack={upTo780 ? 'vertical' : 'horizontal'}
          options={['0-5 hours', '6-12 hours', '13-35 hours', '36+ hours']}
          name='availability'
          localForm={localForm}
          label='What say you to your status, within our RaidGuild here?*'
        />

        <Textarea label='Any comments that still remain, Apprentice*' name='comments' localForm={localForm} />
      </SimpleGrid>

      <Flex gap={4} justify='center' mt='2rem'>
        <Button onClick={handleBack} variant='outline'>
          Back
        </Button>
        <Button onClick={handleSubmit(onNext, onError)}>Next</Button>
      </Flex>
    </Flex>
  );
};

export default StepFive;