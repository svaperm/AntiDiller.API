import * as React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import SignIn from "../components/auth/SignIn";
import Register from "../components/auth/Register";

export type AuthStackParamList = {
    SignIn: undefined;
    Register: undefined;
};

const Stack = createStackNavigator<AuthStackParamList>();

export function AuthStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="SignIn"
                component={SignIn}
                options={{ headerShown: false }}
            />
            <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}
