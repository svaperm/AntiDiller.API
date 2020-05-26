import axios from "axios";
import { Alert } from 'react-native';
import { api_host } from "./index";

const SIGN_IN_URL = api_host + 'users/authenticate'
const REGISTER_URL = api_host + 'users/register'

export interface UserTokens {
    token: string;
    refreshToken: string;
}

export async function authenticateUser(email: string, password: string) {
    let userToken: UserTokens | null = {} as UserTokens;

    await axios.post<UserTokens>(SIGN_IN_URL, {
        email: email,
        password: password
    }).then((response) => {
        userToken = response.data;
    }).catch((error) => {
        Alert.alert("Ошибка", error.response.data);
        return null;
    });

    return userToken;
}

export async function registerUser(email: string, password: string) {
    //let userToken: UserTokens | null = {} as UserTokens;
    let userTokens: UserTokens | null = null;

    await axios.post<UserTokens>(REGISTER_URL, {
        email: email,
        password: password
    }).then((response) => {
        userTokens = response.data;
    }).catch((error) => {
        Alert.alert("Ошибка", error.response.data);
    });

    return userTokens as UserTokens | null;
}