import { Dispatch } from "react";
import axios from 'axios'

export const SET_WEATHER_M = 'SET_WEATHER_M';
export const SET_WEATHER_I = 'SET_WEATHER_I';
export const SET_COORDINATES = 'SET_COORDINATES';
export const SET_ADDRESS = 'SET_ADDRESS';
export const SET_IS_METRIC = 'SET_IS_METRIC';
export const SET_IS_DAILY = 'SET_IS_DAILY';

export const fetchWeather = (url: {metric: string, imperial: string}) => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const response_m = await axios.get(url.metric);
            const response_i = await axios.get(url.imperial);

            dispatch({type: SET_WEATHER_M, payload: response_m.data});
            dispatch({type: SET_WEATHER_I, payload: response_i.data});
        } catch (err: any) {
            console.log(err)
        }
    }
}