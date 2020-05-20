import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native';
import { TextInput, Button } from "react-native-paper";
import { MaterialIcons } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from "../../routes/authStack";
import { RouteProp } from '@react-navigation/native';
import { AuthContext } from "../../contexts/AuthContext";

type SignInScreenRouteProp = RouteProp<AuthStackParamList, 'SignIn'>;
type SignInScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'SignIn'>;

type SignInProps = {
    route: SignInScreenRouteProp;
    navigation: SignInScreenNavigationProp;
}

export default function SignIn({ route, navigation }: SignInProps) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { signIn } = React.useContext(AuthContext);

    const registerButtonHadler = () => {
        navigation.navigate('Register')
    }

    return (
        <KeyboardAwareScrollView
            style={{ backgroundColor: '#b2dfdb' }}
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
                    onChangeText={text => setEmail(text)}
                    returnKeyType="next" />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    label="Password"
                    secureTextEntry={true}
                    onChangeText={text => setPassword(text)}
                    returnKeyType="done" />
            </View>
            <Button style={styles.loginBtn} mode="contained" onPress={() => signIn(email, password)}>Войти</Button>
            <Button style={styles.loginBtn} onPress={registerButtonHadler}>Зарегистрироваться</Button>
        </KeyboardAwareScrollView>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#b2dfdb',
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
