import * as React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import Statistics from "../../components/statistics/Statistics";


export type StatisticsStackParamList = {
    Statistics: undefined;
};

const Stack = createStackNavigator<StatisticsStackParamList>();

export function StatisticsStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Statistics"
                component={Statistics}
                options={{ headerTitle: 'Статистика' }}
            />
        </Stack.Navigator>
    )
}
