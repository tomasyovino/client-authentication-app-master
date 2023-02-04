import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const getUser = async (userId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const response = await axios.get(`${BASE_URL}/api/user/${userId}`, config);
    return response.data;
};

const updateUser = async (userId, data, token) => {
    const config = {
        headers: {
            "content-type": "multipart/form-data",
            Authorization: `Bearer ${token}`
        }
    };

    const response = await axios.put(`${BASE_URL}/api/user/${userId}`, data, config);
    return response.data;
};

const userService = {
    getUser,
    updateUser
};

export default userService;