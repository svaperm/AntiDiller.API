import React from "react";
import { UserTokens } from "../api/auth";

type AppState = {
    tokens: UserTokens | null;
    isLoading: boolean;
    needsUpdate: boolean;
}

const initialState: AppState = {
    tokens: null,
    isLoading: true,
    needsUpdate: false
}

export const UserContext = React.createContext<AppState>(initialState);