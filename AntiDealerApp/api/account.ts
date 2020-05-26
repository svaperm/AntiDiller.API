import axios from "axios";
import { Alert } from 'react-native';
import { User } from "../types";
import { UserTokens } from "./auth";
import { RequestTypes, GET_REQUEST, POST_REQUEST, fetchWithCredentials } from "./index";

const GET_USER_INFO_URL = 'users/'
const EDIT_USER_INFO_URL = 'users/'

export async function getUserInfo(tokens: UserTokens | null) {
    const config = {
        headers: { Authorization: `Bearer ${tokens?.token}` }
    };

    let res: User = {} as User;
    tokens = tokens as UserTokens;

    await fetchWithCredentials(GET_USER_INFO_URL, { type: GET_REQUEST }, tokens as UserTokens, {}).then((response) => {
        res = response.data;
    }).catch((error) => {
        Alert.alert("Ошибка", error.response.data);
    });
    // await axios.get<User>(GET_USER_INFO_URL, config).then((response) => {
    //     res = response.data;
    // }).catch((error) => {
    //     Alert.alert("Ошибка", error.response.data);
    // });

    return res;
}

export async function editUserInfo(tokens: UserTokens, email: string, password: string) {
    // переделать
    // const config = {
    //     headers: { Authorization: `Bearer ${tokens?.token}` }
    // };
    let userTokens: UserTokens | null = null;

    //let userToken = tokens.token;

    await fetchWithCredentials(EDIT_USER_INFO_URL,
        {
            type: POST_REQUEST,
            body: {
                email: email,
                password: password
            }
        }, tokens as UserTokens, {}).then((response) => {
            userTokens = {
                token: response.data,
                refreshToken: tokens.refreshToken
            }
            //userToken = response.data;
        }).catch((error) => {
            Alert.alert("Ошибка", error.response.data);
        });


    // await axios.post<string>(GET_USER_INFO_URL, {
    //     email: email,
    //     password: password
    // }, config).then((response) => {
    //     userToken = response.data;
    // }).catch((error) => {
    //     Alert.alert("Ошибка", error.response.data);
    // });

    //return { token: userToken, refreshToken: tokens.refreshToken } as UserTokens;
    return userTokens as UserTokens | null;
}