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
                        className="change-info"
                        onSubmit={submitHandler}
                        autoComplete="off"
                    >
                        <div className='section-header'>
                            <button type="button" onClick={onBackRequestHandler} className="goBackBtn">{`< Back`}</button>
                        </div>

                        <div className='info-container'>
                            <div className='info'>
                                <div>
                                    <h3>Change Info</h3>
                                    <p>Changes will be reflected to every services</p>
                                </div>
                            </div>

                            <div className='info info-photo'>
                                <img src={user.imgUrl} alt={user.fullName} />
                                {/* <button>CHANGE PHOTO</button> */}
                                <input type="file" name="image" placeholder="CHANGE PHOTO" onChange={fileChangeHandler} />
                            </div>
                            <div className='info'>
                                <label>First Name</label>
                                <input placeholder="Enter your first name..." type="text" name="firstName" value={formData.firstName} onChange={(e) => handleChange(e, formData, setFormData)} />
                            </div>
                            <div className='info'>
                                <label>Last Name</label>
                                <input placeholder="Enter your last name..." type="text" name="lastName" value={formData.lastName} onChange={(e) => handleChange(e, formData, setFormData)} />
                            </div>
                            <div className='info'>
                            <label>Bio</label>
                            <textarea placeholder="Enter your bio..." type="text" name="desc" value={formData.desc} onChange={(e) => handleChange(e, formData, setFormData)} />
                            </div>
                            <div className='info'>
                                <label>Phone</label>
                                <input placeholder="Enter your phone..." type="text" name="phone" value={formData.phone} onChange={(e) => handleChange(e, formData, setFormData)} />
                            </div>
                            <div className='info'>
                                <label>Email</label>
                                <input placeholder="Enter your email..." type="text" name="email" value={formData.email} onChange={(e) => handleChange(e, formData, setFormData)} />
                            </div>
                            <div className='info'>
                                <button type="submit">Save</button>
                            </div>
                        </div>
                    </motion.form>
                : <Spinner />
            }
        </>
    );
};

export default UpdateUserForm;