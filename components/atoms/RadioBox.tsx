/* eslint-disable react/jsx-props-no-spreading */
import { Box, useRadio, useRadioGroup, HStack, VStack, ChakraRadioProps } from '@raidguild/design-system';

// 1. Create a component that consumes the `useRadio` hook
function RadioCard({ children, ...props }: ChakraRadioProps) {
  const { getInputProps, getCheckboxProps } = useRadio({ ...props });

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as='label'>
      <input {...input} />
      <Box
        {...checkbox}
        cursor='pointer'
        color='#7f5af0'
        boxShadow='md'
        border='1px solid #7f5af0'
        fontFamily="'JetBrains Mono', monospace"
        _checked={{
          bg: '#7f5af0',
          color: 'white',
          borderColor: 'teal.600',
        }}
        px={2}
        py={2}>
        {children}
      </Box>
    </Box>
  );
}

interface RadioBoxProps {
  name: string;
  defaultValue: string;
  updateRadio: (e: any) => void;
  options: any;
  stack: 'vertical' | 'horizontal';
}
// Step 2: Use the `useRadioGroup` hook to control a group of custom radios.
function RadioBox({ name, defaultValue, updateRadio, options, stack }: RadioBoxProps) {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name,
    defaultValue,
    onChange: (e) => {
      updateRadio(e);
    },
  });

  const group = getRootProps();

  return stack === 'vertical' ? (
    <VStack {...group} style={{ alignItems: 'inherit' }}>
      {options.map((value: any) => {
        const radio = getRadioProps({ value });
        return (
          <RadioCard key={value} {...radio}>
            {value}
          </RadioCard>
        );
      })}
    </VStack>
  ) : (
    <HStack {...group}>
      {options.map((value: any) => {
        const radio = getRadioProps({ value });
        return (
          <RadioCard key={value} {...radio}>
            {value}
          </RadioCard>
        );
      })}
    </HStack>
  );
}

export default RadioBox;
