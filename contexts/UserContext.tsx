import React from "react";

type AppState = {
    userToken: string;
    isLoading: boolean;
}

const initialState: AppState = {
    userToken: '',
    isLoading: true
}

export const UserContext = React.createContext<AppState>(initialState);