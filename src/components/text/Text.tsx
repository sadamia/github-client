import { styled } from "../../theme";

export const Text = styled("span", {
  variants: {
    variant: {
      "headings-title-lg-bold-capitalized": {
        fontFamily: "$primary",
        fontSize: "1.625rem",
        fontWeight: "$regular",
        color: "#2A333D",
      },
      "headings-title-default-bold": {
        fontFamily: "$primary",
        fontSize: "$sm",
        fontWeight: "$bold",
        color: "#2d3748",
      },
      "body-default": {
        fontFamily: "$primary",
        fontSize: "1rem",
        fontWeight: "$regular",
        color: "black",
      },
      "body-sm": {
        fontFamily: "$primary",
        fontSize: "0.75rem",
        fontWeight: "$regular",
        color: "black",
      },
      "functional-error": {
        fontFamily: "$primary",
        fontSize: "0.875rem",
        fontWeight: "$regular",
        color: "red",
      },
      
    }
  }
});