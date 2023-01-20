import React from 'react'

const ChangePersonalInfo = ({ user, info, isVisible, userInfoHandler, motion }) => {
  return (
    <motion.div 
      initial={{ display: "none" }}
      animate={{ scale: isVisible ? 1 : 0, display: isVisible ? "flex" : "none" }}
      transition={{ duration: 0.5 }}
      className="change-info"
    >
      <div className='section-header'>
        <button onClick={() => userInfoHandler(null)} className="goBackBtn">{`< Back`}</button>
      </div>

      <div className='info-container'>
        <div className='info'>
          <div>
            <h3>Change Info</h3>
            <p>Changes will be reflected to every services</p>
          </div>
        </div>
        {
          info && info.map((i, index) => {
            if(i.photo) {
              return (
                <div className='info info-photo' key={index}>
                  <img src={user.photo} alt={user.fullName} />
                  <button>CHANGE PHOTO</button>
                </div>
              )
            } else if(i.textarea) {
              return(
                <div className='info' key={index}>
                  <label>{i.label}</label>
                  <textarea placeholder={`Enter your ${i.label.toLowerCase()}...`} />
                </div>
              )
            } else if(i.password) {
              return (
                <>
                  <div className='info' key={index}>
                    <label>{i.label}</label>
                    <input placeholder={`Enter your ${i.label.toLowerCase()}...`} />
                  </div>
                  <div className='info'>
                    <label>Confirm Password</label>
                    <input placeholder={`Confirm your ${i.label.toLowerCase()}...`} />
                  </div>
                </>
              )
            } else {
              return(
                <div className='info' key={index}>
                  <label>{i.label}</label>
                  <input placeholder={`Enter your ${i.label.toLowerCase()}...`} />
                </div>
              )
            }
          })
        }
        <div className='info'>
          <button>Save</button>
        </div>
      </div>
    </motion.div>
  )
}

export default ChangePersonalInfo