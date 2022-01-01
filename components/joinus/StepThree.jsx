import React, { useState, useContext } from 'react';
import {
  Flex,
  FormControl,
  FormLabel,
  Stack,
  Checkbox,
  CheckboxGroup,
  useToast,
  Box
} from '@chakra-ui/react';

import { AppContext } from '../../context/AppContext';

import RadioBox from '../../shared/RadioBox';

import { skills } from '../../utils/constants';

import {
  StyledPrimaryButton,
  StyledSecondaryButton
} from '../../themes/styled';

export const StepThree = () => {
  const context = useContext(AppContext);
  const toast = useToast();

  const [primarySkills, setPrimarySkills] = useState(
    context.primarySkills || []
  );

  const [secondarySkills, setSecondarySkills] = useState(
    context.secondarySkills || []
  );

  const [classType, setClassType] = useState(context.classType || 'Technical');

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
            name='classType'
            defaultValue={context.classType || classType}
            value={context.classType || classType}
          />
        </FormControl>
      </Stack>

      <Flex
        direction={{ base: 'column-reverse', lg: 'row' }}
        justifyContent='space-between'
      >
        {context.stage !== 1 && context.stage !== 8 && (
          <Flex direction={{ base: 'column', md: 'row' }}>
            <StyledSecondaryButton
              w='100%'
              mr='1rem'
              mt={{ base: '.5rem' }}
              onClick={() => context.updateStage('previous')}
            >
              Back
            </StyledSecondaryButton>
            <StyledSecondaryButton
              w='100%'
              mt={{ base: '.5rem' }}
              onClick={() => context.updateFaqModalStatus(true, 'join')}
            >
              Read FAQ
            </StyledSecondaryButton>
          </Flex>
        )}
        <StyledPrimaryButton
          onClick={() => {
            if (primarySkills.length !== 0) {
              setButtonClickStatus(false);
              context.setSkillSets(primarySkills, secondarySkills, classType);
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
        </StyledPrimaryButton>
      </Flex>
    </Flex>
  );
};
