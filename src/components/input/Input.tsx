import React from 'react';
import { styled, CSS, VariantProps } from '../../theme';

const DEFAULT_TAG = 'input';

const StyledInput = styled(DEFAULT_TAG, {
  appearance: 'none',
  borderWidth: '0',
  boxSizing: 'border-box',
  fontFamily: '$primary',
  margin: '0',
  outline: 'none',
  width: '100%',

  WebkitTapHighlightColor: 'rgba(0,0,0,0)',
  '&::before': {
    boxSizing: 'border-box',
  },
  '&::after': {
    boxSizing: 'border-box',
  },

  WebkitTextSizeAdjust: "100%",
  WebkitFontSmoothing: "antialiased",
  overflow: "visible",
  verticalAlign: "baseline",
  fontSize: "$sm",
  fontWeight: '$regular',
  lineHeight: '$short',
  color: "#2A333D",
  borderRadius: "$4px",
  border: "solid 1px #A0BCDB",
  backgroundColor: "white",
  opacity: 1,

  '&:focus': {
    borderColor: "#A0BCDB",
    boxShadow: 'rgb(49 130 206) 0px 0px 0px 1px',
    '&:-webkit-autofill': {

    },
  },
  '&:active': {
    borderColor: "#A0BCDB",
    boxShadow: "none",
  },
  '&::placeholder': {
    fontSize: "$sm",
  },
  '&:disabled': {
    backgroundColor: "white",
    borderColor: "#A0BCDB",
    boxShadow: "none",
    color: "#bec3c5",
    pointerEvents: 'none',
    '&::placeholder': {
      color: '#A3ACB8',
    },
  },

  variants: {
    size: {
      small: {
        padding: "0.5rem 1rem",
      },
      large: {
        padding: "0.5rem 2rem",
      },
    },
    state: {
      invalid: {
        border: "1px solid #c73b0d"
      },
    }
  },
  defaultVariants: {
    size: 'small',
  },
});

type InputCSSProp = { css?: CSS };
type InputVariants = Omit<VariantProps<typeof StyledInput>, 'size'>;
export type InputOwnProps = InputCSSProp & InputVariants &
{
  size?: any,
  placehoder?: string
  value?: string
  placeholder?: string
  validation?: any
  type?: string,
  role?: string, 
};


export const Input = React.forwardRef<
  React.ElementRef<typeof StyledInput>, InputOwnProps
>((props, forwardedRef) => {
  return (
    <StyledInput
      {...props.validation}
      size={props.size}
      role={props.role}
      value={props.value}
      placeholder={props.placeholder}
      type={props.type || 'text'}
    />
  );
});

Input.toString = () => `.${StyledInput.className}`;