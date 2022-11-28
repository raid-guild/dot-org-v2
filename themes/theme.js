import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

const breakpoints = createBreakpoints({
  base: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
});

export const theme = extendTheme({
  colors: {
    transparent: "transparent",
    blackDark: "rgba(10, 10, 10, 1)",
    blackLight: "#2b2c34",
    blackLighter: "#16161a",
    greyLight: "#a7a9be",
    greyDark: "#4a4a4a",
    white: "#fffffe",
    purple: "#822EA6",
    purpleLight: "#B66AD6",
    red: "#ff3864",
    yellow: "#F2E857",
    yellowDark: "#DCCF11",
  },
  fonts: {
    texturina: `'Texturina', serif`,
    jetbrains: `'JetBrains Mono', monospace`,
    rubik: `'Rubik Mono One', sans-serif`,
    uncial: `'Uncial Antiqua', cursive`,
    spaceMono: `'Space Mono', monospace;`,
  },
  shadows: {
    outline: `0 0 0 3px #F2E857`,
  },
  components: {
    Select: {
      defaultProps: {
        focusBorderColor: "#F2E857",
      },
    },
    Input: {
      defaultProps: {
        focusBorderColor: "#F2E857",
      },
    },
  },
  breakpoints,
});
