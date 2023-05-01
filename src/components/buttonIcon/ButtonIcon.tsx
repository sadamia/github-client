import React, { ReactNode } from "react";
import { styled, CSS, VariantProps } from "../../theme";

const DEFAULT_TAG = "button";

type ButtonIconCSSProp = { css?: CSS };
type ButtonIconVariants = VariantProps<typeof StyledButtonIcon>;
type ButtonIconOwnProps = ButtonIconCSSProp & ButtonIconVariants & {
  children?: ReactNode;
  onClick?: () => void;
};

const StyledButtonIcon = styled(DEFAULT_TAG, {
  // Reset
  alignItems: "center",
  appearance: "none",
  borderWidth: "0",
  boxSizing: "border-box",
  display: "inline-flex",
  flexShrink: 0,
  fontFamily: "$primary",
  fontSize: "1rem",
  justifyContent: "center",
  lineHeight: "1",
  outline: "none",
  padding: "0",
  textDecoration: "none",
  userSelect: "none",
  WebkitTapHighlightColor: "transparent",
  cursor: "pointer",
  color: "#0071F3",
  backgroundColor: "transparent",
  "&::before": {
    boxSizing: "border-box",
  },
  "&::after": {
    boxSizing: "border-box",
  },
  borderRadius: "4px",
  "&:hover": {
  },
  "&:active": {
    boxShadow: "none"
  },
  "&:focus": {
  },
  "&:disabled": {
    pointerEvents: "none",
  },

  variants: {
    size: {
      "1": {
        height: "24px",
        width: "24px",
      },
    },
  },
  defaultVariants: {
    size: "1",
  },
});


export const ButtonIcon = (props: ButtonIconOwnProps) => {
  return <StyledButtonIcon {...props} />;
};