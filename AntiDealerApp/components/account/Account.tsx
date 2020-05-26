import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { UserContext } from "../../contexts/UserContext";
import { getUserInfo } from "../../api/account";
import { getUserReports } from "../../api/report";
import { colors, fonts } from "../../styles/index";
import { User, Report } from "../../types";
import { IconButton, Colors, Button, ActivityIndicator } from "react-native-paper";
import { AccountStackParamList } from "../../routes/account/accountStack";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ReportList } from "./ReportList";
import { Provider as PaperProvider } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';


type AccountScreenRouteProp = RouteProp<AccountStackParamList, 'Account'>;
export type AccountScreenNavigationProp = StackNavigationProp<AccountStackParamList, 'Account'>;

type AccountProps = {
    route: AccountScreenRouteProp;
    navigation: AccountScreenNavigationProp;
}

export function Account({ route, navigation }: AccountProps) {
    const { tokens, needsUpdate } = React.useContext(UserContext);
    const [userData, setUserData] = React.useState({} as User);
    const [reports, setReports] = React.useState([] as Report[]);
    const [isLoading, setIsLoading] = React.useState(true);
    React.useEffect(() => {
        setIsLoading(true);
        const getData = async () => {
            await getUserInfo(tokens).then((data) => {
                setUserData(data);
            });
            await getUserReports(tokens).then((data) => {
                setReports(data);
            });
            setIsLoading(false);
        }

        getData();
    }, [tokens, needsUpdate]);
    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size='large' />
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row' }}>
                <Text style={styles.title}>{userData.email}</Text>
                <Button icon='pencil' onPress={() => navigation.navigate('EditAccount')}>Редактировать</Button>
            </View>
            <Text style={styles.subTitle}>{getRatingName(userData.rating)} (рейтинг: {userData.rating})</Text>
            <View
                style={{
                    margin: 20,
                    borderBottomColor: 'black',
                    borderBottomWidth: StyleSheet.hairlineWidth,
                    alignSelf: 'stretch'
                }}
            />
            <Text style={styles.text}>Список заявок</Text>
            {reports.length ? <ReportList reports={reports} navigation={navigation} />: <Text style={styles.text}>Заявок нет :(</Text>}
        </View>
    );
}

function getRatingName(rating: number): string {
    if (rating < 2)
        return 'Юный сыщик'
    else if (rating < 6)
        return 'Опытный'
    else if (rating < 10)
        return 'Наблюдательный'
    return 'Эксперт'
}

export default Account;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    title: {
        fontSize: fonts.lg,
        marginBottom: 10
    },
    subTitle: {
        fontSize: fonts.md,
        fontWeight: 'bold'
    },
    text: {
        fontSize: fonts.sm
    },
    inputView: {
        width: "90%",
        marginBottom: 10,
        justifyContent: "center",
    },
    appName: {
        fontWeight: "bold",
        fontSize: 30,
        color: "#000",
    },
    appDesc: {
        fontStyle: "italic",
        fontSize: 20,
        color: "#000",
    },
    loginBtn: {
        width: "80%",
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
    },
    loginText: {
        color: "white",
        fontSize: 15
    },
    topContainer: {
        flexDirection: "row",
        width: "85%",
        justifyContent: "space-between",
        marginBottom: 40
    },
    appNameContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoContainer: {
        alignItems: 'flex-start',
        justifyContent: 'center',
    }
});
