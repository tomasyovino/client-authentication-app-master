import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { register, reset } from "../features/auth/authSlice";
import Spinner from "./Spinner";
import logo from "../assets/logo.png";
import googleIcon from "../assets/googleIcon.png";

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
    <form className='form' autoComplete="off" onSubmit={handleSubmit}>
      <div className="logo-container">
        <img  src={logo} alt="logo" className="logo" />
        <span>authenticator</span>
      </div>
      <div className="form-header">
        <h4>Join thousands of learners from around the world</h4>
        <p>Master web development by making real-life projects. There are multiple paths for you to choose</p>
      </div>
      <div className="inputs-container">
        {error.firstName && <p>{error.firstName}</p>}
        <input 
          placeholder="First name" 
          name="firstName" 
          type="text" 
          value={formData.firstName}
          onChange={handleChange} 
        />
        {error.lastName && <p>{error.lastName}</p>}
        <input 
          placeholder="Last name" 
          name="lastName" 
          type="text" 
          value={formData.lastName}
          onChange={handleChange} 
        />
        {error.username && <p>{error.username}</p>}
        <input 
          placeholder="Username" 
          name="username" 
          type="text" 
          value={formData.username}
          onChange={handleChange} 
        />
        {error.email && <p>{error.email}</p>}
        <input 
          placeholder="Email" 
          name="email" 
          type="text" 
          value={formData.email}
          onChange={handleChange} 
        />
        {error.phone && <p>{error.phone}</p>}
        <input 
          placeholder="Phone number" 
          name="phone" 
          type="text" 
          value={formData.phone}
          onChange={handleChange} 
        />
        {error.password && <p>{error.password}</p>}
        <input 
          placeholder="Password" 
          name="password" 
          type="password" 
          value={formData.password}
          onChange={handleChange} 
        />
        {error.confirmPassword && <p>{error.confirmPassword}</p>}
        <input 
          placeholder="Confirm password" 
          name="confirmPassword" 
          type="password" 
          value={formData.confirmPassword}
          onChange={handleChange} 
        />
        <input 
          name="file" 
          type="file"
          onChange={fileChangeHandler}
        />
        <button type="submit">Register Now</button>
      </div>
      <div>
        <span>or continue with these social profile</span>
        <img src={googleIcon} alt="google" className="google-icon" />
        <span>Already a member? <Link to={'/login'}>Login</Link></span>
      </div>
    </form>
  );
};

export default RegisterForm;