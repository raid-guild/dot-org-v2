export const Button = {
  // Styles for the base style
  baseStyle: {},
  // Styles for the size variations
  sizes: {},
  // Styles for the visual style variations
  variants: {
    primary: {
      height: 'auto',
      display: 'block',
      fontFamily: 'spaceMono',
      fontSize: '1.6rem',
      fontWeight: 'bold',
      letterSpacing: '1.2px',
      textTransform: 'uppercase',
      color: 'white',
      bg: 'red',
      border: 'none',
      borderRadius: '3px',
      padding: '12px',
      _hover: {
        cursor: 'pointer',
        bg: 'blackDark',
        color: 'red'
      }
    }
  },
  // The default `size` or `variant` values
  defaultProps: {}
};
