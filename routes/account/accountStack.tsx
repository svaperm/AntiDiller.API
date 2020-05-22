import * as React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import Account from "../../components/account/Account";
import EditAccount from "../../components/account/EditAccount";
import { AuthContext } from '../../contexts/AuthContext';
import { Button } from 'react-native-paper';
import { colors } from "../../styles";

export type AccountStackParamList = {
    Account: undefined;
    EditAccount: undefined;
};

const Stack = createStackNavigator<AccountStackParamList>();

export function AccountStack() {
    const { signOut } = React.useContext(AuthContext);

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Account"
                component={Account}
                options={{
                    headerTitle: 'Личный кабинет',
                    headerRight: () => (
                        <Button color="#F2453D" onPress={() => signOut()}>Выход</Button>
                    ),
                    headerStyle: {backgroundColor: colors.primary} }}
            />
            <Stack.Screen
                name="EditAccount"
                component={EditAccount}
                options={{
                    headerTitle: 'Изменение профиля',
                    headerStyle: {backgroundColor: colors.primary} }}
            />
        </Stack.Navigator>
    )
}
