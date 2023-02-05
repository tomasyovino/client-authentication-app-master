import Spinner from "./Spinner";

const PersonalInfo = ({ user, motion, userFormsVisibilityHandler, userFormVisibility, setUserFormVisibility, userFormPassVisibility, setUserFormPassVisibility }) => {

  return (
    <section className='flex flex-col items-center gap-11 not-italic tracking-tight text-black w-full max-w-3xl'>
      <div className='text-center font-normal text-4xl leading-10 w-full'>
        <h2>Personal Info</h2>
        <span className="font-light text-lg leading-6">Basic info, like your name and photo</span>
      </div>

      { 
        user
          ?
            <motion.div className='border rounded-xl border-[#E0E0E0] w-full' animate={{ scale: userFormVisibility || userFormPassVisibility ? 0 : 1, display: userFormVisibility || userFormPassVisibility ? "none" : "block" }}
            transition={{ duration: 0.5 }}>
              <div className='flex items-center justify-between py-7 px-12 border border-[#E0E0E0] rounded-xl'>
                <div className="not-italic">
                  <h3 className="text-2xl font-medium">Profile</h3>
                  <p className="font-normal text-[#828282]">Some info may be visible to other people</p>
                </div>
                <button className="py-2 px-9 text-[#828282] bg-transparent border border-[#828282] rounded-xl cursor-pointer" onClick={() => userFormsVisibilityHandler(userFormVisibility, setUserFormVisibility)}>Edit</button>
              </div>
              <div className='flex items-center justify-start py-7 px-12 border border-[#E0E0E0]'>
                <h5 className="w-48 font-medium text-sm text-[#BDBDBD]">PHOTO</h5>
                <img src={user.imgUrl} alt={user.fullName} className="w-24 h-24 object-top object-cover rounded-lg" />
              </div>
              <div className='flex items-center justify-start py-7 px-12 border border-[#E0E0E0]'>
                <h5 className="w-48 font-medium text-sm text-[#BDBDBD]">NAME</h5>
                <span className="font-medium text-lg leading-6 text-[#333333]">{user.fullName}</span>
              </div>
              <div className='flex items-center justify-start py-7 px-12 border border-[#E0E0E0]'>
                <h5 className="w-48 font-medium text-sm text-[#BDBDBD]">BIO</h5>
                <span className="font-medium text-lg leading-6 text-[#333333]">{user.desc}</span>
              </div>
              <div className='flex items-center justify-start py-7 px-12 border border-[#E0E0E0]'>
                <h5 className="w-48 font-medium text-sm text-[#BDBDBD]">PHONE</h5>
                <span className="font-medium text-lg leading-6 text-[#333333]">{user.phone}</span>
              </div>
              <div className='flex items-center justify-start py-7 px-12 border border-[#E0E0E0]'>
                <h5 className="w-48 font-medium text-sm text-[#BDBDBD]">EMAIL</h5>
                <span className="font-medium text-lg leading-6 text-[#333333]">{user.email}</span>
              </div>
              <div className='flex items-center justify-start py-7 px-12 border border-[#E0E0E0] rounded-xl'>
                <h5 className="w-48 font-medium text-sm text-[#BDBDBD]">PASSWORD</h5>
                <button onClick={() => userFormsVisibilityHandler(userFormPassVisibility, setUserFormPassVisibility)} className="py-2 px-9 text-[#828282] bg-transparent border border-[#828282] rounded-xl cursor-pointer">Change Password</button>
              </div>
            </motion.div>
          : <Spinner />
      }
    </section>
  );
};

export default PersonalInfo;