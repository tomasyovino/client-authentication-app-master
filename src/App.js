import { BrowserRouter, Routes, Route, Navigate  } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import { useSelector } from "react-redux";
import { ProfileScreen, LoginScreen, RegisterScreen } from "./screens";
import './App.css';

const App = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={!user ? <Navigate to="/login" /> : <ProfileScreen />} />
          <Route path="/login" element={user ? <Navigate to="/" /> : <LoginScreen />} />
          <Route path="/register" element={user ? <Navigate to="/" /> :<RegisterScreen />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
