import axios, { AxiosResponse } from "axios";
import { UserTokens } from "./auth";
import { AuthContext } from "../contexts/AuthContext";
import React from "react";
import { Alert } from "react-native";

export const GET_REQUEST = 'GET_REQUEST'
export const POST_REQUEST = 'POST_REQUEST'

type GetRequestActionType = {
    type: typeof GET_REQUEST
}

type PostRequestActionType = {
    type: typeof POST_REQUEST
    body: any
}

export type RequestTypes = GetRequestActionType | PostRequestActionType;

export const api_host = 'http://192.168.1.237:5003/api/'
export const REFRESH_TOKEN_URL = 'users/refreshToken'

export async function fetchWithCredentials(url: string, requestType: RequestTypes, tokens: UserTokens, options: any): Promise<AxiosResponse<any>> {
    //const { updateTokens } = React.useContext(AuthContext);

    options = options || {};
    options.headers = options.headers || {};
    options.headers['Authorization'] = 'Bearer ' + tokens.token;

    let endUrl = api_host + url;
    let response = {} as AxiosResponse;
    switch (requestType.type) {
        case GET_REQUEST:
            response = await axios.get(endUrl, options);
            break;

        case POST_REQUEST:
            response = await axios.post(endUrl, requestType.body, options);
            break;
    }

    if (response.status === 200) { //all is good, return the response
        return response;
    }

    // below code never executes 
    if (response.status === 401 && response.headers.has('Token-Expired')) {
        var refreshToken = tokens.refreshToken;

        var refreshResponse = await refresh(tokens);
        if (refreshResponse.status !== 200) {
            return response; //failed to refresh so return original 401 response
        }
        var newTokens = refreshResponse.data; //read the json with the new tokens

        //updateTokens(newTokens);
        return await fetchWithCredentials(url, requestType, tokens, options); //repeat the original request
    } else { //status is not 401 and/or there's no Token-Expired header
        return response; //return the original 401 response
    }
}

async function refresh(tokens: UserTokens) {
    let newTokens = await axios.post<UserTokens>(api_host + REFRESH_TOKEN_URL, tokens)
    return newTokens;
}