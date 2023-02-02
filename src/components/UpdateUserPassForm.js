import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const UpdateUserPassForm = ({ user, userFormPassVisibility, setUserFormPassVisibility, userFormsVisibilityHandler, handleChange, dispatchSubmitHandler }) => {
    const [ formData, setFormData ] = useState({
        password: "",
        confirmPassword: ""
    });
    const [error, setError] = useState({});

    const { password, confirmPassword } = formData;

    const onBackRequestHandler = () => {
        setFormData({
            password: "",
            confirmPassword: ""
        });
        userFormsVisibilityHandler(userFormPassVisibility, setUserFormPassVisibility);
    };

    const validate = (obj) => {
        const { password, confirmPassword } = obj;
        let errors = {};
        if (!password) errors.password = "* Password is required";
        if (!confirmPassword) errors.confirmPassword = "* Confirm password is required";
        if (password !== confirmPassword) errors.confirmPassword = "* Password does not match";
        setError(errors);
        return Object.keys(errors).length === 0;
    };

    const submitHandler = (e) => {
        e.preventDefault();
        if (!validate(formData)) return;
        
        try {
            const userData = {
                password,
                confirmPassword
            };

            dispatchSubmitHandler(user._id, userData);
            toast.success('Password successfully changed');
            userFormsVisibilityHandler(userFormPassVisibility, setUserFormPassVisibility);
        } catch (err) {
            console.log(err);
        } finally {
            setFormData({
                password: "",
                confirmPassword: ""
            });
        };
    };

    return (
        <motion.form
            initial={{ display: "none" }}
            animate={{ scale: userFormPassVisibility ? 1 : 0, display: userFormPassVisibility ? "flex" : "none" }}
            transition={{ duration: 0.5 }}
            className="change-info"
            onSubmit={submitHandler}
            autoComplete="off"
        >
            <div className='section-header'>
                <button type="button" onClick={onBackRequestHandler} className="goBackBtn">{`< Back`}</button>
            </div>

            <div className="info-container">
                <div className='info'>
                    <label>Password</label>
                    <input placeholder={`Enter your password...`} type="password" name="password" value={formData.password} onChange={(e) => handleChange(e, formData, setFormData)} />
                    {error.password && <p>{error.password}</p>}
                </div>
                <div className='info'>
                    <label>Confirm Password</label>
                    <input placeholder={`Confirm your password...`} type="password" name="confirmPassword" value={formData.confirmPassword} onChange={(e) => handleChange(e, formData, setFormData)} />
                    {error.confirmPassword && <p>{error.confirmPassword}</p>}
                </div>
                <div className='info'>
                    <button type="submit">Save</button>
                </div>
            </div>
        </motion.form>
    );
};

export default UpdateUserPassForm;