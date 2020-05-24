import React, { createContext, useState } from "react";
import { UserTokens } from "../api/auth";

type AuthState = {
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
    signUp: (email: string, password: string) => Promise<void>;
    updateTokens: (tokens: UserTokens) => Promise<void>;
}

export const AuthContext = React.createContext<AuthState>({} as AuthState);