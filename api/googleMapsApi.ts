import _ from "lodash";
import Constants from 'expo-constants';
import { LatLng } from "react-native-maps";
import axios from "axios";

export interface GoogleApiResponse {
    status: string;
    predictions: Prediction[];
}

export interface Prediction {
    id: string;
    description: string;
}

const apiKey = Constants.manifest.extra.googleAutoCompleteAPIKey;
const google_api = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${apiKey}&`;
export async function getSearchResults(input: string, location: LatLng): Promise<GoogleApiResponse> {
    let results: GoogleApiResponse = {
        predictions: [],
        status: ''
    }
    await axios.get<GoogleApiResponse>(`${google_api}input=${input}&location=${location.latitude},${location.longitude}&radius=100000`)
        .then((response) => {
            results = response.data;
        })
        .catch((err) => {
            //console.log(err);
        });

    return results;
}