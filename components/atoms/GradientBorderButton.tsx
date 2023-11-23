import styled from '@emotion/styled';
import { Box, Button } from '@raidguild/design-system';

const GradientBorderButton = ({
  label,
  color1 = '#ca2c8c',
  color2 = '#8b1dba',
  color3 = '#8021b8',
  width = '150px',
  onClick,
  ref,
}: {
  label: string;
  color1?: string;
  color2?: string;
  color3?: string;
  width?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  ref?: React.Ref<HTMLButtonElement>;
}) => {
  const linearGradient = `linear-gradient(96deg, ${color1} -44.29%, ${color2} 53.18%, ${color3} 150.65%)`;
  const CustomButton = styled(Button)`
    --border-width: 2px;
    --border-radius: 2px;
    --color-1: ${color1};
    --color-2: ${color2};
    --color-3: ${color3};

    font-weight: bold;
    letter-spacing: 1px;
    color: #ddd;
    width: ${width};
    position: relative;
    background: ${linearGradient}, ${linearGradient};
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

  return (
    <CustomButton
      variant='link'
      _hover={{ textDecor: 'none', bgColor: '#00000040' }}
      height={10}
      onClick={onClick}
      ref={ref}>
      <Box bg={linearGradient} bgClip='text'>
        {label}
      </Box>
    </CustomButton>
  );
};

export default GradientBorderButton;
