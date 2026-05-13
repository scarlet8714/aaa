import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";

import { createTheme, MantineProvider } from "@mantine/core";
import { Routes, Route, HashRouter } from "react-router-dom";
import Home from "./pages/Home";
import { Login } from "./pages/Login";
import Container from "./components/Container";
import CreateAccount from "./pages/CreateAccount";

const theme = createTheme({
  /** Put your mantine theme override here */
});

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <HashRouter>
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/createaccount" element={<CreateAccount />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<CreateAccount />} />
          </Routes>
        </Container>
      </HashRouter>
    </MantineProvider>
  );
}
