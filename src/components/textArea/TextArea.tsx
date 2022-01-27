import React from 'react';
import { styled, CSS, VariantProps } from '../../theme';

const DEFAULT_TAG = 'textarea';

const StyledTextArea = styled(DEFAULT_TAG, {
  appearance: 'none',
  borderWidth: '0',
  boxSizing: 'border-box',
  fontFamily: '$primary',
  margin: '0',
  outline: 'none',
  width: '100%',
  '&::before': {
    boxSizing: 'border-box',
  },
  '&::after': {
    boxSizing: 'border-box',
  },
  padding: "0.5rem 1rem",

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

  '&:-webkit-autofill': {
    boxShadow: 'inset 0 0 0 1px $colors$blue6, inset 0 0 0 100px $colors$blue3',
  },

  '&:-webkit-autofill::first-line': {
    fontFamily: '$primary',
  },

  '&:focus': {
    borderColor: "#A0BCDB",
    boxShadow: 'rgb(49 130 206) 0px 0px 0px 1px',
    '&:-webkit-autofill': {
      
    },
  },
  '&:hover': {
    borderColor: "#8aaba1",
    boxShadow: "none",
  },
  '&:active': {
    borderColor: "#165260",
    boxShadow: "none",
  },

  '&:disabled': {
    backgroundColor: "white",
    boxShadow: "none",
    color: "#bec3c5",
    pointerEvents: 'none',
    '&::placeholder': {
    },
  },
  '&:read-only': {
    backgroundColor: "white",
    boxShadow: "none",
    color: "#bec3c5",
    pointerEvents: 'none',
    '&::placeholder': {
    },
  },

  variants: {
    state: {
      invalid: {
        border: "1px solid #c73b0d"
      },
    }
  },
});

type TextAreaVariants = VariantProps<typeof StyledTextArea>;
type TextAreaPrimitiveProps = React.ComponentProps<typeof StyledTextArea>;
type TextAreaProps = 
  TextAreaPrimitiveProps & 
  TextAreaVariants & 
  { 
    css?: CSS 
    validation?: any
    name?: string
    size?: any, 
    value?: any, 
    placeholder?: string
    rows?: number
  };

export const TextArea = React.forwardRef<
  React.ElementRef<typeof StyledTextArea>, TextAreaProps>(
    (props, forwardedRef) => {
      return <StyledTextArea
              {...props.validation}
              rows={props.rows}
              placeholder={props.placeholder}
             ></StyledTextArea>;
    }
);

TextArea.toString = () => `.${StyledTextArea.className}`;

