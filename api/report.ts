import axios from "axios";
import { Alert } from 'react-native';
import { api_host, POST_REQUEST, fetchWithCredentials, GET_REQUEST } from "./index";
import { LatLng } from "react-native-maps";
import { UserTokens } from "./auth";
import { ImageInfo } from "expo-image-picker/build/ImagePicker.types";
import { User, Report } from "../types";

const ADD_REPORT_URL = 'reports/'
const GET_REPORT_URL = 'reports'
const GET_USER_REPORTS_URL = 'reports/getReports'

interface ReportPost {
    reportType: string;
    description: string;
    image: ImageInfo;
    location: LatLng;
}

export async function postReport(tokens: UserTokens | null, data: ReportPost, ) {
    let res;
    tokens = tokens as UserTokens;

    await fetchWithCredentials(ADD_REPORT_URL,
        {
            type: POST_REQUEST, body: {
                reportType: data.reportType,
                description: data.description,
                reportPhoto: data.image.base64,
                latitude: data.location.latitude,
                longitude: data.location.longitude
            }
        }, tokens, {}).then((response) => {
            res = response.data;
            Alert.alert('Заявка отправлена на рассмотрение', `Номер заявки: ${res.id}`)
        }).catch((error) => {
            Alert.alert("Ошибка", error.response.data);
        });
}

export async function getUserReports(tokens: UserTokens | null) {
    let res: Report[] = [];
    tokens = tokens as UserTokens;

    await fetchWithCredentials(GET_USER_REPORTS_URL,
        {
            type: GET_REQUEST
        }, tokens, {}).then((response) => {
            res = response.data;
        }).catch((error) => {
            Alert.alert("Ошибка", error.response.data);
        });

    return res;
}

export async function getReport(tokens: UserTokens | null, id: number) {
    let res: Report = {} as Report;
    tokens = tokens as UserTokens;

    await fetchWithCredentials(GET_REPORT_URL + "?id=" + id, { type: GET_REQUEST }, tokens, {})
        .then((response) => {
            res = response.data
        })
        .catch((error) => {
            Alert.alert("Ошибка", error.response.data);
        });

    return res;
}
