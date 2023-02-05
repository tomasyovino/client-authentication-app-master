import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { login, reset } from "../features/auth/authSlice";
import Spinner from "./Spinner";
import logo from "../assets/logo.png";

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
    <form className='w-full flex flex-col border rounded-3xl border-[#BDBDBD] items-center gap-7 my-10 mx-2.5 md:mx-14 py-12 px-2.5 md:px-14 max-w-[473px]' autoComplete="off" onSubmit={handleSubmit}>
      <div className="flex flex-row items-center justify-start text-[#282051] font-semibold w-full gap-3 not-italic tracking-tight">
        <img  src={logo} alt="logo" className="w-6" />
        <span>authenticator</span>
      </div>
      <div className="w-full flex flex-col items-center gap-3.5 not-italic tracking-tight text-[#333333] text-start">
        <h4 className="w-full font-semibold text-lg leading-6">Login</h4>
      </div>
      <div className="w-full flex flex-col items-center gap-3.5 not-italic tracking-tight text-[#333333]">
        <input className="w-full p-3 border rounded-lg border-[#BDBDBD] outline-none" placeholder="Username" name="username" type="text" onChange={handleChange} />
        {error.username && <p className="text-red-500 text-left w-full font-normal text-base leading-5">{error.username}</p>}
        <input className="w-full p-3 border rounded-lg border-[#BDBDBD] outline-none" placeholder="Password" name="password" type="password" onChange={handleChange} />
        {error.password && <p className="text-red-500 text-left w-full font-normal text-base leading-5">{error.password}</p>}
        <button className="w-full py-1.5 border-none rounded-lg not-italic font-semibold leading-6 text-center tracking-tight text-white bg-[#2F80ED] cursor-pointer" type="submit">Login</button>
      </div>
      <div className="w-full flex flex-col items-center gap-3.5 not-italic tracking-tight text-[#828282] font-['Noto Sans'] font-medium text-sm leading-5">
        <span>Already a member? <Link className="text-[#2F80ED]" to={'/register'}>Register</Link></span>
      </div>
    </form>
  );
};

export default LoginForm;