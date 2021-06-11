import { extendTheme } from '@chakra-ui/react';

import { Heading } from './components/Heading';
import { Text } from './components/Text';
import { Button } from './components/Button';

export const theme = extendTheme({
  colors: {
    transparent: 'transparent',
    blackDark: 'rgba(10, 10, 10, 0.960784)',
    blackLight: '#2b2c34',
    blackLighter: '#16161a',
    greyLight: '#a7a9be',
    greyDark: '#4a4a4a',
    white: '#fffffe',
    purple: '#822EA6',
    purpleLight: '#B66AD6',
    red: '#ff3864',
    yellow: '#F2E857',
    yellowDark: '#DCCF11'
  },
  fonts: {
    texturina: `'Texturina', serif`,
    jetbrains: `'JetBrains Mono', monospace`,
    rubik: `'Rubik Mono One', sans-serif`,
    uncial: `'Uncial Antiqua', cursive`,
    spaceMono: `'Space Mono', monospace;`
  },
  components: {
    Heading,
    Text,
    Button
  }
});