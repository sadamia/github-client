import React from "react";
import { styled, CSS } from "../../theme";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import Flex from "../flex/Flex";

const StyledOverlay = styled(DialogPrimitive.Overlay, {
  backgroundColor: "#081d22e6",
  position: "fixed",
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  userSelect: "none",
  transition: "opacity .6s ease",
  "@sm": {
    backgroundColor: "none",
  },
  zIndex: "$1",
});

const StyledContent = styled(DialogPrimitive.Content, {
  backgroundColor: "white",
  borderRadius: "$4px",
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: "calc(100% - 0.25rem)",
  maxWidth: "calc(100% - 0.25rem)",
  boxSizing: "border-box",
  overflowY: "auto",
  zIndex: "$2",

  willChange: "transform",

  "&:focus": {
    outline: "none",
  },
  "@sm": {
    minWidth: "650px",
    maxHeight: "85vh",
  },
  "@lg": {
    minWidth: "900px",
    minHeight: "auto",
  },
  variants: {
    size: {
      default: {
        "@lg": {
          minWidth: "650px",
        },
      },
      large: {
        maxWidth: "900px",
      },
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export const DialogBody = styled("div", {
  boxSizing: "border-box",
  display: "flex",
  flexFlow: "row wrap",
});

export const DialogHeader = styled("div", {
  position: "sticky",
  top: 0,
  zIndex: "$4",
  background: "white",
  boxSizing: "border-box",
  display: "flex",
  flexFlow: "row wrap",
  padding: "5px 0",
  borderBottom: "solid 1px $lightAsphalt",
  boxShadow: "0 5px 5px -5px rgba(21, 29, 34, 0.08)",
  variants: {
    type: {
      headerAndFooter: {
        boxShadow: "none",
        borderBottom: "none",
      },
    },
  },
});

export const DialogFooter = styled(Flex, {
  position: "sticky",
  background: "white",
  bottom: "0",
  padding: "20px 0",
  width: "$full",
  "& button": {
    marginInline: "14px",
  },
  defaultVariants: {
    justify: "center",
  },
});

const StyledCloseButtonPosition = styled(DialogPrimitive.Close, {
  all: "unset",
  position: "absolute",
  cursor: "pointer",
  top: "1.25rem",
  left: "12px",
  display: "flex",
  flexFlow: "column",
  alignItems: "center",
  justifyContent: "center",
});

type DialogContentPrimitiveProps = React.ComponentProps<
  typeof DialogPrimitive.Content
>;
type DialogContentProps = DialogContentPrimitiveProps & { css?: CSS };

export const DialogContent = React.forwardRef<
  React.ElementRef<typeof StyledContent>,
  DialogContentProps
>(({ children, ...props }, forwardedRef) => (
  <StyledContent {...props} ref={forwardedRef}>
    {children}
  </StyledContent>
));

DialogContent.displayName = "DialogContent";

export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;
export const DialogCloseIcon = StyledCloseButtonPosition;

const StyledTitle = styled(DialogPrimitive.Title, {
  fontFamily: "$primary",
  fontSize: "1rem",
  fontWeight: "$semiBold",
  lineHeight: 1.5,
  letterSpacing: "1px",
  textAlign: "center",
  color: "#2A333D",
  textTransform: "lowercasae",
  boxSizing: "border-box",
  width: "$full",
});

const StyledDescription = styled(DialogPrimitive.Description, {
  fontFamily: "$primary",
  fontSize: "16px",
  fontWeight: "$medium",
  fontStretch: "normal",
  fontStyle: "normal",
  lineHeight: 1.5,
  letterSpacing: "0.3px",
  textAlign: "center",
  color: "#36424F",
  paddingTop: "0.5rem",
  width: "$full",
  zIndex: "$4",
});

export const DialogTitle = StyledTitle;
export const DialogDescription = StyledDescription;

type DialogProps = React.ComponentProps<typeof DialogPrimitive.Root> & {
  children?: React.ReactNode;
};

export function Dialog({ children, ...props }: DialogProps) {
  return (
    <DialogPrimitive.Root {...props}>
      <StyledOverlay />
      {children}
    </DialogPrimitive.Root>
  );
}

