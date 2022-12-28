import {NewUser} from "../models/NewUser";
import {DisplayUser} from "../models/displayUser";
import jwt_decode from 'jwt-decode';
import axios from "axios";
import {LoginUser} from "../models/loginUser";
import {Jwt} from "../models/jwt";
import {DecodedJwt} from "../models/decodedJwt";

const registerUser = async (newUser: NewUser): Promise<DisplayUser | null> => {
    const response = await axios.post(`http://localhost:3001/api/auth/register`, newUser);
    return response.data;
}

const login = async (loginUser: LoginUser): Promise<{ jwt: Jwt; user: DisplayUser | null }> => {
    const response = await axios.post(`http://localhost:3001/api/auth/login`, loginUser);
    if (response.data) {
        localStorage.setItem('jwt', JSON.stringify(response.data.token));
        const decodeJwt: DecodedJwt = jwt_decode(response.data.token);
        localStorage.setItem('user', JSON.stringify(decodeJwt));
        return {jwt: response.data, user: decodeJwt.user}
    }
    return {jwt: response.data, user: null}
}

const logout = (): void => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
}

const verifyJwt = async (jwt: string): Promise<boolean> => {
    const response = await axios.post(`http://localhost:3001/api/auth/verify-jwt`, {jwt});

    if (response.data) {
        const jwtExpirationMs = response.data.exp * 1000;
        return jwtExpirationMs > Date.now();
    }
    return false;
}

const authService = {
    registerUser,
    login,
    logout,
    verifyJwt
}

export default authService;