import React from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback, Image, ScrollView, TouchableOpacity, Modal } from "react-native";
import { UserContext } from "../../contexts/UserContext";
import { getReport } from "../../api/report";
import { colors, fonts } from "../../styles/index";
import { User, Report } from "../../types";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AccountStackParamList } from "../../routes/account/accountStack";
import { List, TextInput, ActivityIndicator } from 'react-native-paper';
import MapView, { Marker } from "react-native-maps";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ImageViewer from 'react-native-image-zoom-viewer';

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
    const [imageUri, setImageUri] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(true);
    const [imageViewVisible, setImageViewVisible] = React.useState(false);

    React.useEffect(() => {
        const getData = async () => {
            await getReport(tokens, id).then((data) => {
                setReport(data);
                setImageUri(data.reportPhoto);
            });
            setIsLoading(false);
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

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size='large' />
            </View>
        )
    }

    return (
        <KeyboardAwareScrollView
            resetScrollToCoords={{ x: 0, y: 0 }}
            contentContainerStyle={styles.container}
            scrollEnabled={true}
            keyboardShouldPersistTaps="handled" >
            <Text style={styles.title}>Заявка №{report.id}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {imageUri !== '' &&
                    <TouchableWithoutFeedback onPress={() => setImageViewVisible(true)}>
                        <Image source={{ uri: `data:image/png;base64,${imageUri}` }} style={{ height: 200, width: '100%' }} />
                    </TouchableWithoutFeedback>
                }
            </View>
            <Modal
                visible={imageViewVisible}
                transparent={true}
                onRequestClose={() => setImageViewVisible(false)}>
                <ImageViewer
                    imageUrls={[{ url: `data:image/png;base64,${imageUri}` }]}
                    enableSwipeDown={true}
                    onSwipeDown={() => setImageViewVisible(false)} />
            </Modal>

            {/* <TextInput multiline={true} style={styles.inputView} label='Описание проблемы' onChangeText={text => setValue('description', text, true)} /> */}

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
            <View style={{ flexDirection: 'row' }}>
                <Text style={styles.reportText}>Категория заявки: {report.reportType}</Text>
            </View>
            <Text style={styles.reportText}>Статус рассмотрения заявки: {report.reportStatus}</Text>
            <Text style={styles.reportText}>Описание:</Text>
            <ScrollView>
                <Text>{report.description}</Text>
            </ScrollView>
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