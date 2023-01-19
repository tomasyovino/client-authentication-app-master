import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProfileScreen, LoginScreen, RegisterScreen } from "./screens";
import forms from "./data/forms.json";
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<ProfileScreen />} />
        <Route path="/login" element={<LoginScreen loginForm={forms.loginForm} />} />
        <Route path="/register" element={<RegisterScreen registerForm={forms.registerForm} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
