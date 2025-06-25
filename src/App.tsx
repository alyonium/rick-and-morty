import "./App.css";
import AppRouter from "./router/AppRouter.tsx";
import { BrowserRouter } from "react-router-dom";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/material";
import { green, yellow } from "@mui/material/colors";
import { CssBaseline } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: green[500],
    },
    secondary: {
      main: yellow[500],
    },
    background: {
      default: "#14181b",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter basename="/">
        <CssBaseline />
        <AppRouter />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
