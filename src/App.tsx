// core styles are required for all packages
import "@mantine/core/styles.css";

// other css files are required only if
// you are using components from the corresponding package
// import '@mantine/dates/styles.css';
// import '@mantine/dropzone/styles.css';
// import '@mantine/code-highlight/styles.css';
// ...

import { createTheme, MantineProvider } from "@mantine/core";
import { Routes, Route, Link, HashRouter } from "react-router-dom";
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
          {/* <div className="flex justify-center"> */}
          <nav className="absolute bottom-0">
            <Link to="/">首頁</Link>
            <Link to="/login">登入</Link>
            <Link to="/createaccount">建立帳號</Link>
          </nav>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/createaccount" element={<CreateAccount />} />{" "}
            {/* 捕捉所有未定義路徑 */}
          </Routes>
          {/* </div> */}
        </Container>
      </HashRouter>
    </MantineProvider>
  );
}
