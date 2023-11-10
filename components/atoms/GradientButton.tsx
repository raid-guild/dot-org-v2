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
    <Button bgGradient={gradient} borderRadius={2} width={width}>
      {children}
    </Button>
  );
};

export default GradientButton;
