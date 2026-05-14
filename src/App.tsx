import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";

import { createTheme, MantineProvider } from "@mantine/core";
import { Routes, Route, HashRouter } from "react-router-dom";
import Home from "./pages/Home";
import { Login } from "./pages/Login";
import Container from "./components/Container";
import CreateAccount from "./pages/CreateAccount";
import { Notifications } from "@mantine/notifications";
import Layout from "./pages/Layout";
import UserPage from "./pages/UserPage";

const theme = createTheme({
  /** Put your mantine theme override here */
});

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <Notifications autoClose={2500} />
      <HashRouter>
        <Container>
          <Routes>
            <Route path="/" element={<Layout />}>
              {/* 以下是子路由，它們會顯示在 Layout 的 Outlet 位置 */}
              <Route index element={<Home />} /> {/* index 代表預設路徑 / */}
              <Route path="/userinfo" element={<UserPage />} />{" "}
              {/* index 代表預設路徑 / */}
              {/* <Route path="dashboard" element={<Dashboard />} /> */}
            </Route>
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/login" element={<Login />} />
            <Route path="/createaccount" element={<CreateAccount />} />
            <Route path="/register" element={<CreateAccount />} />
          </Routes>
        </Container>
      </HashRouter>
    </MantineProvider>
  );
}
