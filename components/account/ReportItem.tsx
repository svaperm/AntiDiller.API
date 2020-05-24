import React from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback, Image } from "react-native";
import { UserContext } from "../../contexts/UserContext";
import { getReport } from "../../api/report";
import { colors, fonts } from "../../styles/index";
import { User, Report } from "../../types";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AccountStackParamList } from "../../routes/account/accountStack";
import { List, TextInput } from 'react-native-paper';
import MapView, { Marker } from "react-native-maps";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

type ReportItemScreenRouteProp = RouteProp<AccountStackParamList, 'ReportItem'>;
type ReportItemScreenNavigationProp = StackNavigationProp<AccountStackParamList, 'ReportItem'>;

type ReportItemProps = {
    route: ReportItemScreenRouteProp;
    navigation: ReportItemScreenNavigationProp;
}

export function ReportItem({ route, navigation }: ReportItemProps) {
    const { id, latitude, longitude } = route.params.report;
    const { tokens } = React.useContext(UserContext);
    const [report, setReport] = React.useState({} as Report)
    //let imageView = React.createRef<Image>();
    const [imageUri, setImageUri] = React.useState('')
    React.useEffect(() => {
        const getData = async () => {
            await getReport(tokens, id).then((data) => {
                setReport(data);
                setImageUri(data.reportPhoto);
                //imageView.current?.setNativeProps({ source: { uri: data.reportPhoto } })
            })
        }
        getData();
    }, []);
    // let reportIconColor = '';
    // let reportIcon = '';
    // switch (report.reportStatus.id) {
    //     case 1: // processing
    //         reportIconColor = 'F2C94C' // yellow
    //         reportIcon = 'access_time'
    //         break;
    //     case 2: // accepted
    //         reportIconColor = '4CAF50' // green
    //         reportIcon = 'done'
    //         break;
    //     case 3: // rejected
    //         reportIconColor = 'F2453D' // red
    //         reportIcon = 'block'
    //     default:
    //         reportIconColor = '919191' // grey
    //         reportIcon = 'help'
    // }

    return (
        <KeyboardAwareScrollView
            resetScrollToCoords={{ x: 0, y: 0 }}
            contentContainerStyle={styles.container}
            scrollEnabled={true}
            keyboardShouldPersistTaps="handled" >
            <View style={{ flexDirection: 'row' }}>
                <Text style={styles.reportText}>Категория заявки:</Text>
            </View>
            {/* <TextInput multiline={true} style={styles.inputView} label='Описание проблемы' onChangeText={text => setValue('description', text, true)} /> */}

            <Text style={styles.text}>Фотография:</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={{ uri: imageUri }} style={{ width: 200, height: 200 }}  />
            </View>

            <Text style={styles.text}>Местоположение (нажмите на карту):</Text>
            <TouchableWithoutFeedback onPress={() => navigation.navigate('LocationViewer', { location: { latitude: latitude, longitude: longitude } })}>
                <MapView
                    style={styles.mapView}
                    initialRegion={{
                        latitude: latitude,
                        longitude: longitude,
                        latitudeDelta: 0.6379651302028009,
                        longitudeDelta: 0.6750047206878591
                    }}
                    zoomEnabled={false}
                    rotateEnabled={false}
                    scrollEnabled={false}
                    pitchEnabled={false}>
                    <Marker coordinate={{ latitude: latitude, longitude: longitude }}></Marker>
                </MapView>
            </TouchableWithoutFeedback>
        </KeyboardAwareScrollView>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    mapView: {
        alignSelf: 'center',
        width: '90%',
        height: 100,
        margin: 5
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