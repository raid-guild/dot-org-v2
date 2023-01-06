import { Flex, FormControl, FormLabel, Stack, Checkbox, CheckboxGroup } from '@raidguild/design-system';
import { UseFormReturn, Controller } from 'react-hook-form';
import _ from 'lodash';

import RadioBox from '../atoms/RadioBox';
// import StageButtonGroup from '../../shared/StageButtonGroup';
import { skills } from '../../utils/constants';

interface Props {
  localForm: UseFormReturn;
}

const inputs = [
  {
    label: "What say'st are your primary skills?",
  },
];

interface CheckboxGroupInputProps {
  options: string[];
  localForm: UseFormReturn;
  label: string;
  name: string;
}

const CheckboxGroupInput = ({ options, localForm, label, name }: CheckboxGroupInputProps) => {
  const {
    register,
    control,
    formState: { errors },
  } = localForm;

  return (
    <FormControl isRequired isInvalid={_.includes(_.keys(errors), name)} fontFamily='spaceMono' color='white'>
      <FormLabel mb={5}>{label}</FormLabel>

      {options.map((value) => (
        <Controller
          control={control}
          name={name}
          key={value}
          defaultValue={false}
          render={({ field: { onChange, value: localValue, ref } }: any) => (
            <Checkbox
              onChange={onChange}
              textTransform='capitalize'
              defaultValue={localValue}
              options={localValue}
              isChecked={localValue}>
              {name}
            </Checkbox>
          )}
        />
      ))}
    </FormControl>
  );
};

// TODO add CheckboxGroup component to design-system

const StepThree = ({ localForm }: Props) => (
  <Flex w='100%' direction='column' px={{ base: '2rem', lg: '5rem' }} py='2rem'>
    <Stack direction={{ base: 'column', lg: 'row' }} mb={10} spacing={10}>
      {/* <FormControl
        isInvalid={secondarySkills.length === 0 && buttonClick ? true : false}
        fontFamily='spaceMono'
        color='white'>
        <FormLabel mb={5}>And your secondary skills?</FormLabel>
        <CheckboxGroup
          color='red'
          onChange={(e) => setSecondarySkills(e)}
          name='secondarySkills'
          value={secondarySkills}>
          <Stack direction='column' maxH='350px' overflowY='scroll'>
            {skills.map((value, index) => {
              return (
                <Checkbox key={index} value={value} color='red' fontFamily='jetbrains'>
                  {value}
                </Checkbox>
              );
            })}
          </Stack>
        </CheckboxGroup>
      </FormControl>

      <FormControl isRequired fontFamily='spaceMono' color='white'>
        <FormLabel as='legend'>Do you bethink yourself as technical, or non-technical?</FormLabel>
        <RadioBox
          stack='vertical'
          options={['Technical', 'Non - Technical', 'Other']}
          updateRadio={setClassType}
          name='j_classType'
          defaultValue={context.j_classType || classType}
          value={context.j_classType || classType}
        />
      </FormControl> */}
    </Stack>

    {/* <StageButtonGroup
        formType={'join'}
        updateStage={context.updateStage}
        updateFaqModalStatus={context.updateFaqModalStatus}
        setButtonClickStatus={setButtonClickStatus}
        stageRule={primarySkills.length !== 0}
        setData={context.setJoinStepThreeData}
        dataValues={[primarySkills, secondarySkills, classType]}
      /> */}
  </Flex>
);

export default StepThree;
