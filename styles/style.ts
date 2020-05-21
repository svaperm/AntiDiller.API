import { StyleSheet } from 'react-native';

export default function Style() {
    let mainColor = '#b2dfdb'

    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: mainColor,
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
} 