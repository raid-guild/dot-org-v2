export const Button = {
  // Styles for the base style
  baseStyle: {},
  // Styles for the size variations
  sizes: {},
  // Styles for the visual style variations
  variants: {
    primary: {
      minWidth: '160px',
      height: '50px',
      fontFamily: 'spaceMono',
      textTransform: 'uppercase',
      color: 'black',
      borderRadius: '2px',
      background:
        'linear-gradient(94.89deg, #FF5A00 0%, #D62789 70.2%, #AD17AD 100%)',
      paddingLeft: '24px',
      paddingRight: '24px'
    },
    secondary: {
      minWidth: '160px',
      height: '50px',
      fontFamily: 'spaceMono',
      textTransform: 'uppercase',
      border: '2px solid',
      borderRadius: '3px',
      borderImageSlice: 1,
      borderImageSource:
        'linear-gradient(95.58deg, #FF3864 0%, #8B1DBA 53.65%, #4353DF 100%)',
      background:
        'linear-gradient(96.18deg, #FF3864 -44.29%, #8B1DBA 53.18%, #4353DF 150.65%);',
      backgroundClip: 'text',
      paddingLeft: '24px',
      paddingRight: '24px'
    }
  },
  // The default `size` or `variant` values
  defaultProps: {}
};
