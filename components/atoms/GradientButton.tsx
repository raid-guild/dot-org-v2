import React from 'react';
import { Button } from '@raidguild/design-system';
import tokens from '../../utils/extendedTokens';

const GradientButton = ({
  children,
  gradient = tokens.orangeToPurpleGradient,
  width = 'max-content',
  onClick,
  isDisabled,
  isLoading,
  loadingText,
}: {
  children: React.ReactNode;
  gradient?: string;
  width?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  isDisabled?: boolean;
  isLoading?: boolean;
  loadingText?: string;
}) => {
  return (
    <Button
      onClick={onClick}
      bgGradient={gradient}
      borderRadius={2}
      width={width}
      justifyItems='center'
      transition='all 100ms ease-in-out'
      shadow='none'
      alignItems='center'
      isDisabled={isDisabled}
      isLoading={isLoading}
      _hover={{
        bgGradient: tokens.purpleToOrangeGradient,
        shadow: 'none',
      }}>
      {isLoading ? loadingText : children}
    </Button>
  );
};

export default GradientButton;
