import axios from "axios";
import { Alert } from 'react-native';
import { api_host, POST_REQUEST, fetchWithCredentials, GET_REQUEST } from "./index";
import { LatLng } from "react-native-maps";
import { UserTokens } from "./auth";
import { ImageInfo } from "expo-image-picker/build/ImagePicker.types";
import { User, Report } from "../types";

const GET_STATISTICS_URL = 'statistics/'

export interface StatisticsItem {
    regionName: string;
    reportCount: number;
}

export async function getStatistics(tokens: UserTokens | null) {
    let res: StatisticsItem[] = [];

    tokens = tokens as UserTokens;

    await fetchWithCredentials(GET_STATISTICS_URL,
        { type: GET_REQUEST }, tokens, {}).then((response) => {
            res = response.data;
        }).catch((error) => {
            Alert.alert("Ошибка", error.response.data);
        });

    return res;
}