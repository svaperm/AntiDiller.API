import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { fonts, colors } from "../../styles";
import { List, ActivityIndicator } from "react-native-paper";
import { AuthContext } from "../../contexts/AuthContext";
import { UserContext } from "../../contexts/UserContext";
import { getStatistics, StatisticsItem } from "../../api/statistics";


export function Statistics() {
    const { tokens, needsUpdate } = React.useContext(UserContext);
    const [statistics, setStatistics] = React.useState([] as StatisticsItem[]);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        const getData = async () => {
            await getStatistics(tokens).then((data) => {
                setStatistics(data);
            });
            setIsLoading(false);
        }

        getData();
    }, [needsUpdate]);

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size='large' />
            </View>
        )
    }

    const listItems = statistics.map((item, i) => {
        return (
            <List.Item key={i}
                title={`${item.regionName}`}
                left={props => <Text {...props} style={{paddingTop: 8}}>{i+1}.</Text>}
                right={props => <Text {...props} style={{paddingTop: 8, color: '#919191'}}>Открытых заявок: {item.reportCount}</Text>}
            />
        )
    })


    return (
        <View style={styles.container}>
            {statistics.length ? <List.Section style={{ width: '100%' }} title='Статистика по регионам России'>{listItems}</List.Section> : <Text style={styles.text}>Статистика пуста :(</Text>}
        </View>
    );
}

export default Statistics;

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
    reportText: {
        fontSize: fonts.sm,
        marginTop: 5
    },
    inputView: {
        width: "100%",
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