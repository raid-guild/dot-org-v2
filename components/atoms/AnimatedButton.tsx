import React, { useState } from 'react';
import { Box, Button, ChakraButtonProps } from '@raidguild/design-system';
import { motion, AnimatePresence } from 'framer-motion';

const MotionBox = motion(Box);
const gradient = 'linear-gradient(96deg, #FF3864 0%, #8B1DBA 71.35%)';

interface AnimatedButtonProps extends ChakraButtonProps {
  children: React.ReactNode;
}

const AnimatedButton = ({ children, ...props }: AnimatedButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const variants = {
    initial: { width: 0 },
    animate: {
      width: '100%',
      transition: { duration: 0.38 },
    },
    exit: {
      width: 0,
      transition: { duration: 0.2 },
    },
  };

  return (
    <Button
      variant='gradientOutline'
      fontFamily='spaceMono'
      fontWeight={500}
      _hover={{
        background: 'transparent',
        '.text-gradient': { bgClip: 'initial', textColor: '#fff', bg: 'transparent' },
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}>
      <AnimatePresence>
        {isHovered && (
          <MotionBox
            position='absolute'
            left={0}
            top={0}
            bottom={0}
            height='100%'
            borderRadius={0}
            bg={gradient}
            variants={variants}
            initial='initial'
            animate='animate'
            exit='exit'
          />
        )}
      </AnimatePresence>
      <Box
        className='text-gradient'
        bg={gradient}
        bgClip='text'
        h='max'
        p={6}
        zIndex={10}
        alignItems='center'
        justifyContent='center'
        borderRadius={2}>
        {children}
      </Box>
    </Button>
  );
};

export default AnimatedButton;
