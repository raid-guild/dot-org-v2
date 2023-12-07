import { Box, Button } from '@raidguild/design-system';
import tokens from '../../utils/extendedTokens';

const GradientConnectButton = ({
  label,
  color1 = '#ca2c8c',
  color2 = '#8b1dba',
  color3 = '#8021b8',
  gradient = tokens.orangeToPurpleGradient,
  width = '150px',
  onClick,
}: {
  label?: string;
  color1?: string;
  color2?: string;
  color3?: string;
  gradient?: string;
  width?: string;
  onClick?: () => void;
}) => (
  <Button
    height={10}
    minW='max-content'
    borderRadius={2}
    bgGradient={gradient}
    onClick={onClick}
    sx={{
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
      borderImageSource: `${gradient}`,
      '&:hover': {
        span: {
          right: '-36px',
          opacity: 1,
          transform: 'rotate(45deg)',
          svg: {
            opacity: 1,
          },
        },
      },
    }}
    _hover={{
      width: `${width}`,
      background: `linear-gradient(96deg, ${color1} -44.29%, ${color2} 53.18%, ${color3} 150.65%)`,
      backgroundClip: 'text',
      border: '3px solid',
      borderColor: 'transparent',
      backgroundOrigin: 'border-box',
      borderImageSlice: 1,
      borderImageSource: `linear-gradient(96deg, ${color1} -44.29%, ${color2} 53.18%, ${color3} 150.65%)`,
    }}>
    <Box
      as='span'
      sx={{
        position: 'absolute',
        right: 0,
        top: -0.5,
        opacity: 0,
        width: '40px',
        height: '40px',
        border: '3px solid',
        borderColor: 'transparent',
        backgroundOrigin: 'border-box',
        transform: 'rotate(45deg)',
        transition: 'all .35s',
        borderImageSlice: 1,
        borderImageSource: `linear-gradient(96deg, ${color1} -44.29%, ${color2} 53.18%, ${color3} 150.65%)`,
      }}>
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
            <stop offset='0%' style={{ stopColor: `${color1}`, stopOpacity: 1 }} />
            <stop offset='50%' style={{ stopColor: `${color2}`, stopOpacity: 1 }} />
            <stop offset='100%' style={{ stopColor: `${color3}`, stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        <path d='M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4' />
      </Box>
    </Box>
    {label || 'Connect'}
  </Button>
);

export default GradientConnectButton;
