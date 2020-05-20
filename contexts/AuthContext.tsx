import React, { createContext, useState } from "react";

// type AppState = {
//     isLoading: boolean;
//     isSignout: boolean;
//     userToken: string | null | undefined;
// }

// const initialState: AppState = {
//     isLoading: true,
//     isSignout: false,
//     userToken: null,
// }

type AuthState = {
    signIn: (username: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
    signUp: (username: string, password: string) => Promise<void>;
}

export const AuthContext = React.createContext<AuthState>({} as AuthState);