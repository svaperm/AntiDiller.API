import * as React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { AddReport } from "../../components/report/AddReport";
import { LocationPicker } from "../../components/report/LocationPicker";
import { colors } from "../../styles";
import { LatLng } from 'react-native-maps';

export type ReportStackParamList = {
    AddReport: undefined;
    LocationPicker: {callback: (Location: LatLng) => void};
};

const Stack = createStackNavigator<ReportStackParamList>();

export function ReportStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="AddReport"
                component={AddReport}
                options={{ headerTitle: 'Формирование заявки', headerStyle: {backgroundColor: colors.primary} }}
            />
            <Stack.Screen
                name="LocationPicker"
                component={LocationPicker}
                options={{ headerTitle: 'Выбор местоположения', headerStyle: {backgroundColor: colors.primary} }}
            />
        </Stack.Navigator>
    )
}
