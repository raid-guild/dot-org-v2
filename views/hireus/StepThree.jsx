import React, { useState, useContext } from 'react';
import {
  Flex,
  FormControl,
  FormLabel,
  Stack,
  Checkbox,
  CheckboxGroup
} from '@chakra-ui/react';

import { AppContext } from '../../context/AppContext';

import RadioBox from '../../shared/RadioBox';
import StageButtonGroup from '../../shared/StageButtonGroup';

import { hireus_services } from '../../utils/constants';

import { StyledInput } from '../../themes/styled';

export const StepThree = () => {
  const context = useContext(AppContext);

  const [servicesNeeded, setServicesNeeded] = useState(
    context.h_servicesNeeded || []
  );
  const [budgetRange, setBudgetRange] = useState(
    context.h_budgetRange || '$5k - $20k'
  );
  const [expectedDeadline, setExpectedDeadline] = useState(
    context.h_expectedDeadline
  );

  const [buttonClick, setButtonClickStatus] = useState(false);

  return (
    <Flex
      w='100%'
      direction='column'
      px={{ base: '2rem', lg: '5rem' }}
      py='2rem'
    >
      <Stack direction={{ base: 'column', lg: 'row' }} mb={10} spacing={10}>
        <FormControl
          isRequired
          isInvalid={servicesNeeded.length === 0 && buttonClick ? true : false}
          fontFamily='spaceMono'
          color='white'
        >
          <FormLabel mb={5}>What services are needed?</FormLabel>
          <CheckboxGroup
            color='red'
            onChange={(e) => setServicesNeeded(e)}
            name='h_servicesNeeded'
            value={servicesNeeded}
          >
            <Stack direction='column' maxH='350px' overflowY='scroll'>
              {hireus_services.map((value, index) => {
                return (
                  <Checkbox
                    key={index}
                    value={value}
                    color='red'
                    fontFamily='jetbrains'
                  >
                    {value}
                  </Checkbox>
                );
              })}
            </Stack>
          </CheckboxGroup>
        </FormControl>

        <Stack direction='column' mb={10} spacing={10}>
          <FormControl isRequired fontFamily='spaceMono' color='white'>
            <FormLabel as='legend'>What's your budget range?</FormLabel>
            <RadioBox
              stack='vertical'
              options={[
                '< $5k',
                '$5k - $20k',
                '$20k - $50k',
                '$50k +',
                'Not Sure'
              ]}
              updateRadio={setBudgetRange}
              name='h_budgetRange'
              defaultValue={context.h_budgetRange || budgetRange}
              value={context.h_budgetRange || budgetRange}
            />
          </FormControl>

          <FormControl isRequired fontFamily='spaceMono' color='white'>
            <FormLabel>Expected Deadline</FormLabel>

            <StyledInput
              type='date'
              color='white'
              name='h_expectedDeadline'
              onChange={(e) => setExpectedDeadline(e.target.value)}
              value={expectedDeadline}
            />
          </FormControl>
        </Stack>
      </Stack>

      <StageButtonGroup
        formType={'hire'}
        updateStage={context.updateStage}
        updateFaqModalStatus={context.updateFaqModalStatus}
        setButtonClickStatus={setButtonClickStatus}
        stageRule={servicesNeeded.length !== 0 && expectedDeadline}
        setData={context.setHireStepThreeData}
        dataValues={[servicesNeeded, budgetRange, expectedDeadline]}
      />
    </Flex>
  );
};
