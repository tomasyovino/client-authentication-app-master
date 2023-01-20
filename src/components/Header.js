import { useState } from 'react';
import { ArrowDropDown, AccountCircle, Group, Logout } from '@mui/icons-material';
import logo from "../assets/logo.png"

const Header = ({ data }) => {
  const [ dropdownIsAcitve, setDropdownIsAcitve] = useState(false);
  
  return (
    <header>
      <div className="logo-container">
        <img  src={logo} alt="logo" className="logo" />
        <span>authenticator</span>
      </div>
      <div className='user-header-container'>
        <img src={data.photo} alt={data.fullName} className="userImg" />
        <ArrowDropDown className='arrow-dropdown' onClick={() => setDropdownIsAcitve(!dropdownIsAcitve)} />
      </div>
      <div className='header-dropdown' style={{ display: dropdownIsAcitve ? "block" : "none" }}>
        <div>
          <AccountCircle />
          <span>My Profile</span>
        </div>
        <div>
          <Group />
          <span>Group Chat</span>
        </div>
        <hr />
        <div>
          <Logout />
          <span>Logout</span>
        </div>
      </div>
    </header>
  )
}

export default Header