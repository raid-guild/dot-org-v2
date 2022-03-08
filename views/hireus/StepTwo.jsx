import React, { useState, useContext } from 'react';
import { Flex, FormControl, FormLabel, Stack } from '@chakra-ui/react';

import { AppContext } from '../../context/AppContext';

import RadioBox from '../../shared/RadioBox';

import { StyledInput, StyledTextArea } from '../../themes/styled';

import StageButtonGroup from '../../shared/StageButtonGroup';

export const StepTwo = () => {
  const context = useContext(AppContext);

  const [projectType, setProjectType] = useState(
    context.h_projectType || 'New'
  );
  const [specsType, setSpecsType] = useState(context.h_specsType || 'Yes');
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
        <FormControl isRequired fontFamily='spaceMono' color='white' mb={10}>
          <FormLabel as='legend'>New or Existing Project?</FormLabel>
          <RadioBox
            stack='horizontal'
            options={['New', 'Existing']}
            updateRadio={setProjectType}
            name='h_projectType'
            defaultValue={context.h_projectType || projectType}
            value={context.h_projectType || projectType}
          />
        </FormControl>
        <FormControl isRequired fontFamily='spaceMono' color='white'>
          <FormLabel as='legend'>Have the project specs ready?</FormLabel>
          <RadioBox
            stack='horizontal'
            options={['Yes', 'Partial', 'None']}
            updateRadio={setSpecsType}
            name='h_specsType'
            defaultValue={context.h_specsType || specsType}
            value={context.h_specsType || specsType}
          />
        </FormControl>
      </Stack>

      <Stack
        mb={{ base: 10, lg: 0 }}
        direction={{ base: 'column', lg: 'row' }}
        spacing={{ base: 0, lg: 5 }}
      >
        <FormControl isRequired fontFamily='spaceMono' color='white' mb={10}>
          <FormLabel>Project Name?</FormLabel>
          <StyledInput
            placeholder='Project Name'
            name='h_projectName'
            onChange={context.inputChangeHandler}
            value={context.h_projectName}
          />
        </FormControl>
        <FormControl fontFamily='spaceMono' color='white'>
          <FormLabel>Link to Specs</FormLabel>
          <StyledInput
            placeholder='Any link related to the project'
            name='h_projectLink'
            onChange={context.inputChangeHandler}
            value={context.h_projectLink}
          />
        </FormControl>
      </Stack>

      <FormControl
        mb={10}
        isRequired
        isInvalid={context.h_projectDesc === '' && buttonClick ? true : false}
        fontFamily='spaceMono'
        color='white'
      >
        <FormLabel>Project Description</FormLabel>
        <StyledTextArea
          placeholder='Describe your project, goals, vision, etc.'
          onChange={context.inputChangeHandler}
          name='h_projectDesc'
          value={context.h_projectDesc}
        />
      </FormControl>

      <StageButtonGroup
        formType={'hire'}
        updateStage={context.updateStage}
        updateFaqModalStatus={context.updateFaqModalStatus}
        setButtonClickStatus={setButtonClickStatus}
        stageRule={context.h_projectName && context.h_projectDesc}
        setData={context.setHireStepTwoData}
        dataValues={[projectType, specsType]}
      />
    </Flex>
  );
};
