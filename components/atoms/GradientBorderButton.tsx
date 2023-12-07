import React, { useState } from 'react';
import { Box, Button } from '@raidguild/design-system';
import { motion, AnimatePresence } from 'framer-motion';

const MotionBox = motion(Box);

const GradientBorderButton = ({
  label,
  color1 = '#ca2c8c',
  color2 = '#8b1dba',
  color3 = '#8021b8',
  width = '150px',
  onClick,
  ref,
}: {
  label: any;
  color1?: string;
  color2?: string;
  color3?: string;
  width?: string;
  onClick?: () => void;
  ref?: any;
}) => {
  const linearGradient = `linear-gradient(96deg, ${color1} -44.29%, ${color2} 53.18%, ${color3} 150.65%)`;

  const borderStyle = (side: string, color: string) => ({
    content: '""',
    display: 'block',
    position: 'absolute',
    width: '2px',
    top: 0,
    bottom: 0,
    [side]: 0,
    border: '2px solid',
    borderColor: color,
    [`borderTop${side === 'left' ? 'Left' : 'Right'}Radius`]: '2px',
    [`borderBottom${side === 'left' ? 'Left' : 'Right'}Radius`]: '2px',
    [`border${side === 'left' ? 'Right' : 'Left'}Color`]: 'transparent',
  });

  const commonStyle = {
    fontWeight: 'bold',
    letterSpacing: '1px',
    color: '#ddd',
    width,
    position: 'relative',
    background: `${linearGradient}, ${linearGradient}`,
    backgroundPosition: '2px 0, 2px 100%',
    backgroundRepeat: 'no-repeat',
    backgroundSize: `calc(100% - 4px) 2px`,
    borderRadius: '2px',
    border: 'none',
    backgroundColor: 'transparent',
  };

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
      variant='link'
      _hover={{
        textDecor: 'none',
        '.text-gradient': { bgClip: 'initial', textColor: '#fff', bg: 'transparent' },
      }}
      height={10}
      width={width}
      onClick={onClick}
      ref={ref}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      _before={borderStyle('left', color1)}
      _after={borderStyle('right', color3)}
      sx={commonStyle}>
      <AnimatePresence>
        {isHovered && (
          <MotionBox
            position='absolute'
            left={0}
            top={0}
            bottom={0}
            height='100%'
            borderRadius={2}
            bg={linearGradient}
            variants={variants}
            initial='initial'
            w={width}
            animate='animate'
            exit='exit'
          />
        )}
      </AnimatePresence>
      <Box
        className='text-gradient'
        bg={linearGradient}
        bgClip='text'
        w={width}
        h='max'
        p={6}
        zIndex={10}
        alignItems='center'
        justifyContent='center'
        borderRadius={2}>
        {label}
      </Box>
    </Button>
  );
};

export default GradientBorderButton;
