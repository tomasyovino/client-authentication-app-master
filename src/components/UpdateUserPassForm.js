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
            className="flex flex-col items-center gap-1 not-italic tracking-tight text-black w-full max-w-3xl"
            onSubmit={submitHandler}
            autoComplete="off"
        >
            <div className='mt-5 text-start font-normal text-3xl  leading-10 w-full'>
                <button type="button" onClick={onBackRequestHandler} className="font-normal text-lg text-[#2D9CDB] bg-transparent border-none ml-4 cursor-pointer">{`< Back`}</button>
            </div>

            <div className="border rounded-xl border-[#E0E0E0] w-full">
                <div className='flex flex-col items-start justify-start py-5 px-12 border border-[#E0E0E0] border-b-0 gap-1'>
                    <label className="font-medium text-sm text-[#4F4F4F]">Password</label>
                    <input className="p-5 border border-[#828282] rounded-xl w-full max-w-md outline-none" placeholder={`Enter your password...`} type="password" name="password" value={formData.password} onChange={(e) => handleChange(e, formData, setFormData)} />
                    {error.password && <p className="text-red-500 text-left w-full font-normal text-base leading-5">{error.password}</p>}
                </div>
                <div className='flex flex-col items-start justify-start py-5 px-12 border border-[#E0E0E0] border-b-0 gap-1'>
                    <label className="font-medium text-sm text-[#4F4F4F]">Confirm Password</label>
                    <input className="p-5 border border-[#828282] rounded-xl w-full max-w-md outline-none" placeholder={`Confirm your password...`} type="password" name="confirmPassword" value={formData.confirmPassword} onChange={(e) => handleChange(e, formData, setFormData)} />
                    {error.confirmPassword && <p className="text-red-500 text-left w-full font-normal text-base leading-5">{error.confirmPassword}</p>}
                </div>
                <div className='flex flex-col items-start justify-start py-5 px-12 border border-[#E0E0E0] border-b-0 gap-1'>
                    <button className="py-2 px-9 text-[#FFFFFF] bg-[#2F80ED] rounded-xl cursor-pointer" type="submit">Save</button>
                </div>
            </div>
        </motion.form>
    );
};

export default UpdateUserPassForm;