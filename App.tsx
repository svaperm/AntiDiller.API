import * as React from 'react';
import { AsyncStorage } from 'react-native';

import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from "./contexts/AuthContext";

import { AuthStack } from "./routes/authStack";
import { RootStack } from "./routes/rootStack";

type AppState = {
    isLoading: boolean;
    isSignout: boolean;
    userToken: string | null | undefined;
}

const initialState: AppState = {
    isLoading: true,
    isSignout: false,
    userToken: null,
}

const RESTORE_TOKEN = 'RESTORE_TOKEN'
const SIGN_IN = 'SIGN_IN'
const SIGN_OUT = 'SIGN_OUT'

interface RestoreTokenAction {
    type: typeof RESTORE_TOKEN;
    token: string | null | undefined;
}

interface SignInAction {
    type: typeof SIGN_IN;
    token: string | null | undefined;
}

interface SignOutAction {
    type: typeof SIGN_OUT;
}

type AuthActionTypes = RestoreTokenAction | SignInAction | SignOutAction;

// const AuthContext = React.createContext<AppState>(initialState);

function reducer(prevState: AppState, action: AuthActionTypes) {
    switch (action.type) {
        case RESTORE_TOKEN:
            return {
                ...prevState,
                userToken: action.token,
                isLoading: false,
            };
        case SIGN_IN:
            return {
                ...prevState,
                isSignout: false,
                userToken: action.token,
            };
        case SIGN_OUT:
            return {
                ...prevState,
                isSignout: true,
                userToken: null,
            };
    }
}


export default function App() {
    const [loginState, dispatch] = React.useReducer(reducer, initialState);

    React.useEffect(() => {
        // Fetch the token from storage then navigate to our appropriate place
        const bootstrapAsync = async () => {
            let userToken;
            userToken = ''
            try {
                userToken = await AsyncStorage.getItem('userToken');
            } catch (e) {
                // Restoring token failed
            }

            // After restoring token, we may need to validate it in production apps

            // This will switch to the App screen or Auth screen and this loading
            // screen will be unmounted and thrown away.
            dispatch({ type: 'RESTORE_TOKEN', token: userToken });
        };

        bootstrapAsync();
    }, []);

    const authContext = React.useMemo(() => ({
        signIn: async (email: string, password: string) => {
            let userToken;
            userToken = 'dasdsadsa';
            try {
                await AsyncStorage.setItem('userToken', userToken)
            } catch (e) {
                console.log(e)
            }
            dispatch({ type: SIGN_IN, token: userToken })
        },
        signOut: async () => {
            try {
                await AsyncStorage.removeItem('userToken')
            } catch (e) {
                console.log(e)
            }
            dispatch({ type: SIGN_OUT })
        },
        signUp: async (email: string, password: string) => {
            let userToken;
            userToken = 'dasdsadsa';
            try {
                await AsyncStorage.setItem('userToken', userToken)
            } catch (e) {
                console.log(e)
            }
            dispatch({ type: SIGN_IN, token: userToken })
        },
    }), [])

    if (loginState.isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size='large' />
            </View>
        )
    }

    return (
        <AuthContext.Provider value={authContext}>
            <NavigationContainer>
                {loginState.userToken !== null ? (
                    <RootStack />
                ) :
                (
                    <AuthStack />
                )}
            </NavigationContainer>
        </AuthContext.Provider>
    )
}
