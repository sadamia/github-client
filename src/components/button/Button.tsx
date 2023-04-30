import React, { ReactNode } from 'react';
import { styled, CSS, VariantProps } from '../../theme';

const ButtonBase = styled('button', {
  lineHeight: '$normal',
  display: 'inline-flex',
  appearance: 'none',
  alignItems: 'center',
  cursor: 'pointer',
  justifyContent: 'center',
  position: 'relative',
  fontWeight: '$normal',
  fontFamily: '$primary',
  whiteSpace: 'nowrap',
  borderRadius: '$6px',
  fontSize: '15px',
  border: '0',
  WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
  WebkitTextSizeAdjust: '100%',
  WebkitFontSmoothing: 'antialiased',
  boxSizing: 'border-box',
  outline: 'none',
  WebkitAppearance: 'button',
  verticalAlign: 'baseline',
  textDecoration: 'none',
  letterSpacing: '1px',
  textAlign: 'center',
  boxShadow: 'none',
  [`& svg`]: {
    display: 'inline-block',
    verticalAlign: 'middle',
    height: '$6',
    fontFamily: '$primary',
    fill: 'white',
    '&:hover': {
      '& span': {
        color: 'white'
      },
      '& svg': {
        color: 'white'
      }
    }
  },
  variants: {
    variant: {
      primary: {
        fontWeight: '$regular',
        color: 'white',
        backgroundColor: '$blueCrayola',
        border: '1px solid $blueCrayola',
        boxShadow: 'none',
        '&:hover': {
          color: '#fff',
          backgroundColor: '#0064d8',
          borderColor: '#0064d8'
        },
        '&:focus': {
          color: "#fff",
          backgroundcolor: "#e4f0fe",
          bordercolor: "#e4f0fe",
          boxShadow: "0 0 0 3px #caccd0"
        },
        '&:active': {
          color: "#fff",
          backgroundColor: '#0058bf',
          borderColor: "#0058bf",
        },
        [`& svg`]: {
          fill: 'white',
        },
      },
      secondary: {
        fontWeight: '$regular',
        color: '$ebony',
        backgroundColor: 'white',
        border: '1px solid #A0BCDB',
        boxShadow: 'none',
        '&:hover': {
          backgroundColor: '#e4f0fe',
        },
        '&:focus': {
          boxShadow: "0 0 0 3px #4299e199"
        },
        '&:active': {

        },
        [`& svg`]: {
          fill: '#0071F3',
        },
      },
      link: {
        padding: 0,
        cursor: "pointer",
        WebkitAppearance: "button",
        whiteSpace: "nowrap",
        verticalAlign: "middle",
        textDecoration: "none",
        fontFamily: "$primary",
        fontWeight: '$regular',
        fontSize: '$xs',
        color: "#07f",
        lineHeight: '$tallest',
        outline: "none",
        display: "inline-flex",
        border: "none",
        backgroundColor: "transparent",
        boxShadow: "none",
        textTransform: "none",
        minWidth: 'auto',
        "&:hover": {
          textDecoration: 'underline',
        },
        "&:active": {
          textDecoration: 'underline',
        },
        "&:focus": {
        }
      },      
    },
    size: {
      default: {
        paddingTop: '0.5rem',
        paddingBottom: '0.5rem',
        paddingLeft: '1rem',
        paddingRight: '1rem',
      },
      compact: {
        paddingTop: "0.5rem",
        paddingBottom: "0.5rem",
        paddingLeft: "0.5rem",
        paddingRight: "0.5rem"
      },
      square: {
        background: '#F7FBFF',
        paddingTop: "0.5rem",
        paddingBottom: "0.5rem",
        paddingLeft: "0.5rem",
        paddingRight: "0.5rem",
        [`& svg`]: {
          margin: '0',
        }
      }
    },
    full: {
      true: {
        width: '$full',
        paddingTop: "0.5rem",
        paddingBottom: "0.5rem",
        paddingLeft: "1rem",
        paddingRight: "1rem"
      },
    },
    iconLeft: {
      true: {},
    },
    iconRight: {
      true: {},
    },
    isDisabled: {
      true: {
        color: '#a3a1a1',
        opacity: '0.8',
        userSelect: 'none',
        border: 'solid 1px #e4f0fe',
        fontWeight: '$regular',
        cursor: 'not-allowed',
        [`& svg`]: {
          opacity: .4,
        },
        '&:hover': {
          color: '#b1b1b1',
        }
      }
    }
  },
  compoundVariants: [
    {
      size: 'default',
      iconLeft: 'true',
      css: {
        [`& svg`]: {
          marginRight: '0.625rem',
        },
      },
    },
    {
      size: 'compact',
      iconLeft: 'true',
      css: {
        [`& svg`]: {
          marginRight: '0.625rem',
        },
      },
    },
    {
      size: 'default',
      iconRight: 'true',
      css: {
        [`& svg`]: {
          marginLeft: '0.625rem',
        },
      },
    },    
    {
      size: 'compact',
      iconRight: 'true',
      css: {
        [`& svg`]: {
          marginLeft: '0.625rem',
        },
      },
    },
    {
      variant: 'secondary',
      size: 'square',
      isDisabled: 'true',
      css: {
        '&:hover': {
          backgroundColor: '#f7fbff'
        }
      }
    }
  ],
  defaultVariants: {
    variant: 'primary',
    size: 'default'
  }
})

type ButtonCSSProp = { css?: CSS };
type ButtonVariants = VariantProps<typeof ButtonBase> &
{
  leftPart?: ReactNode;
  rightPart?: ReactNode;
  children?: ReactNode;
  onClick?: () => void;
  name?: string
  role?: string
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
  disabled?: boolean;
};
type ButtonOwnProps = ButtonCSSProp & ButtonVariants;

const Button = React.forwardRef<
  React.ElementRef<typeof ButtonBase>, ButtonOwnProps>(
    ({ leftPart, rightPart, children, ...restProps }, forwardedRef) => {

      return <ButtonBase
        isDisabled={restProps.disabled}
        {...restProps}
      >
        {leftPart}
        {children}
        {rightPart}
      </ButtonBase>;
    });

Button.toString = () => `.${ButtonBase}`;

export default Button;
