import "./App.css";
import React, { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LandingPage from "./screens/LandingPage";
import MyRecommendations from "./screens/MyRecommendations";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import CreateRecommendation from "./screens/CreateRecommendation";
import EditRecommendation from "./screens/EditRecommendation";
import ProfileScreen from "./screens/ProfileScreen";
import BrowseRecommendations from "./screens/BrowseRecommendations";
import UserRecommendations from "./screens/UserRecommendations";
import MyBookmarks from "./screens/MyBookmarks";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0010eb",
    },
    secondary: {
      light: "#dbdbdb",
      main: "#D3D3D3",
      dark: "#939393",
    },
    error: {
      main: "#ff0033",
    },
    info: {
      main: "#000000",
    },
  },
});

const App = () => {
  const [search, setSearch] = useState("");
  console.log(search);
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Header setSearch={setSearch} />
        <Routes>
          <Route path="/" element={<LandingPage />} exact />
          <Route
            path="/myrecommendations"
            element={<MyRecommendations search={search} />}
            exact
          />
          <Route path="/login" element={<LoginScreen />} exact />
          <Route path="/signup" element={<SignupScreen />} exact />
          <Route
            path="/createrecommendation"
            element={<CreateRecommendation />}
            exact
          />
          <Route
            path="/recommendation/:id"
            element={<EditRecommendation />}
            exact
          />
          <Route path="/profile" element={<ProfileScreen />} exact />
          <Route
            path="/allrecommendations"
            element={<BrowseRecommendations search={search} />}
            exact
          />
          <Route
            path="/recommendations/view/:username"
            element={<UserRecommendations search={search} />}
            exact
          />
          <Route
            path="/bookmarks/view/:username"
            element={<MyBookmarks search={search} />}
            exact
          />
        </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  );
};

export default App;
