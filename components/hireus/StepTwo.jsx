import React, { useState, useContext } from 'react';
import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  useToast,
  Button,
  Box,
  Textarea
} from '@chakra-ui/react';
import styled from '@emotion/styled';

import { AppContext } from '../../context/AppContext';
import { theme } from '../../themes/theme';

import RadioBox from '../../shared/RadioBox';

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

export const StepTwo = () => {
  const context = useContext(AppContext);
  const toast = useToast();

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

      <Flex
        direction={{ base: 'column-reverse', lg: 'row' }}
        justifyContent='space-between'
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
              onClick={() => context.updateFaqModalStatus(true, 'hire')}
            >
              Read FAQ
            </Button>
          </Flex>
        )}
        <Button
          variant='primary'
          onClick={() => {
            if (context.h_projectName && context.h_projectDesc) {
              setButtonClickStatus(false);
              context.setProjectData(projectType, specsType);
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
