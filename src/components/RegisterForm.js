import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { register, reset } from "../features/auth/authSlice";
import Spinner from "./Spinner";
import logo from "../assets/logo.png";

const RegisterForm = () => {
  const [ formData, setFormData ] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [ selectedFile, setSelectedFile ] = useState(null);
  const [error, setError] = useState({});

  const { firstName, lastName, username, email, phone, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if(isError) toast.error(message);

    if(isSuccess) navigate("/login");

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);
  

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const fileChangeHandler = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const validate = (obj) => {
    const { firstName, lastName, username, email, phone, password, confirmPassword } = obj;
    let errors = {};
    if (!firstName) errors.firstName = "* First name is required";
    if (!lastName) errors.lastName = "* Last name is required";
    if (!username) errors.username = "* Username is required";
    if (!email) errors.email = "* Email is required";
    if (!phone) errors.phone = "* Phone number is required";
    if (!password) errors.password = "* Password is required";
    if (!confirmPassword) errors.confirmPassword = "* Confirm password is required";
    if (password !== confirmPassword) errors.confirmPassword = "* Password does not match";
    setError(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate(formData)) return;
    
    try {
      const formDataObject = new FormData();
      formDataObject.append("firstName", firstName);
      formDataObject.append("lastName", lastName);
      formDataObject.append("username", username);
      formDataObject.append("email", email);
      formDataObject.append("phone", phone);
      formDataObject.append("password", password);
      selectedFile && formDataObject.append("image", selectedFile);

      dispatch(register(formDataObject));
    } catch (err) {
      console.error(err);
    } finally {
      setFormData({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
      });
      setSelectedFile(null);
    };
  };

  if (isLoading) return <Spinner />

  return (
    <form className='w-full flex flex-col border rounded-3xl border-[#BDBDBD] items-center gap-7 my-10 mx-2.5 md:mx-14 py-12 px-2.5 md:px-14 max-w-[473px]' autoComplete="off" onSubmit={handleSubmit}>
      <div className="flex flex-row items-center justify-start text-[#282051] font-semibold w-full gap-3 not-italic tracking-tight">
        <img  src={logo} alt="logo" className="w-6" />
        <span>authenticator</span>
      </div>
      <div className="w-full flex flex-col items-center gap-3.5 not-italic tracking-tight text-[#333333] text-start">
        <h4 className="w-full font-semibold text-lg leading-6">Join thousands of learners from around the world</h4>
        <p className="font-normal text-base leading-5">Master web development by making real-life projects. There are multiple paths for you to choose</p>
      </div>
      <div className="w-full flex flex-col items-center gap-3.5 not-italic tracking-tight text-[#333333]">
        {error.firstName && <p className="text-red-500 text-left w-full font-normal text-base leading-5">{error.firstName}</p>}
        <input 
          placeholder="First name" 
          name="firstName" 
          type="text" 
          value={formData.firstName}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg border-[#BDBDBD] outline-none" 
        />
        {error.lastName && <p className="text-red-500 text-left w-full font-normal text-base leading-5">{error.lastName}</p>}
        <input 
          placeholder="Last name" 
          name="lastName" 
          type="text" 
          value={formData.lastName}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg border-[#BDBDBD] outline-none" 
        />
        {error.username && <p className="text-red-500 text-left w-full font-normal text-base leading-5">{error.username}</p>}
        <input 
          placeholder="Username" 
          name="username" 
          type="text" 
          value={formData.username}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg border-[#BDBDBD] outline-none" 
        />
        {error.email && <p className="text-red-500 text-left w-full font-normal text-base leading-5">{error.email}</p>}
        <input 
          placeholder="Email" 
          name="email" 
          type="text" 
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg border-[#BDBDBD] outline-none" 
        />
        {error.phone && <p className="text-red-500 text-left w-full font-normal text-base leading-5">{error.phone}</p>}
        <input 
          placeholder="Phone number" 
          name="phone" 
          type="text" 
          value={formData.phone}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg border-[#BDBDBD] outline-none" 
        />
        {error.password && <p className="text-red-500 text-left w-full font-normal text-base leading-5">{error.password}</p>}
        <input 
          placeholder="Password" 
          name="password" 
          type="password" 
          value={formData.password}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg border-[#BDBDBD] outline-none" 
        />
        {error.confirmPassword && <p className="text-red-500 text-left w-full font-normal text-base leading-5">{error.confirmPassword}</p>}
        <input 
          placeholder="Confirm password" 
          name="confirmPassword" 
          type="password" 
          value={formData.confirmPassword}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg border-[#BDBDBD] outline-none" 
        />
        <input 
          name="file" 
          type="file"
          onChange={fileChangeHandler}
          className="w-full p-3 border rounded-lg border-[#BDBDBD] outline-none" 
        />
        <button className="w-full py-1.5 border-none rounded-lg not-italic font-semibold leading-6 text-center tracking-tight text-white bg-[#2F80ED] cursor-pointer" type="submit">Register Now</button>
      </div>
      <div className="w-full flex flex-col items-center gap-3.5 not-italic tracking-tight text-[#828282] font-['Noto Sans'] font-medium text-sm leading-5">
        <span>Already a member? <Link to={'/login'} className="text-[#2F80ED]">Login</Link></span>
      </div>
    </form>
  );
};

export default RegisterForm;