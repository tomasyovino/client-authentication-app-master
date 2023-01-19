import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProfileScreen, LoginScreen, RegisterScreen } from "./screens";
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<ProfileScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
