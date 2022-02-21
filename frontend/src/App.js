import './App.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
import LandingPage from "./screens/LandingPage";
import MyRecommendations from "./screens/MyRecommendations";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: "#0010eb",
    },
    secondary: {
      light: "#dbdbdb",
      main: "#D3D3D3",
      dark: "#939393"
    },
    error: {
      main: '#ff0033'
    }
  },
});

const App = () => (
  <ThemeProvider theme={theme}>
    <Router>
        <Header />
          <Routes>
            <Route path="/" element={<LandingPage />} exact/>
            <Route path='/myrecommendations' element={<MyRecommendations />} exact/>
            <Route path='/login' element={<LoginScreen />} exact/>
            <Route path='/signup' element={<SignupScreen />} exact/>
          </Routes>
        <Footer />
    </Router>
  </ThemeProvider>
)

export default App;
