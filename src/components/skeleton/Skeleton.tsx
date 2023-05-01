import { styled, keyframes } from "../../theme";

const pulse = keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: "100%" },
});

export const Skeleton = styled("div", {
  backgroundColor: "#eceef0",
  position: "relative",
  overflow: "hidden",
  borderRadius: "1px",

  "&::after": {
    animationName: `${pulse}`,
    animationDuration: "500ms",
    animationDirection: "alternate",
    animationIterationCount: "infinite",
    animationTimingFunction: "ease-in-out",
    backgroundColor: "#dfe3e6",
    borderRadius: "inherit",
    bottom: 0,
    content: "\"\"",
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
  },

  variants: {
    variant: {
      text: {
        height: "0.25rem",
      },
      title: {
        height: "0.75rem",
      },
    },
  },
  defaultVariants: {
    variant: "text",
  },
});
