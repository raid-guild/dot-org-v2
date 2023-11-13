import React from 'react';
import { Button } from '@raidguild/design-system';
import tokens from '../../utils/extendedTokens';

const GradientButton = ({
  children,
  gradient = tokens.orangeToPurpleGradient,
  width = '120px',
}: {
  children: React.ReactNode;
  gradient?: string;
  width?: string;
}) => {
  return (
    <Button
      bgGradient={gradient}
      borderRadius={2}
      width={width}
      justifyItems='center'
      transition='all 100ms ease-in-out'
      shadow='none'
      alignItems='center'
      _hover={{
        bgGradient: tokens.purpleToOrangeGradient,
        shadow: 'none',
      }}>
      {children}
    </Button>
  );
};

export default GradientButton;
