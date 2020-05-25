import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { UserContext } from "../../contexts/UserContext";
import { getUserInfo } from "../../api/account";
import { colors, fonts } from "../../styles/index";
import { User, Report } from "../../types";
import { RouteProp } from "@react-navigation/native";
import { List } from "react-native-paper";
import { StackNavigationProp } from "@react-navigation/stack";
import { AccountStackParamList } from "../../routes/account/accountStack";

interface ReportListProps {
    reports: Report[];
    navigation: StackNavigationProp<AccountStackParamList, 'Account'>
}

export function ReportList(props: ReportListProps) {
    const { navigation } = props;
    const listItems = props.reports.map((report, i) => {
        const onPress = () => {
            navigation.navigate('ReportItem', { report: report });
        }

        let reportIconColor = '';
        let reportIcon = '';
        switch (report.reportStatus.id) {
            case 1: // processing
                reportIconColor = '#F2C94C' // yellow
                reportIcon = 'clock-outline'
                break;
            case 2: // accepted
                reportIconColor = '#4CAF50' // green
                reportIcon = 'check-bold'
                break;
            case 3: // rejected
                reportIconColor = '#F2453D' // red
                reportIcon = 'block-helper'
                break;
            default:
                reportIconColor = '#919191' // grey
                reportIcon = 'help'
                break;
        }

        return (
            <List.Item key={i}
                title={`Заявка №${report.id}`}
                left={props => <List.Icon {...props}
                    icon={reportIcon}
                    color={reportIconColor} />}
                onPress={onPress} />
        )
    })

    return (
        <List.Section style={{ width: '100%' }}>
            {listItems}
        </List.Section>
    )
}