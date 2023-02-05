import { useState } from "react";
import Spinner from "./Spinner";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const UpdateUserForm = ({ user, userFormVisibility, setUserFormVisibility, userFormsVisibilityHandler, handleChange, dispatchSubmitHandler, isLoading }) => {
    const [ formData, setFormData ] = useState({
        firstName: "",
        lastName: "",
        desc: "",
        email: "",
        phone: ""
    });
    const [ selectedFile, setSelectedFile ] = useState(null);

    const { firstName, lastName, desc, email, phone } = formData;

    const onBackRequestHandler = () => {
        setFormData({
            firstName: "",
            lastName: "",
            desc: "",
            email: "",
            phone: ""
        });
        setSelectedFile(null);
        userFormsVisibilityHandler(userFormVisibility, setUserFormVisibility);
    };

    const fileChangeHandler = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const formDataAppendHandler = (state, formDataObj, name) => {
        if(state !== "") return formDataObj.append(name, state);
        return;
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            const formDataObject = new FormData();
            formDataAppendHandler(firstName, formDataObject, "firstName");
            formDataAppendHandler(lastName, formDataObject, "lastName");
            formDataAppendHandler(desc, formDataObject, "desc");
            formDataAppendHandler(email, formDataObject, "email");
            formDataAppendHandler(phone, formDataObject, "phone");
            formDataAppendHandler(selectedFile, formDataObject, "image");
            
            dispatchSubmitHandler(user._id, formDataObject);
            toast.success('User successfully changed');
            userFormsVisibilityHandler(userFormVisibility, setUserFormVisibility);
        } catch (err) {
            console.error(err);
        } finally {
            setFormData({
                firstName: "",
                lastName: "",
                desc: "",
                email: "",
                phone: ""
            });
            setSelectedFile(null);
        };
    };

    if (isLoading) return <Spinner />

    return (
        <>
            {
                user
                    ?
                    <motion.form
                        initial={{ display: "none" }}
                        animate={{ scale: userFormVisibility ? 1 : 0, display: userFormVisibility ? "flex" : "none" }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col items-center gap-6 not-italic tracking-tight text-black w-full max-w-3xl"
                        onSubmit={submitHandler}
                        autoComplete="off"
                    >
                        <div className='mt-5 text-start font-normal text-3xl leading-10 w-full'>
                            <button type="button" onClick={onBackRequestHandler} className="font-normal text-lg text-[#2D9CDB] bg-transparent border-none cursor-pointer">{`< Back`}</button>
                        </div>

                        <div className='border rounded-xl border-[#E0E0E0] w-full'>
                            <div className='flex items-center justify-between py-7 px-12 border border-[#E0E0E0] rounded-xl'>
                                <div className="not-italic">
                                    <h3 className="text-2xl font-medium">Change Info</h3>
                                    <p className="font-normal text-[#828282]">Changes will be reflected to every services</p>
                                </div>
                            </div>

                            <div className='flex items-center justify-start py-7 px-12 border border-[#E0E0E0] gap-7'>
                                <img src={user.imgUrl} alt={user.fullName} className="w-24 h-24 object-top object-cover rounded-lg" />
                                <label className="font-medium text-normal tracking-tight text-[#828282] p-4 border border-[#828282] rounded-xl cursor-pointer">
                                    CHANGE PHOTO
                                    <input type="file" name="image" placeholder="CHANGE PHOTO" onChange={fileChangeHandler} style={{display: "none"}} />
                                </label>
                            </div>
                            <div className='flex flex-col items-start justify-start py-5 px-12 border border-[#E0E0E0] border-b-0 gap-1'>
                                <label className="font-medium text-sm text-[#4F4F4F]">First Name</label>
                                <input className="p-5 border border-[#828282] rounded-xl w-full max-w-md outline-none" placeholder="Enter your first name..." type="text" name="firstName" value={formData.firstName} onChange={(e) => handleChange(e, formData, setFormData)} />
                            </div>
                            <div className='flex flex-col items-start justify-start py-5 px-12 border border-[#E0E0E0] border-b-0 gap-1'>
                                <label className="font-medium text-sm text-[#4F4F4F]">Last Name</label>
                                <input className="p-5 border border-[#828282] rounded-xl w-full max-w-md outline-none" placeholder="Enter your last name..." type="text" name="lastName" value={formData.lastName} onChange={(e) => handleChange(e, formData, setFormData)} />
                            </div>
                            <div className='flex flex-col items-start justify-start py-5 px-12 border border-[#E0E0E0] border-b-0 gap-1'>
                            <label className="font-medium text-sm text-[#4F4F4F]">Bio</label>
                            <textarea className="p-5 border border-[#828282] rounded-xl w-full max-w-md outline-none" placeholder="Enter your bio..." type="text" name="desc" value={formData.desc} onChange={(e) => handleChange(e, formData, setFormData)} />
                            </div>
                            <div className='flex flex-col items-start justify-start py-5 px-12 border border-[#E0E0E0] border-b-0 gap-1'>
                                <label className="font-medium text-sm text-[#4F4F4F]">Phone</label>
                                <input className="p-5 border border-[#828282] rounded-xl w-full max-w-md outline-none" placeholder="Enter your phone..." type="text" name="phone" value={formData.phone} onChange={(e) => handleChange(e, formData, setFormData)} />
                            </div>
                            <div className='flex flex-col items-start justify-start py-5 px-12 border border-[#E0E0E0] border-b-0 gap-1'>
                                <label className="font-medium text-sm text-[#4F4F4F]">Email</label>
                                <input className="p-5 border border-[#828282] rounded-xl w-full max-w-md outline-none" placeholder="Enter your email..." type="text" name="email" value={formData.email} onChange={(e) => handleChange(e, formData, setFormData)} />
                            </div>
                            <div className='flex flex-col items-start justify-start py-5 px-12 border border-[#E0E0E0] border-b-0 gap-1'>
                                <button className="py-2 px-9 text-[#FFFFFF] bg-[#2F80ED] rounded-xl cursor-pointer" type="submit">Save</button>
                            </div>
                        </div>
                    </motion.form>
                : <Spinner />
            }
        </>
    );
};

export default UpdateUserForm;