import React, { useState, useContext } from 'react';
import {
  Flex,
  FormControl,
  FormLabel,
  Textarea,
  Stack,
  useToast,
  Button,
  Box
} from '@chakra-ui/react';
import styled from '@emotion/styled';

import { AppContext } from '../../context/AppContext';
import { theme } from '../../themes/theme';

import RadioBox from '../../shared/RadioBox';

const StyledTextArea = styled(Textarea)`
  background: ${theme.colors.blackLight};
  border: none;
  border-radius: 0;
`;

export const StepFour = ({ windowWidth }) => {
  const context = useContext(AppContext);
  const toast = useToast();

  const [priorities, setPriorities] = useState(
    context.h_priorities || 'Fast & Polished'
  );

  const [buttonClick, setButtonClickStatus] = useState(false);

  return (
    <Flex
      w='100%'
      direction='column'
      px={{ base: '2rem', lg: '5rem' }}
      py='2rem'
    >
      <Stack direction='column' spacing={{ base: 0, lg: 5 }} mb={10}>
        <FormControl
          isRequired
          isInvalid={
            context.h_specificNeed === '' && buttonClick ? true : false
          }
          fontFamily='spaceMono'
          color='white'
          mb={10}
        >
          <FormLabel>Do you need something very specific?</FormLabel>
          <StyledTextArea
            placeholder='Tell us how you think we can best help you?'
            onChange={context.inputChangeHandler}
            name='h_specificNeed'
            value={context.h_specificNeed}
          />
        </FormControl>

        <FormControl isRequired fontFamily='spaceMono' color='white'>
          <FormLabel as='legend'>What are your priorities?</FormLabel>
          <RadioBox
            stack={windowWidth < 400 ? 'vertical' : 'horizontal'}
            options={[
              'Fast & Polished',
              'Fast & Inexpensive',
              'Polished & Inexpensive'
            ]}
            updateRadio={setPriorities}
            name='h_priorities'
            defaultValue={context.h_priorities || priorities}
            value={context.h_priorities || priorities}
          />
        </FormControl>
      </Stack>

      <Flex
        direction={{ base: 'column-reverse', lg: 'row' }}
        justifyContent='space-between'
      >
        {context.stage !== 1 && context.stage !== 6 && (
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
          isLoading={context.submitting}
          loadingText={context.submitLoadingText}
          onClick={() => {
            if (context.h_specificNeed !== '') {
              setButtonClickStatus(false);
              context.setPriorities(priorities);
              context.submitConsultation();
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
          Pay 500 $RAID & SUBMIT
        </Button>
      </Flex>
    </Flex>
  );
};
