import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput, Button, HelperText } from "react-native-paper";
import { MaterialIcons } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from "../../routes/authStack";
import { RouteProp } from '@react-navigation/native';

import { useForm } from "react-hook-form";
import { AuthContext } from '../../contexts/AuthContext';

import { colors } from "../../styles";

type RegisterScreenRouteProp = RouteProp<AuthStackParamList, 'Register'>;
type RegisterScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Register'>;

type RegisterProps = {
    route: RegisterScreenRouteProp;
    navigation: RegisterScreenNavigationProp;
}

interface FormData {
    email: string;
    password: string;
    confirmPassword: string;
}

export default function Register({ route, navigation }: RegisterProps) {
    const { signUp } = React.useContext(AuthContext);
    const { register, handleSubmit, setValue, errors, watch } = useForm<FormData>();

    React.useEffect(() => {
        register('email', {
            required: true,
            pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "invalid email address"
            }
        });
        register('password', {
            required: true,
            minLength: 4
        });
        register('confirmPassword', {
            required: true,
            validate: (value) => value === watch('password')
        });
    }, [register])

    const registerBtnHandle = (data: FormData) => {
        signUp(data.email, data.password);
    }

    return (
        <KeyboardAwareScrollView
            style={{ backgroundColor: colors.primary }}
            resetScrollToCoords={{ x: 0, y: 0 }}
            contentContainerStyle={styles.container}
            scrollEnabled={true}
            keyboardShouldPersistTaps="handled" >
            <View style={styles.topContainer}>
                <View style={styles.logoContainer}>
                    <MaterialIcons name="mood-bad" size={125} color="black" />
                </View>
                <View style={styles.appNameContainer}>
                    <Text style={styles.appName}>АнтиДилер</Text>
                    <Text style={styles.appDesc}>против наркоты</Text>
                </View>
            </View>
            <View style={styles.inputView}>
                <TextInput
                    label="Email"
                    autoCompleteType="email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    onChangeText={text => setValue('email', text, true)}
                    returnKeyType="next" />
                <HelperText type='error' visible={!!errors.email}>Введите корректный Email</HelperText>
            </View>
            <View style={styles.inputView}>
                <TextInput
                    label="Пароль"
                    secureTextEntry={true}
                    onChangeText={text => setValue('password', text, true)}
                    returnKeyType="done" />
                <HelperText type='error' visible={!!errors.password}>Пароль должен содержать 4 или больше символов.</HelperText>
            </View>
            <View style={styles.inputView}>
                <TextInput
                    label="Подтвердите пароль"
                    secureTextEntry={true}
                    onChangeText={text => setValue('confirmPassword', text, true)}
                    returnKeyType="done" />
                <HelperText type='error' visible={!!errors.confirmPassword}>Пароли должны совпадать.</HelperText>
            </View>
            <Button style={styles.loginBtn} mode="contained" onPress={handleSubmit(registerBtnHandle)}>Зарегистрироваться</Button>
            <Button style={styles.loginBtn} onPress={() => navigation.goBack()}>Отмена</Button>
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
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
