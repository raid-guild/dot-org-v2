import { Box, Button, ChakraButtonProps } from '@raidguild/design-system';
import React, { useState } from 'react';

interface GradientShiftButtonProps extends ChakraButtonProps {
  children: React.ReactNode;
}

const GradientShiftButton = ({ children, ...props }: GradientShiftButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <Button
      fontWeight={500}
      fontFamily='spaceMono'
      bg='none'
      _hover={{ bg: 'none' }}
      position='relative'
      style={{ overflow: 'hidden', clip: 'rect(auto, auto, auto, auto)' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      shadow='none'
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}>
      <Box
        position='absolute'
        top={0}
        left={0}
        zIndex={0}
        width='150%'
        height='full'
        alignItems='center'
        background='linear-gradient(95deg, rgb(255, 90, 0) 0%, rgb(214, 39, 137) 70.2%)'
        justifyContent='center'
        willChange='transform'
        transform='preserve-3d'
        transition='transform .425s ease-in-out'
        sx={{ transform: isHovered ? 'translate3d(-30%, 0, 0)' : '' }}
      />
      <span style={{ position: 'relative', zIndex: 10 }}>{children}</span>
    </Button>
  );
};

export default GradientShiftButton;
