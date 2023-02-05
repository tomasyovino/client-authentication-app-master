import { BrowserRouter, Routes, Route, Navigate  } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import { useSelector } from "react-redux";
import { HomeScreen, ProfileScreen, LoginScreen, RegisterScreen, NotFoundScreen } from "./screens";
import './App.css';
import './styles/main.css';

const App = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={user ? <Navigate to="/profile" /> : <HomeScreen />} />
          <Route path="/profile" element={!user ? <Navigate to="/login" /> : <ProfileScreen />} />
          <Route path="/login" element={user ? <Navigate to="/profile" /> : <LoginScreen />} />
          <Route path="/register" element={user ? <Navigate to="/profile" /> :<RegisterScreen />} />
          <Route path='*' element={<NotFoundScreen />}/>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
