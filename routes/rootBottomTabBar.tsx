import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { AccountStack } from "./account/accountStack";
import { StatisticsStack } from "./statistics/statisticsStack";
import { MaterialIcons } from '@expo/vector-icons'; 

// https://reactnavigation.org/docs/screen-options-resolution/#setting-parent-screen-options-based-on-child-navigators-state
// function getHeaderTitle(route:) {
//     // Access the tab navigator's state using `route.state`
//     const routeName = route.state
//       ? // Get the currently active route name in the tab navigator
//         route.state.routes[route.state.index].name
//       : // If state doesn't exist, we need to default to `screen` param if available, or the initial screen
//         // In our case, it's "Feed" as that's the first screen inside the navigator
//         route.params?.screen || 'Feed';
  
//     switch (routeName) {
//       case 'Feed':
//         return 'News feed';
//       case 'Profile':
//         return 'My profile';
//       case 'Account':
//         return 'My account';
//     }
// }

export type RootStackParamList = {
    Account: undefined;
    Statistics: undefined;

};

const BottomBar = createBottomTabNavigator<RootStackParamList>();

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
