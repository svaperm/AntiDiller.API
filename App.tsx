import * as React from 'react';
import { AsyncStorage } from 'react-native';
import { View } from 'react-native';

import { ActivityIndicator } from 'react-native-paper';
import { Provider as PaperProvider } from 'react-native-paper';
import { AppRegistry } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { AuthContext } from "./contexts/AuthContext";
import { UserContext } from "./contexts/UserContext";

import { AuthStack } from "./routes/authStack";
import { RootBottomTabBar } from "./routes/rootBottomTabBar";

import { authenticateUser, registerUser, UserTokens } from "./api/auth";
import { MaterialIcons } from '@expo/vector-icons';
import axios from "axios";
import { api_host, REFRESH_TOKEN_URL } from "./api/index";
import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings([
    'Non-serializable values were found in the navigation state',
]);

type AppState = {
    isLoading: boolean;
    tokens: UserTokens | null;
}

const initialState: AppState = {
    isLoading: true,
    tokens: null
}

const RESTORE_TOKEN = 'RESTORE_TOKEN'
const SIGN_IN = 'SIGN_IN'
const SIGN_OUT = 'SIGN_OUT'

interface RestoreTokenAction {
    type: typeof RESTORE_TOKEN;
    tokens: UserTokens | null;
}

interface SignInAction {
    type: typeof SIGN_IN;
    tokens: UserTokens | null;
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
                tokens: action.tokens,
                isLoading: false,
            };
        case SIGN_IN:
            return {
                ...prevState,
                tokens: action.tokens
            };
        case SIGN_OUT:
            return {
                ...prevState,
                tokens: null
            };
    }
}


export default function App() {
    const [loginState, dispatch] = React.useReducer(reducer, initialState);

    React.useEffect(() => {
        // Fetch the token from storage then navigate to our appropriate place
        const bootstrapAsync = async () => {
            let userToken = '';
            let tokens: UserTokens | null = null;
            let res;
            try {
                res = await AsyncStorage.getItem('tokens');
                if (res === null)
                    tokens = null
                else
                    tokens = JSON.parse(res);

                // refresh tokens
                let newTokens = await axios.post<UserTokens>(api_host + REFRESH_TOKEN_URL, tokens)
                tokens = newTokens.data;
                await AsyncStorage.setItem('tokens', JSON.stringify(tokens))

            } catch (e) {
                tokens = null;
                // Restoring token failed
            }

            // After restoring token, we may need to validate it in production apps

            // This will switch to the App screen or Auth screen and this loading
            // screen will be unmounted and thrown away.
            dispatch({ type: 'RESTORE_TOKEN', tokens: tokens });
        };

        bootstrapAsync();
    }, []);



    const authContext = React.useMemo(() => ({
        signIn: async (email: string, password: string) => {
            let tokens = null as UserTokens | null;
            await authenticateUser(email, password).then((authTokens) => {
                tokens = authTokens;
            });
            if (tokens?.token) { // if auth is successful, userToken != null
                // save token in storage
                try {
                    await AsyncStorage.setItem('tokens', JSON.stringify(tokens))
                } catch (e) {
                    console.log(e)
                }
                dispatch({ type: SIGN_IN, tokens: tokens })
            }
        },
        signOut: async () => {
            try {
                await AsyncStorage.removeItem('tokens')
            } catch (e) {
                console.log(e)
            }
            dispatch({ type: SIGN_OUT })
        },
        signUp: async (email: string, password: string) => {
            let tokens = {} as UserTokens;
            await registerUser(email, password).then((authTokens) => {
                tokens = authTokens;
            });
            if (tokens !== null) { // if register is successful, userToken != ''
                // save token in storage
                try {
                    await AsyncStorage.setItem('tokens', JSON.stringify(tokens));
                } catch (e) {
                    console.log(e)
                }
                dispatch({ type: SIGN_IN, tokens: tokens })
            }
        },
        updateTokens: async (tokens: UserTokens) => {
            try {
                await AsyncStorage.setItem('tokens', JSON.stringify(tokens));

            } catch (e) {
                console.log(e)
            }
            dispatch({ type: SIGN_IN, tokens: tokens })
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
                <PaperProvider>
                    <NavigationContainer>
                        {loginState.tokens !== null ? (
                            <RootBottomTabBar />
                        ) :
                            (
                                <AuthStack />

                            )}

                    </NavigationContainer>
                </PaperProvider>
            </AuthContext.Provider>
        </UserContext.Provider>
    )
}

AppRegistry.registerComponent('App', () => App);