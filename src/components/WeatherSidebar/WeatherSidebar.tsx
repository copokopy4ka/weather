import Button from "../UI/Button/Button";
import WeatherInput from "../WeatherInput/WeatherInput";
import {useDispatch, useSelector} from 'react-redux'
import './weatherSidebar.scss'
import homeIcon from '../../img/icons/home.svg'
import { RootState } from "../../store/reducers";
import { getIcon } from "../../func";
import { getTime, getDay } from "../../func";
import { SET_ADDRESS, SET_COORDINATES } from "../../store/actions";

const WeatherSidebar = () => {
    const dispatch = useDispatch();
    const {weatherMetric, weatherImperial, address, isMetric} = useSelector((state: RootState) => state.weather);
    const geocoder = new google.maps.Geocoder;

    const setGeolocation = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            const latlng = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            }
            
            geocoder
                .geocode({location: latlng})
                .then((response) => {
                    const addressResultsArr = [...response.results[response.results.length - 2].address_components];

                    if (+addressResultsArr[addressResultsArr.length - 1].short_name) {
                        addressResultsArr.pop()
                    } else if (+addressResultsArr[0].short_name) {
                        addressResultsArr.shift()
                    }
                    addressResultsArr.splice(1, addressResultsArr.length - 2);
                    const addressResult: string = addressResultsArr.length > 1
                        ? `${addressResultsArr[0].short_name}, ${addressResultsArr[1].short_name}`
                        : `${addressResultsArr[0].long_name}`;

                        dispatch({type: SET_ADDRESS, payload: addressResult})
                })

            dispatch({type: SET_COORDINATES, payload: latlng})
        })
    }

    return (
        <div className="weather-sidebar">
            <div className="weather-sidebar__header">
                <WeatherInput/>
                <Button
                    className="weather-sidebar__btn"
                    onClick={() => setGeolocation()} >
                        <img src={homeIcon} alt="home" />
                </Button>
            </div>
            <div className="weather-sidebar__description">
                <h2 className="weather-sidebar__temp">
                    {isMetric ? Math.round(weatherMetric.current.temp) : Math.round(weatherImperial.current.temp)}°
                </h2>
                <div className="weather-sidebar__place-description">
                    <div style={address.length > 10
                        ? {fontSize: '20px'}
                        : address.length > 15
                            ? {fontSize: '16px'}
                            : {}} className="weather-sidebar__place">{address}</div>
                    <div className="weather-sidebar__day">{getDay(weatherMetric.current.dt)}, {getTime(weatherMetric.current.dt)}</div>
                </div>
                <div className="weather-sidebar__icon">
                    <img src={getIcon(weatherMetric.current.weather[0].icon)} alt="weather-icon" />
                </div>
            </div>
            <div className="weather-sidebar__details">
                <h3 className="weather-sidebar__details-title">Weather Details:</h3>
                <ul className="weather-sidebar__details-list">
                    <li className="weather-sidebar__details-item">
                        <div className="weather-sidebar__details-item-name">Clouds: </div>
                        <div className="weather-sidebar__details-item-value">
                            {weatherMetric.current.clouds}{weatherMetric.current.clouds !== 0 && '%'}
                        </div>
                    </li>
                    <li className="weather-sidebar__details-item">
                        <div className="weather-sidebar__details-item-name">Description: </div>
                        <div className="weather-sidebar__details-item-value">{weatherMetric.current.weather[0].description}</div>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default WeatherSidebar;