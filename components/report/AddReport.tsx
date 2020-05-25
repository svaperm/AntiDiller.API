import React from "react";
import { View, StyleSheet, Image, TouchableWithoutFeedback, Alert } from "react-native";
import { fonts } from "../../styles/index";
import { TextInput, HelperText, Button, Text, Menu } from "react-native-paper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useForm } from "react-hook-form";
import * as ImagePicker from 'expo-image-picker';
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ReportStackParamList } from "../../routes/report/reportStack";
import MapView, { Marker, LatLng } from "react-native-maps";
import { ImageInfo } from "expo-image-picker/build/ImagePicker.types";
import { postReport } from "../../api/report";
import { UserContext } from "../../contexts/UserContext";
import { AuthContext } from "../../contexts/AuthContext";

type AddReportScreenRouteProp = RouteProp<ReportStackParamList, 'AddReport'>;
type AddReportScreenNavigationProp = StackNavigationProp<ReportStackParamList, 'AddReport'>;

type AddReportProps = {
    route: AddReportScreenRouteProp;
    navigation: AddReportScreenNavigationProp;
}

interface FormData {
    reportType: string;
    description: string;
    image: ImageInfo;
    location: LatLng;
}

export function AddReport({ route, navigation }: AddReportProps) {
    const { tokens } = React.useContext(UserContext);
    const { refreshData } = React.useContext(AuthContext);
    const [menuVisible, setMenuVisible] = React.useState(false);
    const [image, setImage] = React.useState(null as ImageInfo | null)
    const [location, setLocation] = React.useState({ latitude: 0, longitude: 0 } as LatLng)

    let reportTypes = ['Реклама', 'Закладка', 'Сайт', 'Человек', 'Место', 'Другое'];
    const [currentReportType, setCurrentReportType] = React.useState(reportTypes[0]);

    const { register, handleSubmit, setValue, errors, reset } = useForm<FormData>({
        defaultValues: {
            reportType: reportTypes[0],
            description: '',
            location: undefined
        }
    });
    React.useEffect(() => {
        register('reportType', {
            required: true
        });
        register('description', {
            required: true,
            maxLength: 1000
        });
        register('image', {
            required: true
        });
        register('location', {
            required: true
        });

    }, [register])

    const menuItems = reportTypes.map((type, i) => {
        const onPress = () => {
            setValue('reportType', type, true);
            setCurrentReportType(type); // set report type
            setMenuVisible(false); // close menu
        }
        return (
            <Menu.Item key={i} title={type} onPress={onPress} />
        );
    })

    const _pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                quality: 1,
                base64: true
            });
            if (!result.cancelled) {
                setValue('image', result, true);
                setImage(result);
            }
            console.log(result);
        } catch (E) {
            console.log(E);
        }
    };

    const _setLocation = (location: LatLng) => {
        setLocation(location);
        setValue('location', location, true);
    }

    const submitBtnHandle = async (data: FormData) => {
        await postReport(tokens, data)
            .then(() => { _resetForm(); refreshData(); })
    }

    const _resetForm = () => {
        reset();
        setImage(null);
        setLocation({ latitude: 0, longitude: 0 } as LatLng);
    }

    return (
        <KeyboardAwareScrollView
            resetScrollToCoords={{ x: 0, y: 0 }}
            contentContainerStyle={styles.container}
            scrollEnabled={true}
            keyboardShouldPersistTaps="handled" >
            <View style={{ flexDirection: 'row' }}>
                <Text style={styles.reportText}>Категория заявки:</Text>
                <Menu
                    visible={menuVisible}
                    onDismiss={() => setMenuVisible(false)}
                    anchor={
                        <Button icon="chevron-down" onPress={() => setMenuVisible(true)}>{currentReportType}</Button>
                    }>
                    {menuItems}
                </Menu>
            </View>
            <TextInput multiline={true} style={styles.inputView} label='Описание проблемы' onChangeText={text => setValue('description', text, true)} />
            <HelperText type='error' visible={!!errors.description}>Введите описание проблемы</HelperText>

            <Text style={styles.text}>Фотография:</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {!!image && <Image source={{ uri: image.uri }} style={{ width: 200, height: 200 }} />}
                <View style={{ flexDirection: 'column' }}>
                    <Button mode='outlined' onPress={_pickImage} style={{ margin: 5 }}>Выбрать фото...</Button>
                    <Button mode='outlined' onPress={() => setImage(null)} style={{ margin: 5 }} disabled={image === null}>Удалить фото</Button>
                    <HelperText type='error' visible={!!errors.image}>Выберите фото</HelperText>
                </View>
            </View>

            <Text style={styles.text}>Местоположение (нажмите на карту):</Text>
            <TouchableWithoutFeedback onPress={() => navigation.navigate('LocationPicker', { callback: _setLocation })}>
                <MapView
                    style={styles.mapView}
                    initialRegion={{
                        latitude: 58.012999,
                        longitude: 56.23508658260107,
                        latitudeDelta: 0.6379651302028009,
                        longitudeDelta: 0.6750047206878591
                    }}
                    zoomEnabled={false}
                    rotateEnabled={false}
                    scrollEnabled={false}
                    pitchEnabled={false}>
                    {!!location && <Marker coordinate={{ latitude: location.latitude, longitude: location.longitude }}></Marker>}
                </MapView>
            </TouchableWithoutFeedback>
            <HelperText type='error' visible={!!errors.location}>Укажите местоположение</HelperText>
            <Button mode='contained' style={{ position: 'absolute', bottom: 10, width: '90%', alignSelf: 'center' }} onPress={handleSubmit(submitBtnHandle)}>Отправить заявку</Button>
            {/* <Button mode='contained' style={{ position: 'absolute', bottom: 20, width: '90%', alignSelf: 'center' }} onPress={() => _resetForm()}>reset</Button> */}
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