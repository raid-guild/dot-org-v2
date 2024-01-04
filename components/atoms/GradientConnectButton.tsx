import { Box, Button, ChakraButtonProps } from '@raidguild/design-system';
import tokens from '../../utils/extendedTokens';

const linearGradient = tokens.orangeToPurpleGradient;

const commonButtonStyles = {
  position: 'relative',
  display: 'block',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center',
  color: '#ddd',
  textTransform: 'uppercase',
  letterSpacing: '1px',
  transition: 'all .35s',
  border: '3px solid',
  borderImageSlice: 1,
};

const hoverStyles = (width = '150px') => ({
  background: `${linearGradient}`,
  backgroundClip: 'text',
  borderColor: 'transparent',
  backgroundOrigin: 'border-box',
  borderImageSource: `${linearGradient}`,
  width: `${width}`,
});

const GradientSVG = () => (
  <Box
    as='svg'
    viewBox='0 0 24 24'
    xmlns='http://www.w3.org/2000/svg'
    sx={{
      opacity: 0,
      stroke: 'url(#gradient)',
      strokeWidth: '2.5',
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      height: '24px',
      width: '24px',
      position: 'absolute',
      top: 'calc(50% - 12px)',
      left: 'calc(50% - 12px)',
      transform: 'rotate(0deg)',
      fill: 'none',
      transition: 'all .35s',
    }}>
    <defs>
      <linearGradient id='gradient' x1='0%' y1='0%' x2='100%' y2='0%'>
        <stop offset='0%' style={{ stopColor: linearGradient, stopOpacity: 1 }} />
        <stop offset='50%' style={{ stopColor: linearGradient, stopOpacity: 1 }} />
        <stop offset='100%' style={{ stopColor: linearGradient, stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <path d='M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4' />
  </Box>
);

const GradientConnectButton = ({ children, onClick }: ChakraButtonProps) => (
  <Button
    height={10}
    minW='max-content'
    borderRadius={2}
    bgGradient={linearGradient}
    onClick={onClick}
    sx={{
      ...commonButtonStyles,
      borderImageSource: `${linearGradient}`,
      '&:hover': hoverStyles(linearGradient),
    }}>
    <Box
      as='span'
      sx={{
        right: 0,
        top: -0.5,
        opacity: 0,
        width: '40px',
        height: '40px',
        ...commonButtonStyles,
        borderColor: 'transparent',
        transform: 'rotate(45deg)',
        borderImageSource: `${linearGradient}`,
      }}>
      <GradientSVG />
    </Box>
    {children || 'Connect'}
  </Button>
);

export default GradientConnectButton;
