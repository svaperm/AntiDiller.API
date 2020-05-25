import * as React from 'react';
import { createStackNavigator, StackNavigationProp } from "@react-navigation/stack";
import Account, { AccountScreenNavigationProp } from "../../components/account/Account";
import EditAccount from "../../components/account/EditAccount";
import { AuthContext } from '../../contexts/AuthContext';
import { Button } from 'react-native-paper';
import { colors } from "../../styles";
import { Report } from "../../types";
import { LatLng } from 'react-native-maps';
import { ReportItem } from '../../components/account/ReportItem';
import { LocationViewer } from '../../components/account/LocationViewer';

export type AccountStackParamList = {
    Account: undefined;
    EditAccount: undefined;
    ReportItem: { report: Report },
    LocationViewer: { location: LatLng }
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
                    headerStyle: { backgroundColor: colors.primary }
                }}
            />
            <Stack.Screen
                name="EditAccount"
                component={EditAccount}
                options={{
                    headerTitle: 'Изменение профиля',
                    headerStyle: { backgroundColor: colors.primary }
                }}
            />
            <Stack.Screen
                name="ReportItem"
                component={ReportItem}
                options={{
                    headerTitle: 'Просмотр заявки',
                    headerStyle: { backgroundColor: colors.primary }
                }}
            />
            <Stack.Screen
                name="LocationViewer"
                component={LocationViewer}
                options={{
                    headerTitle: '',
                    headerStyle: { backgroundColor: colors.primary }
                }}
            />
        </Stack.Navigator>
    )
}