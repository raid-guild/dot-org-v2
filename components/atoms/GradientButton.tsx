import { Box, Button } from '@raidguild/design-system';
import styled from '@emotion/styled';
import tokens from '../../utils/extendedTokens';

const CustomButton = styled(Button)`
  --border-width: 2px;
  --border-radius: 2px;
  --color-1: #ca2c8c;
  --color-2: #8021b8;

  font-weight: bold;
  letter-spacing: 1px;
  color: #ddd;
  width: 120px;
  position: relative;
  background: linear-gradient(96deg, #ff3864 -44.29%, #8b1dba 53.18%, #8021b8 150.65%),
    linear-gradient(96deg, #ff3864 -44.29%, #8b1dba 53.18%, #8021b8 150.65%);
  background-position: var(--border-radius) 0, var(--border-radius) 100%;
  background-repeat: no-repeat;
  background-size: calc(100% - var(--border-radius) - var(--border-radius)) var(--border-width);
  padding: 14px 24px;
  border-radius: var(--border-radius);
  border: none;
  background-color: transparent;

  ::before,
  ::after {
    content: '';
    display: block;
    position: absolute;
    width: var(--border-radius);
    top: 0;
    bottom: 0;
  }

  ::before {
    left: 0;
    border: var(--border-width) solid var(--color-1);
    border-top-left-radius: var(--border-radius);
    border-bottom-left-radius: var(--border-radius);
    border-right-color: transparent;
  }

  ::after {
    right: 0;
    border: var(--border-width) solid var(--color-2);
    border-top-right-radius: var(--border-radius);
    border-bottom-right-radius: var(--border-radius);
    border-left-color: transparent;
  }
`;

const GradienButton = ({ label }: { label: string }) => {
  return (
    <CustomButton variant='link' _hover={{ textDecor: 'none' }} height={10}>
      <Box bg={tokens.purpleToBlueGradient} bgClip='text'>
        {label}
      </Box>
    </CustomButton>
  );
};

export default GradienButton;
