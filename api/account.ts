import axios from "axios";
import { Alert } from 'react-native';
import { User } from "../types";

const api_host = 'http://192.168.1.221:5003/api/'
const GET_USER_INFO_URL = api_host + 'users/'
const EDIT_USER_INFO_URL = api_host + 'users/'

export async function getUserInfo(token: string) {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    let res: User = {} as User;

    await axios.get<User>(GET_USER_INFO_URL, config).then((response) => {
        res = response.data;
    }).catch((error) => {
        Alert.alert("Ошибка", error.response.data);
    });

    return res;
}

export async function editUserInfo(token: string, email: string, password: string) {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    let userToken = '';

    await axios.post<string>(GET_USER_INFO_URL, {
        email: email,
        password: password
    }, config).then((response) => {
        userToken = response.data;
    }).catch((error) => {
        Alert.alert("Ошибка", error.response.data);
    });

    return userToken;
}