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

  return (
    <Button
      variant='link'
      _hover={{
        textDecor: 'none',
        _before: { content: 'none' },
        _after: { content: 'none' },
        backgroundSize: '100%',
        '.text-gradient': { bgClip: 'initial', textColor: '#fff' },
      }}
      height={10}
      onClick={onClick}
      ref={ref}
      _before={borderStyle('left', color1)}
      _after={borderStyle('right', color3)}
      sx={commonStyle}>
      <Box
        className='text-gradient'
        bg={linearGradient}
        bgClip='text'
        w='100%'
        h='100%'
        padding='7px 24px'
        borderRadius={2}>
        {label}
      </Box>
    </Button>
  );
};

export default GradientBorderButton;
