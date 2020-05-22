import * as React from 'react';
import { AsyncStorage } from 'react-native';
import { View } from 'react-native';

import { ActivityIndicator } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';

import { AuthContext } from "./contexts/AuthContext";
import { UserContext } from "./contexts/UserContext";

import { AuthStack } from "./routes/authStack";
import { RootBottomTabBar } from "./routes/rootBottomTabBar";

import { authenticateUser, registerUser } from "./api/auth";

type AppState = {
    isLoading: boolean;
    userToken: string;
}

const initialState: AppState = {
    isLoading: true,
    userToken: '',
}

const RESTORE_TOKEN = 'RESTORE_TOKEN'
const SIGN_IN = 'SIGN_IN'
const SIGN_OUT = 'SIGN_OUT'

interface RestoreTokenAction {
    type: typeof RESTORE_TOKEN;
    token: string;
}

interface SignInAction {
    type: typeof SIGN_IN;
    token: string;
}

interface SignOutAction {
    type: typeof SIGN_OUT;
}

type AuthActionTypes = RestoreTokenAction | SignInAction | SignOutAction;

export function reducer(prevState: AppState, action: AuthActionTypes) {
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
                userToken: action.token,
            };
        case SIGN_OUT:
            return {
                ...prevState,
                userToken: '',
            };
    }
}


export default function App() {
    const [loginState, dispatch] = React.useReducer(reducer, initialState);

    React.useEffect(() => {
        // Fetch the token from storage then navigate to our appropriate place
        const bootstrapAsync = async () => {
            let userToken = '';
            let res;
            try {
                res = await AsyncStorage.getItem('userToken');
                if (res === null)
                    userToken = ''
                else
                    userToken = res
            } catch (e) {
                userToken = ''
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
            let userToken = ''
            await authenticateUser(email, password).then((token) => {
                userToken = token;
            });
            if (userToken !== '') { // if auth is successful, userToken != ''
                // save token in storage
                try {
                    await AsyncStorage.setItem('userToken', userToken)
                } catch (e) {
                    console.log(e)
                }
                dispatch({ type: SIGN_IN, token: userToken })
            }
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
            let userToken = '';
            await registerUser(email, password).then((token) => {
                userToken = token;
            });
            if (userToken !== '') { // if register is successful, userToken != ''
                // save token in storage
                try {
                    await AsyncStorage.setItem('userToken', userToken)
                } catch (e) {
                    console.log(e)
                }
                dispatch({ type: SIGN_IN, token: userToken })
            }
        },
        updateToken: async (token: string) => {
            try {
                await AsyncStorage.setItem('userToken', token)
            } catch (e) {
                console.log(e)
            }
            dispatch({ type: SIGN_IN, token: token })
        }
    }), [])

    if (loginState.isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size='large' />
            </View>
        )
    }

    return (
        <UserContext.Provider value={loginState}>
            <AuthContext.Provider value={authContext}>
                <NavigationContainer>
                    {loginState.userToken !== '' ? (
                        <RootBottomTabBar />
                    ) :
                    (
                        <AuthStack />

                    )}

                </NavigationContainer>
            </AuthContext.Provider>
        </UserContext.Provider>
    )
}
