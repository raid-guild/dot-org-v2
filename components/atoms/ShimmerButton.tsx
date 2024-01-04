import { keyframes } from '@emotion/react';
import { Button, ChakraButtonProps } from '@raidguild/design-system';
import React from 'react';

interface ShimmerButtonProps extends ChakraButtonProps {
  children: React.ReactNode;
}

const gradient = 'linear-gradient(96deg, #FF3864 0%, #8B1DBA 71.35%)';
const midGradient = 'linear-gradient(166deg, #FF3864 0%, #8B1DBA 71.35%)';
const rotateGradient = 'linear-gradient(246deg, #FF3864 0%, #8B1DBA 71.35%)';

// Keyframe animations
const rotateAnimation = keyframes`
  0% { border-image-source: ${gradient}; }
  33% { border-image-source: ${midGradient}; }
  66% { border-image-source: ${rotateGradient};}
  100% { border-image-source: ${gradient};}
`;

const ShimmerButton = ({ children, ...props }: ShimmerButtonProps) => {
  return (
    <Button
      variant='gradientOutline'
      minW='max-content'
      _hover={{
        animation: `${rotateAnimation} 2s ease-in-out infinite`,
        bgClip: 'text',
        color: 'transparent',
      }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}>
      {children}
    </Button>
  );
};

export default ShimmerButton;
