import * as React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { Account } from "../components/account/Account";

export type RootStackParamList = {
    Account: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export function RootStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Account"
                component={Account}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}
