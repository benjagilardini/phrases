import { createTheme } from "@mui/material/styles";
import { grey } from "@mui/material/colors";

const beige = {
  50: "#F9F6F1",
  100: "#F4EFE7",
  200: "#EEE7DC",
  300: "#E7DECF",
  400: "#E1D6C4",
  500: "#D8C9B3",
  600: "#CBB99F",
  700: "#BBA888",
  800: "#A89673",
  900: "#8C7B5D",
};

const primaryMain = "#A89981";
const primaryLight = "#C8B79C";
const primaryDark = "#7B6F5A";
const secondaryMain = grey[700];

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: primaryMain,
      light: primaryLight,
      dark: primaryDark,
      contrastText: "#ffffff",
    },
    secondary: {
      main: secondaryMain,
      light: grey[500],
      dark: grey[800],
      contrastText: "#ffffff",
    },
    background: {
      default: beige[100],
      paper: "#ffffff",
    },
    text: {
      primary: grey[900],
      secondary: grey[700],
      disabled: grey[500],
    },
    divider: "rgba(0,0,0,0.08)",
    grey,
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily:
      'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 700 },
    h5: { fontWeight: 700 },
    h6: { fontWeight: 700 },
    button: { textTransform: "none", fontWeight: 600 },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: beige[100],
          color: grey[900],
          scrollbarColor: `${grey[400]} ${beige[100]}`,
        },
        "*::-webkit-scrollbar": { height: 10, width: 10 },
        "*::-webkit-scrollbar-thumb": {
          backgroundColor: grey[300],
          borderRadius: 8,
          border: `2px solid ${beige[100]}`,
        },
        "*::-webkit-scrollbar-track": {
          backgroundColor: beige[100],
        },
      },
    },
    MuiAppBar: {
      defaultProps: { elevation: 0, color: "transparent" },
      styleOverrides: {
        root: {
          backgroundColor: "#ffffff",
          borderBottom: "1px solid rgba(0,0,0,0.06)",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: "1px solid rgba(0,0,0,0.06)",
          boxShadow:
            "0 1px 2px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.04)",
        },
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
        contained: {
          backgroundColor: primaryMain,
          "&:hover": { backgroundColor: primaryDark },
        },
        outlined: {
          borderColor: grey[400],
          "&:hover": { borderColor: grey[600], backgroundColor: beige[50] },
        },
        text: {
          "&:hover": { backgroundColor: beige[200] },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          "&:hover": { backgroundColor: beige[200] },
        },
      },
    },
    MuiTextField: {
      defaultProps: { size: "small", variant: "outlined" },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: "#fff",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(0,0,0,0.15)",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(0,0,0,0.35)",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: primaryMain,
            boxShadow: `0 0 0 2px ${primaryLight}44`,
          },
        },
        input: {
          "::placeholder": { opacity: 0.7 },
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: { borderColor: "rgba(0,0,0,0.08)" },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { backgroundColor: beige[200] },
      },
    },
  },
});

export default theme;
