import React, { useState } from 'react';
import { Box, Button, ChakraButtonProps } from '@raidguild/design-system';
import { motion, AnimatePresence } from 'framer-motion';

const MotionBox = motion(Box);
const gradient = 'linear-gradient(96deg, #FF3864 0%, #8B1DBA 71.35%)';

interface AnimatedButtonProps extends ChakraButtonProps {
  start: string;
  children: React.ReactNode;
}
const leftVariant = {
  initial: { width: 0 },
  animate: {
    width: '100%',
    transition: { duration: 0.6 },
  },
  exit: {
    width: 0,
    transition: { duration: 0.2 },
  },
};

const rightVariant = {
  initial: { left: '100%', width: 0 },
  animate: {
    left: '0%',
    width: '100%',
    transition: { duration: 0.6 },
  },
  exit: {
    left: '100%',
    width: 0,
    transition: { duration: 0.2 },
  },
};

const bottomVariant = {
  initial: { height: 0, bottom: 0, top: '100%' },
  animate: {
    height: '100%',
    bottom: '100%',
    top: 0,
    transition: { duration: 0.6 },
  },
  exit: {
    height: 0,
    bottom: 0,
    top: '100%',
    transition: { duration: 0.18 },
  },
};

const topVariant = {
  initial: { height: 0, top: 0 },
  animate: {
    height: '100%',
    transition: { duration: 0.6 },
  },
  exit: {
    height: 0,
    top: 0,
    transition: { duration: 0.18 },
  },
};

function getVariant(start: string) {
  switch (start) {
    case 'top':
      return topVariant;
    case 'right':
      return rightVariant;
    case 'bottom':
      return bottomVariant;
    case 'left':
      return leftVariant;
    default:
      return leftVariant;
  }
}

const AnimatedButton = ({ children, start = 'left', ...props }: AnimatedButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const variant = getVariant(start);

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
            right={0}
            height='100%'
            borderRadius={0}
            bg={gradient}
            variants={variant}
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
