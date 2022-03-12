import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home.pages";
import LoginPage from "./pages/login.pages";
import SignupPage from "./pages/signup.pages";
import BaseLayout from "./components/BaseLayout.component";

// fonts
import "@fontsource/amaranth/400.css";
import "@fontsource/amaranth/700.css";

const theme = extendTheme({
  fonts: {
    heading: "Amaranth",
    body: "Amaranth",
  },
});

export const App = () => (
  <ChakraProvider theme={theme}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BaseLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </ChakraProvider>
);
