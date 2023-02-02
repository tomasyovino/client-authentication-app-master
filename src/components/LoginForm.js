import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { login, reset } from "../features/auth/authSlice";
import Spinner from "./Spinner";
import logo from "../assets/logo.png";
import googleIcon from "../assets/googleIcon.png";

const LoginForm = () => {
  const [ formData, setFormData ] = useState({
    username: "",
    password: ""
  });
  const [ error, setError ] = useState({});

  const { username, password } = formData;

  const dispatch = useDispatch();

  const { user, isLoading, isError, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if(isError) toast.error(message);

    dispatch(reset());
  }, [user, isError, message, dispatch]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = (obj) => {
    const {  username, password } = obj;
    let errors = {};
    if (!username) errors.username = "* Username is required";
    if (!password) errors.password = "* Password is required";
    setError(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate(formData)) return;

    try {
      const userData = { username, password };

      dispatch(login(userData));
    } catch (err) {
      console.error(err);
    } finally {
      setFormData({
        username: "",
        password: ""
      });
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
        <h4>Login</h4>
      </div>
      <div className="inputs-container">
        <input placeholder="Username" name="username" type="text" onChange={handleChange} />
        {error.username && <p>{error.username}</p>}
        <input placeholder="Password" name="password" type="password" onChange={handleChange} />
        {error.password && <p>{error.password}</p>}
        <button type="submit">Login</button>
      </div>
      <div>
        <span>or continue with these social profile</span>
        <img src={googleIcon} alt="google" className="google-icon" />
        <span>Already a member? <Link to={'/register'}>Register</Link></span>
      </div>
    </form>
  );
};

export default LoginForm;