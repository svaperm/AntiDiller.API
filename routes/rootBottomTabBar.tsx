import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AccountStack } from "./account/accountStack";
import { StatisticsStack } from "./statistics/statisticsStack";
import { MaterialIcons } from '@expo/vector-icons'; 

export type RootBottomBarParamList = {
    Account: undefined;
    Statistics: undefined;
};

const BottomBar = createBottomTabNavigator<RootBottomBarParamList>();

export function RootBottomTabBar() {
    return (
        <BottomBar.Navigator>
            <BottomBar.Screen
                name="Account"
                component={AccountStack}
                options={{ 
                    title: "Аккаунт",
                    tabBarIcon: () => (<MaterialIcons name="account-circle" size={24} color="black" />)
                }}
            />
            <BottomBar.Screen
                name="Statistics"
                component={StatisticsStack}
                options={{ 
                    title: "Статистика",
                    tabBarIcon: () => (<MaterialIcons name="poll" size={24} color="black" />)
                }}
            />
        </BottomBar.Navigator>
    )
}
