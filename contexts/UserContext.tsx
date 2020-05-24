import React from "react";
import { UserTokens } from "../api/auth";

type AppState = {
    tokens: UserTokens | null;
    isLoading: boolean;
}

const initialState: AppState = {
    tokens: null,
    isLoading: true
}

export const UserContext = React.createContext<AppState>(initialState);