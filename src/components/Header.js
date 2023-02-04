import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';
import { ArrowDropDown, AccountCircle, Group, Logout } from '@mui/icons-material';
import { toast } from "react-toastify";
import logo from "../assets/logo.png"

const Header = () => {
  const [ dropdownIsAcitve, setDropdownIsAcitve] = useState(false);

  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
  };
  
  return (
    <header>
      <div className="logo-container">
        <img  src={logo} alt="logo" className="logo" />
        <span>authenticator</span>
      </div>
      <div className='user-header-container' onClick={() => setDropdownIsAcitve(!dropdownIsAcitve)}>
        <img src={user?.imgUrl} alt={user?.fullName} className="userImg" />
        <ArrowDropDown className='arrow-dropdown' />
      </div>
      <div className='header-dropdown' style={{ display: dropdownIsAcitve ? "block" : "none" }}>
        <div>
          <AccountCircle />
          <span>My Profile</span>
        </div>
        <div onClick={() => toast.info("Coming soon!")}>
          <Group />
          <span>Group Chat</span>
        </div>
        <hr />
        <div>
          <button onClick={onLogout}>
            <Logout />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header