import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    biru: {
      50: "#E2F4F6",
      100: "#B6E4EA",
      200: "#89D1DD",
      300: "#64BFD2",
      400: "#4CB2CC",
      500: "#39A5C6",
      600: "#3098BA",
      700: "#2686A8",
      800: "#237495",
      900: "#144457",
    },
  },
  components: {
    Container: {
      baseStyle: {
        maxW: "container.xl",
        height: "100vh",
      },
    },
    Button: {
      variants: {
        solid: {
          color: "white",
          backgroundColor: "biru.800",
        },
      },
    },
  },
});

export default theme;
