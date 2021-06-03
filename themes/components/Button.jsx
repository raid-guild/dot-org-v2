export const Button = {
  // Styles for the base style
  baseStyle: {},
  // Styles for the size variations
  sizes: {},
  // Styles for the visual style variations
  variants: {
    spaceMono: {
      height: '50px',
      fontFamily: 'spaceMono',
      color: 'white',
      bg: 'red',
      letterSpacing: '1.2px',
      textTransform: 'uppercase',
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
