import { styled } from "@stitches/react";

export const BottomPadding = styled("div", {
  padding: "0px 0px 20px",
});

export const Flexbox = styled("div", {
  display: "flex",

  variants: {
    direction: {
      row: {
        flexDirection: "row",
      },
      column: {
        flexDirection: "column",
      },
    },
    align: {
      center: {
        alignItems: "center",
      },
      end: {
        alignItems: "end",
      },
      start: {
        alignItems: "start",
      },
    },
    justify: {
      center: {
        justifyContent: "center",
      },
      end: {
        justifyContent: "end",
      },
      start: {
        justifyContent: "start",
      },
    },
  },

  defaultVariants: {
    direction: "row",
    justify: "center",
    align: "center",
  },
});
