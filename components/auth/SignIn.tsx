import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput, Button, HelperText } from "react-native-paper";
import { MaterialIcons } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { colors } from "../../styles";

import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from "../../routes/authStack";
import { RouteProp } from '@react-navigation/native';
import { AuthContext } from "../../contexts/AuthContext";
import { useForm } from 'react-hook-form';

type SignInScreenRouteProp = RouteProp<AuthStackParamList, 'SignIn'>;
type SignInScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'SignIn'>;

type SignInProps = {
    route: SignInScreenRouteProp;
    navigation: SignInScreenNavigationProp;
}

interface FormData {
    email: string;
    password: string;
}

export default function SignIn({ route, navigation }: SignInProps) {
    const { register, handleSubmit, setValue, errors } = useForm<FormData>();
    const { signIn } = React.useContext(AuthContext);

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
    }, [register]);

    const registerButtonHadler = () => {
        navigation.navigate('Register')
    }

    const signInBtn = (data: FormData) => {
        signIn(data.email, data.password);
    }

    return (
        <KeyboardAwareScrollView
            style={{ backgroundColor: colors.primary }}
            resetScrollToCoords={{ x: 0, y: 0 }}
            contentContainerStyle={styles.container}
            scrollEnabled={true} >
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
            <Button style={styles.loginBtn} mode="contained" onPress={handleSubmit(signInBtn)}>Войти</Button>
            <Button style={styles.loginBtn} onPress={registerButtonHadler}>Зарегистрироваться</Button>
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
