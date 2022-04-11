import { IDefaultState } from "../../types/types";
import { 
    SET_WEATHER_I,
    SET_WEATHER_M,
    SET_COORDINATES, 
    SET_ADDRESS,
    SET_IS_METRIC,
    SET_IS_DAILY
} from "../actions";


export const defaultState: IDefaultState = {
    weatherMetric: {},
    weatherImperial: {},
    coordinates: {
        lat: 49.233238,
        lng: 28.473261,
    },
    address: 'Vinnytsia, UA',
    isMetric: true,
    isDaily: false
}

export const weatherReducer = (state = defaultState, action: any) => {
    switch (action.type) {
        case SET_COORDINATES:
            return {...state, coordinates: {...action.payload}};
        case SET_ADDRESS:
            return {...state, address: action.payload}
        case SET_WEATHER_M:
            return {...state, weatherMetric: {...action.payload}};
        case SET_WEATHER_I:
            return {...state, weatherImperial: {...action.payload}};
        case SET_IS_METRIC:
            return {...state, isMetric: !state.isMetric}
        case SET_IS_DAILY:
            return {...state, isDaily: !state.isDaily};
        default:
            return state;
    }
}