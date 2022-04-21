import { Wrapper } from "@googlemaps/react-wrapper";
import Map from "../Map/Map";
import { mapsApiKey } from "../../variables";
import './highlights.scss'
import { useSelector } from "react-redux";
import { RootState } from "../../store/reducers";
import { getTime, getWindName } from "../../func";
import tempMax from "../../img/icons/temp-max.png";
import tempMin from "../../img/icons/temp-min.png";
import sunrise from "../../img/icons/sunrise.png";
import sunset from "../../img/icons/sunset.png";

const Highlights = () => {
    const {weatherMetric, weatherImperial, isMetric} = useSelector((state: RootState) => state.weather)

    return (
        <div className="highlights">
            <h3 className="highlights__title">Today`s Highlights</h3>
            <div className="highlights-content">
                <ul className="highlights__list">
                    <li className="highlights__item">
                        <div className="highlights__item-title uv">UV index</div>
                        <div className="highlights__item-uv-content">
                            <div className="highlights__item-uv-value">{weatherMetric.current.uvi}</div>
                            <div className="highlights__item-uv-img">
                                <span className="highlights__item-uv-num one">1</span>
                                <span className="highlights__item-uv-num three">3</span>
                                <span className="highlights__item-uv-num nine">9</span>
                                <span className="highlights__item-uv-num twelve">12</span>
                                <svg className="highlights__item-uv-index" x="0px" y="0px"
                                    viewBox="-5 -3 210 110" enableBackground="new 0 0 200 103">
                                        <defs>
                                            <linearGradient id="lgrad" x1='0' x2='1' y1='0' y2='0'>
                                                <stop offset='0%' style={{stopColor: 'rgb(0, 0, 139)'}}></stop>
                                                <stop offset={`${weatherMetric.current.uvi / 12 * 100}%`} style={{stopColor: 'rgb(0, 0, 139)'}}></stop>
                                                <stop offset={`${weatherMetric.current.uvi / 12 * 100}%`} style={{stopColor: '#fff'}}></stop>
                                                <stop offset='100%' style={{stopColor: '#fff'}}></stop>
                                            </linearGradient>
                                        </defs>
                                    <path fill="none" stroke="url(#lgrad)" strokeWidth="16" strokeLinecap="round" d="M195.675,98.851
                                        c0-52.17-42.822-94.463-95.644-94.463c-52.823,0-95.644,42.293-95.644,94.463"/>
                                </svg>
                            </div>
                        </div>
                    </li>
                    <li className="highlights__item">
                        <div className="highlights__item-title">Wind Status</div>
                        <div className="highlights__item-value highlights__item-wind-value">
                            {isMetric ? weatherMetric.current.wind_speed + ` km/h`: weatherImperial.current.wind_speed + ` miles/hour`}
                        </div>
                        <div className="highlights__item-wind-name">{getWindName(weatherMetric.current.wind_speed)}</div>
                    </li>
                    <li className="highlights__item">
                        <div className="highlights__item-title">Sunrise &#38; Sunset</div>
                        <div className="highlights__item-value">
                            <div className="highlights__item-sunrise">
                                <div className="highlights__item-sun-icon">
                                    <img src={sunrise} alt="sunrise" />
                                </div>
                                {getTime(weatherMetric.current.sunrise)}
                            </div>
                            <div className="highlights__item-sunset">
                                <div className="highlights__item-sun-icon">
                                    <img src={sunset} alt="sunset" />
                                </div>
                                {getTime(weatherMetric.current.sunset)}
                            </div>
                        </div>
                    </li>
                    <li className="highlights__item">
                        <div className="highlights__item-title">Humidity</div>
                        <div className="highlights__item-humidity">
                            <div className="highlights__item-value-wrapper">
                                <div className="highlights__item-value">{weatherMetric.current.humidity}%</div>
                                <div className="highlights__item-description">
                                    {weatherMetric.current.humidity > 70
                                    ? 'High humidity'
                                    : weatherMetric.current.humidity < 30
                                        ? 'Low humidity'
                                        : 'Fair humidity'
                                    }
                                </div>
                            </div>
                            <div 
                                className="highlights__item-humidity-icon"
                                style={{background: `linear-gradient(360deg, rgb(0, 136, 238) ${weatherMetric.current.humidity}%, rgb(255, 255, 255) 50%)`}}></div>
                        </div>
                    </li>
                    <li className="highlights__item">
                        <div className="highlights__item-title">Visibility</div>
                        <div className="highlights__item-visibility">
                            <div className="highlights__item-value">{weatherMetric.current.visibility}</div>
                            <div className="highlights__item-description">average visibility, metres</div>
                        </div>
                    </li>
                    <li className="highlights__item">
                        <div className="highlights__item-title">Min &#38; Max temperature</div>
                        <div className="highlights__item-value">
                            <div className="highlights__item-temp-max">
                                <div className="highlights__item-temp-icon">
                                    <img src={tempMax} alt="tempMax" />
                                </div>
                                <div>{Math.round(weatherMetric.daily[0].temp.max)} °C</div>
                            </div>
                            <div className="highlights__item-temp-min">
                                <div className="highlights__item-temp-icon">
                                    <img src={tempMin} alt="tempMin" />
                                </div>
                                <div>{Math.round(weatherMetric.daily[0].temp.min)} °C</div>
                            </div>
                        </div>
                    </li>
                </ul>
                <Wrapper apiKey={mapsApiKey}>
                    <Map/>
                </Wrapper>
            </div>
        </div>
    )
}

export default Highlights;