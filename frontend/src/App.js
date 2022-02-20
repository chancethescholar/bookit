import './App.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
import LandingPage from "./screens/LandingPage";
import MyRecommendations from "./screens/MyRecommendations";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: "#0010eb",
    },
    secondary: {
      main: '#ffffff',
    },
  },
});

const App = () => (
  <ThemeProvider theme={theme}>
    <Router>
        <Header />
          <Routes>
            <Route path="/" element={<LandingPage />} exact/>
            <Route path='/myrecommendations' element={<MyRecommendations />} exact/>
          </Routes>
        <Footer />
    </Router>
  </ThemeProvider>
)

export default App;
