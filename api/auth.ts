import axios from "axios";
import { Alert } from 'react-native';

const api_host = 'http://192.168.1.221:5003/api/'
const SIGN_IN_URL = api_host + 'users/authenticate'
const REGISTER_URL = api_host + 'users/register'


export async function authenticateUser(email: string, password: string) {
    let userToken = '';

    await axios.post<string>(SIGN_IN_URL, {
        email: email,
        password: password
    }).then((response) => {
        userToken = response.data;
    }).catch((error) => {
        Alert.alert("Ошибка", error.response.data);
    });

    return userToken;
}

export async function registerUser(email: string, password: string) {
    let userToken = '';

    await axios.post<string>(REGISTER_URL, {
        email: email,
        password: password
    }).then((response) => {
        userToken = response.data;
    }).catch((error) => {
        Alert.alert("Ошибка", error.response.data);
    });

    return userToken;
}