import React, { MutableRefObject, RefObject } from "react";
import { View, StyleSheet, Alert, Image, Dimensions, TextInput } from "react-native";
import { UserContext } from "../../contexts/UserContext";
import { AuthContext } from "../../contexts/AuthContext";
import { editUserInfo } from "../../api/account";
import { fonts } from "../../styles/index";
import { HelperText, Button, Text, Menu, Divider } from "react-native-paper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useForm } from "react-hook-form";
import { Octicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import MapView, { Region, Marker, LatLng, Point } from "react-native-maps";
import * as Location from 'expo-location';
import { getSearchResults, GoogleApiResponse, Prediction } from "../../api/googleMapsApi";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import _ from 'lodash'
import { RouteProp } from "@react-navigation/native";
import { ReportStackParamList } from "../../routes/report/reportStack";
import { StackNavigationProp } from "@react-navigation/stack";

type LocationPickerScreenRouteProp = RouteProp<ReportStackParamList, 'LocationPicker'>;
type LocationPickerScreenNavigationProp = StackNavigationProp<ReportStackParamList, 'LocationPicker'>;

type LocationPickerProps = {
    route: LocationPickerScreenRouteProp;
    navigation: LocationPickerScreenNavigationProp;
}


export function LocationPicker({ route, navigation }: LocationPickerProps) {
    const [location, setLocation] = React.useState({} as Location.LocationData)
    const [region, setRegion] = React.useState({} as Region)
    const [searchText, setSearchText] = React.useState('')
    const [markerPosition, setMarkerPosition] = React.useState({latitude: 57.882959897925744, longitude: 56.23508658260107} as LatLng)
    let mapView = React.useRef<MapView>(null);
    const { callback } = route.params

    const initialResults: GoogleApiResponse = {
        predictions: [],
        status: ''
    }
    const [searchResults, setSearchResults] = React.useState(initialResults);

    React.useEffect(() => {
        (async () => {
            let { status } = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Ошибка', 'Для выбора местоположения требуется доступ к GPS')
            }

            await Location.getCurrentPositionAsync().then((location) => {
                setLocation(location);
                setMarkerPosition(location.coords)
                mapView.current?.animateToRegion({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.4379651302028009,
                    longitudeDelta: 0.4750047206878591
                }, 50);
            });
        })();
    }, []);

    const onChangeSearchText = async (text: string) => {
        setSearchText(text);
        let results = await getSearchResults(text, { latitude: 57.882959897925744, longitude: 56.23508658260107 });
        console.log(results);
        setSearchResults(results);
    }

    const onChangeSearchTextDebounced = _.debounce(onChangeSearchText, 1000);

    const predictions = searchResults.predictions.map((prediction) => {
        const onPress = () => {
            setSearchText(prediction.description);
        }
        return (
            <Text key={prediction.id} style={styles.predictions} onPress={onPress}>{prediction.description}</Text>
        )
    });

    const onConfirmPress = () => {
        callback(markerPosition);
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <MapView style={styles.mapStyle}
                showsUserLocation={true}
                followsUserLocation={false}
                initialRegion={{
                    latitude: 57.882959897925744,
                    longitude: 56.23508658260107,
                    latitudeDelta: 0.4379651302028009,
                    longitudeDelta: 0.4750047206878591
                }}
                ref={mapView}
                onPress={(e) => {
                    setMarkerPosition(e.nativeEvent.coordinate); 
                }}>
                <Marker
                    coordinate={markerPosition}
                    draggable={true}
                    onDragEnd={(e) => { setMarkerPosition(e.nativeEvent.coordinate) }}
                    />
            </MapView>
            {/* <TextInput style={styles.searchInput} placeholder="Введите адрес..." value={searchText} onChangeText={text => onChangeSearchTextDebounced(text)} />
            {!!searchResults.predictions && predictions} */}
            <Button mode='contained' style={styles.confirmButton} onPress={onConfirmPress}>Подтвердить место</Button>
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