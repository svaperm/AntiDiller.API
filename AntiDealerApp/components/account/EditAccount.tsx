import React from "react";
import { View, StyleSheet, Alert } from "react-native";
import { UserContext } from "../../contexts/UserContext";
import { AuthContext } from "../../contexts/AuthContext";
import { editUserInfo } from "../../api/account";
import { fonts } from "../../styles/index";
import { TextInput, HelperText, Button } from "react-native-paper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useForm } from "react-hook-form";
import { UserTokens } from "../../api/auth";

interface FormData {
    email: string;
    password: string;
    confirmPassword: string;
}


function EditAccount() {
    const { updateTokens } = React.useContext(AuthContext);
    const { tokens } = React.useContext(UserContext);
    const { register, handleSubmit, setValue, errors, watch } = useForm<FormData>({
        defaultValues: {
            email: '',
            password: '',
            confirmPassword: ''
        }
    });
    const [password, setPassword] = React.useState('');

    React.useEffect(() => {
        register('email', {
            required: false,
            validate: (value) => {
                return value === '' || RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i).test(value)
            } // if email != '', check it
        });
        register('password', {
            minLength: 4
        });
        register('confirmPassword', {
            required: password !== '',
            validate: (value) => password === '' || value === watch('password', '')
        });
    }, [register])

    const applyBtnHandle = async (data: FormData) => {
        await editUserInfo(tokens as UserTokens, data.email, data.password).then(async (newTokens) => {
            if (newTokens !== null) {
                Alert.alert('Изменение профиля', 'Данные изменены');
                await updateTokens(newTokens);
            }
        });
    }

    return (
        <KeyboardAwareScrollView
            resetScrollToCoords={{ x: 0, y: 0 }}
            contentContainerStyle={styles.container}
            scrollEnabled={true}
            keyboardShouldPersistTaps="handled" >
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
                    label="Новый пароль"
                    secureTextEntry={true}
                    onChangeText={text => { setValue('password', text, true); setPassword(text); }}
                    returnKeyType="done" />
                <HelperText type='error' visible={!!errors.password}>Пароль должен содержать 4 или больше символов.</HelperText>
            </View>
            <View style={styles.inputView}>
                <TextInput
                    label="Подтвердите пароль"
                    secureTextEntry={true}
                    onChangeText={text => setValue('confirmPassword', text, true)}
                    returnKeyType="done"
                    disabled={password === ''} />
                <HelperText type='error' visible={!!errors.confirmPassword}>Пароли должны совпадать.</HelperText>
            </View>
            <Button style={styles.loginBtn} mode="contained" onPress={handleSubmit(applyBtnHandle)}>Подтвердить</Button>
        </KeyboardAwareScrollView>
    );
}

export default EditAccount;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        alignItems: 'center',
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
