import React from 'react'

const PersonalInfo = ({ user, isVisible, userInfoHandler, info, motion }) => {
  return (
    <section 
      className='profile'
      
      >
      <div className='section-header'>
        <h2>Personal Info</h2>
        <span>Basic info, like your name and photo</span>
      </div>

      <motion.div className='info-container' animate={{ scale: isVisible ? 0 : 1, display: isVisible ? "none" : "block" }}
      transition={{ duration: 0.5 }}>
        <div className='info'>
          <div>
            <h3>Profile</h3>
            <p>Some info may be visible to other people</p>
          </div>
          <button onClick={() => userInfoHandler(info.changeUserInfo.info)}>Edit</button>
        </div>
        <div className='info'>
          <h5>PHOTO</h5>
          <img src={user.photo} alt={user.fullName} />
        </div>
        <div className='info'>
          <h5>NAME</h5>
          <span>{user.fullName}</span>
        </div>
        <div className='info'>
          <h5>BIO</h5>
          <span>{user.desc}</span>
        </div>
        <div className='info'>
          <h5>PHONE</h5>
          <span>{user.phoneNumber}</span>
        </div>
        <div className='info'>
          <h5>EMAIL</h5>
          <span>{user.email}</span>
        </div>
        <div className='info'>
          <h5>PASSWORD</h5>
          <button onClick={() => userInfoHandler(info.changeUserPassword.info)}>Change Password</button>
        </div>
      </motion.div>
    </section>
  )
}

export default PersonalInfo