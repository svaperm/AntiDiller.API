import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AccountStack } from "./account/accountStack";
import { StatisticsStack } from "./statistics/statisticsStack";
import { ReportStack } from "./report/reportStack";
import { MaterialIcons } from '@expo/vector-icons';
import { Route } from '@react-navigation/native';

export type RootBottomBarParamList = {
    Account: undefined;
    Statistics: undefined;
    Report: undefined;
};

const BottomBar = createBottomTabNavigator<RootBottomBarParamList>();

export function RootBottomTabBar() {
    const getTabBarVisibility = (route: any) => {
        const routeName = route.state ? route.state.routes[route.state.index].name : '';
        if (routeName === 'LocationPicker' || routeName === 'EditAccount') {
            return false;
        }
        return true;
    }

    return (
        <BottomBar.Navigator>
            <BottomBar.Screen
                name="Account"
                component={AccountStack}
                options={({ route }) => ({
                    title: "Аккаунт",
                    tabBarIcon: () => (<MaterialIcons name="account-circle" size={24} color="black" />),
                    tabBarVisible: getTabBarVisibility(route)
                })}
            />
            <BottomBar.Screen
                name="Statistics"
                component={StatisticsStack}
                options={{
                    title: "Статистика",
                    tabBarIcon: () => (<MaterialIcons name="poll" size={24} color="black" />)
                }}
            />
            <BottomBar.Screen
                name="Report"
                component={ReportStack}
                options={({ route }) => ({
                    title: "Заявка",
                    tabBarIcon: () => (<MaterialIcons name="announcement" size={24} color="black" />),
                    tabBarVisible: getTabBarVisibility(route)
                })}
            />
        </BottomBar.Navigator>
    )
}
