import React from "react";
import { View, StyleSheet, Alert, Image, Dimensions, TextInput } from "react-native";
import { fonts } from "../../styles/index";
import { Button, Text, Menu, Divider } from "react-native-paper";
import MapView, { Region, Marker, LatLng, Point } from "react-native-maps";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AccountStackParamList } from "../../routes/account/accountStack";

type LocationViewerScreenRouteProp = RouteProp<AccountStackParamList, 'LocationViewer'>;
type LocationViewerScreenNavigationProp = StackNavigationProp<AccountStackParamList, 'LocationViewer'>;

type LocationViewerProps = {
    route: LocationViewerScreenRouteProp;
    navigation: LocationViewerScreenNavigationProp;
}

export function LocationViewer({ route, navigation }: LocationViewerProps) {
    const { location } = route.params

    return (
        <View style={styles.container}>
            <MapView style={styles.mapStyle}
                showsUserLocation={true}
                followsUserLocation={false}
                initialRegion={{
                    latitude: location.latitude,
                    longitude: location.longitude,
                    latitudeDelta: 0.4379651302028009,
                    longitudeDelta: 0.4750047206878591
                }}>
                <Marker
                    coordinate={{ latitude: location.latitude, longitude: location.longitude }}
                    draggable={false} />
            </MapView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        // flex: 1,
        // alignItems: 'flex-start',
        // justifyContent: 'flex-start',
    },
    mapStyle: {
        ...StyleSheet.absoluteFillObject
        // width: Dimensions.get('window').width,
        // height: Dimensions.get('window').height,
    },
    searchInput: {
        backgroundColor: 'white',
        height: 40,
        marginTop: 50,
        marginLeft: 5,
        marginRight: 5,
        borderWidth: 0.5,
        padding: 5,
        paddingLeft: 10,
        borderRadius: 20,
    },
    predictions: {
        backgroundColor: 'white',
        padding: 5,
        fontSize: 18,
        borderWidth: 0.5,
        marginLeft: 5,
        marginRight: 5
    },
    confirmButton: {
        position: 'absolute',
        bottom: 10,
        right: 10
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