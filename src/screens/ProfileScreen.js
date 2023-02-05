import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { reset } from "../features/user/userSlice";
import { getUser, updateUser } from "../features/user/userSlice";
import { Layout, PersonalInfo, UpdateUserForm, UpdateUserPassForm } from "../components";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const ProfileScreen = () => {
  const [ userFormVisibility, setUserFormVisibility ] = useState(false);
  const [ userFormPassVisibility, setUserFormPassVisibility ] = useState(false);

  const userId = useSelector((state) => state.auth.user.user._id);
  const { user, isLoading, isError, message } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if(isError) toast.error(message);

    dispatch(getUser(userId));

    return () => {
      dispatch(reset())
    }
  }, [userId, isError, message, dispatch]);

  const userFormsVisibilityHandler = async (state, setState) => {
    setState(!state);
  };

  const handleChange = (e, state, setState) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const dispatchSubmitHandler = (userId, data) => {
    dispatch(updateUser({ id: userId, data}));
  };

  return (
    <Layout>
      <PersonalInfo
        user={user}
        motion={motion} 
        userFormsVisibilityHandler={userFormsVisibilityHandler}
        userFormVisibility={userFormVisibility}
        setUserFormVisibility={setUserFormVisibility}
        userFormPassVisibility={userFormPassVisibility}
        setUserFormPassVisibility={setUserFormPassVisibility}
      />
      <UpdateUserForm 
        user={user}
        userFormVisibility={userFormVisibility}
        setUserFormVisibility={setUserFormVisibility}
        userFormsVisibilityHandler={userFormsVisibilityHandler}
        handleChange={handleChange}
        dispatchSubmitHandler={dispatchSubmitHandler}
        isLoading={isLoading}
      />
      <UpdateUserPassForm
        user={user}
        userFormPassVisibility={userFormPassVisibility}
        setUserFormPassVisibility={setUserFormPassVisibility}
        userFormsVisibilityHandler={userFormsVisibilityHandler}
        handleChange={handleChange}
        dispatchSubmitHandler={dispatchSubmitHandler}
      />
    </Layout>
  )
}

export default ProfileScreen