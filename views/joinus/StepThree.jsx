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

import { skills } from '../../utils/constants';

export const StepThree = () => {
  const context = useContext(AppContext);

  const [primarySkills, setPrimarySkills] = useState(
    context.j_primarySkills || []
  );

  const [secondarySkills, setSecondarySkills] = useState(
    context.j_secondarySkills || []
  );

  const [classType, setClassType] = useState(
    context.j_classType || 'Technical'
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
          isInvalid={primarySkills.length === 0 && buttonClick ? true : false}
          fontFamily='spaceMono'
          color='white'
        >
          <FormLabel mb={5}>What say'st are your primary skills?</FormLabel>
          <CheckboxGroup
            color='red'
            onChange={(e) => setPrimarySkills(e)}
            name='primarySkills'
            value={primarySkills}
          >
            <Stack direction='column' maxH='350px' overflowY='scroll'>
              {skills.map((value, index) => {
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

        <FormControl
          isInvalid={secondarySkills.length === 0 && buttonClick ? true : false}
          fontFamily='spaceMono'
          color='white'
        >
          <FormLabel mb={5}>And your secondary skills?</FormLabel>
          <CheckboxGroup
            color='red'
            onChange={(e) => setSecondarySkills(e)}
            name='secondarySkills'
            value={secondarySkills}
          >
            <Stack direction='column' maxH='350px' overflowY='scroll'>
              {skills.map((value, index) => {
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

        <FormControl isRequired fontFamily='spaceMono' color='white'>
          <FormLabel as='legend'>
            Do you bethink yourself as technical, or non-technical?
          </FormLabel>
          <RadioBox
            stack='vertical'
            options={['Technical', 'Non - Technical', 'Other']}
            updateRadio={setClassType}
            name='j_classType'
            defaultValue={context.j_classType || classType}
            value={context.j_classType || classType}
          />
        </FormControl>
      </Stack>

      <StageButtonGroup
        formType={'join'}
        updateStage={context.updateStage}
        updateFaqModalStatus={context.updateFaqModalStatus}
        setButtonClickStatus={setButtonClickStatus}
        stageRule={primarySkills.length !== 0}
        setData={context.setJoinStepThreeData}
        dataValues={[primarySkills, secondarySkills, classType]}
      />
    </Flex>
  );
};
