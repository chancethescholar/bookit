import './App.css';
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import LandingPage from "./screens/LandingPage";
import MyRecommendations from "./screens/MyRecommendations";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => (
  <Router>
      <Header />
        <Routes>
          <Route path="/" element={<LandingPage />}/>
          <Route path='/myrecommendations' element={<MyRecommendations />} exact/>
        </Routes>
      <Footer />
  </Router>
)

export default App;
