
import { createStitches } from '@stitches/react';
import type * as Stitches from '@stitches/react';

export const stitches = createStitches({
  prefix: '',
  media: {
    xs: '(min-width: 320px)',
    sm: '(min-width: 640px)',
    md: '(min-width: 768px)',
    lg: '(min-width: 1024px)',
    xl: '(min-width: 1280px)',
    motionSafe: '(prefers-reduced-motion: no-preferance)',
  },  
  theme: {
    lineHeights: {
      normal: 'normal',
      none: '1',
      shorter: '1.25',
      short: '1.375',
      base: '1.5',
      tall: '1.625',
      taller: '2',
      tallest: '2.2',
      3: '.75rem',
      4: '1rem',
      5: '1.25rem',
      6: '1.5rem',
      7: '1.75rem',
      8: '2rem',
      9: '2.25rem',
      10: '2.5rem',
    },
    fontWeights: {
      regular: 400,
      semiBold: 600,
      bold: 700,
    },
    fonts: {
      primary: '-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"'
    },
    letterSpacings: {
      1: "0.01625rem",
      2: '0.23px',
      3: '0.26px',
      4: '0.3px',
      5: '0.36px',
      6: '0.48px',
      7: '0.64px',
      8: '1px',
    },
    space: {

    },
    sizes: {
 
      full: '100%',
    },
    fontSizes: {
      xs: '0.75rem',
      sm: '0.875rem',
      md: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2rem',
      '5xl': '2.25rem',
      '6xl': '3rem',
      '7xl': '3.75rem',
      '8xl': '4.5rem',
      '9xl': '6rem',
      '10xl': '8rem',
    },
    zIndices: {
      1: '1',
      2: '2',
      3: '99',
      4: '999',
      max: '99999999',
    },
    radii: {
      none: '0',
      '2px': '2px',
      '4px': '4px',
      '5px': '5px',
      '6px': '6px',
      '8px': '8px',
      'round': '50%',
      full: '9999px',
    },
    colors: {
      blueCrayola: '#0077FF',
    },
  },
  utils: {
    m: (value: any) => ({
      marginTop: value,
      marginBottom: value,
      marginLeft: value,
      marginRight: value,
    }),
    mt: (value: any) => ({
      marginTop: value,
    }),
    mr: (value: any) => ({
      marginRight: value,
    }),
    mb: (value: any) => ({
      marginBottom: value,
    }),
    ml: (value: any) => ({
      marginLeft: value,
    }),
    mx: (value: any) => ({
      marginLeft: value,
      marginRight: value,
    }),
    my: (value: any) => ({
      marginTop: value,
      marginBottom: value,
    }),
    px: (value: any) => ({
      paddingLeft: value,
      paddingRight: value,
    }),
    py: (value: any) => ({
      paddingTop: value,
      paddingBottom: value,
    }),
    p: (value: any) => ({
      paddingTop: value,
      paddingBottom: value,
      paddingLeft: value,
      paddingRight: value,
    }),
    pt: (value: any) => ({
      paddingTop: value,
    }),
    pr: (value: any) => ({
      paddingRight: value,
    }),
    pb: (value: any) => ({
      paddingBottom: value,
    }),
    pl: (value: any) => ({
      paddingLeft: value,
    }),
    size: (value: any) => ({
      width: value,
      height: value,
    }),
    linearGradient: (value: any) => ({
      backgroundImage: `linear-gradient({value})`,
    }),
    br: (value: any) => ({
      borderRadius: value,
    }),
    fullWidth: (value: any) => ({
      width: "100vw",
      position: "relative",
      left: "50%",
      right: "50%",
      marginLeft: "-50vw",
      marginRight: "-50vw"
    }),
  }
});

export type CSS = Stitches.CSS<typeof config>
export type { VariantProps } from '@stitches/react';

export const { styled, css, keyframes, config, globalCss } = stitches;