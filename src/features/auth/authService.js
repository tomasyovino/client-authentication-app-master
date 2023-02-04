import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL

const register = async (userData) => {
    const config = {
        headers: {
            "content-type": "multipart/form-data"
        }
    }
    const response = await axios.post(`${BASE_URL}/api/auth/register`, userData, config);

    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    };

    return response.data;
};

const login = async (userData) => {
    const response = await axios.post(`${BASE_URL}/api/auth/login`, userData);

    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    };

    return response.data;
};

const logout = async () => {
    localStorage.removeItem('user');
};

const authService = {
    register,
    login,
    logout
};

export default authService;