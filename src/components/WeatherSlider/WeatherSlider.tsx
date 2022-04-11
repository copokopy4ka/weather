import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick"
import { getDay, getIcon, getTime } from "../../func";
import { SET_IS_DAILY, SET_IS_METRIC } from "../../store/actions";
import { RootState } from "../../store/reducers";
import Button from "../UI/Button/Button";
import './weatherSlider.scss'

const WeatherSlider = () => {
    const dispatch = useDispatch()
    const {weatherImperial, weatherMetric, isMetric, isDaily} = useSelector((state: RootState) => state.weather)
    const settings = {
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
              breakpoint: 1200,
              settings: {
                slidesToShow: 3
              }
            },
            {
              breakpoint: 1050,
              settings: {
                slidesToShow: 2,
              }
            }
        ]
    }
    let weatherArr = weatherMetric;

    if (isMetric) {
        weatherArr = weatherMetric;
    } else {
        weatherArr = weatherImperial;
    }

    const switchIsMetric = () => {
        dispatch({type: SET_IS_METRIC})
    }

    const switchIsDaily = () => {
        dispatch({type: SET_IS_DAILY})
    }

    return (
        <div>
            <div className="slider-buttons">
                <div className="slider-buttons-wrapper">
                    <Button
                        disabled={isDaily ? false : true}
                        onClick={switchIsDaily}
                        style={isDaily
                                ? {}
                                : {fontWeight: '400', borderColor: 'transparent', backgroundColor: '#fff', color: '#000'}
                            }
                        className="slider-btn">
                            Today
                    </Button>
                    <Button
                        disabled={isDaily ? true : false}
                        onClick={switchIsDaily}
                        style={isDaily
                            ? {fontWeight: '400', borderColor: 'transparent', backgroundColor: '#fff', color: '#000'}
                            : {}
                        }
                        className="slider-btn">
                            Week
                    </Button>
                </div>
                <div className="slider-buttons-wrapper">
                    <Button
                        disabled={isMetric ? true : false}
                        onClick={switchIsMetric}
                        style={isMetric
                            ? {fontWeight: '400', borderColor: 'transparent', backgroundColor: '#fff', color: '#000'}
                            : {}
                        }
                        className="slider-btn">
                            °C
                    </Button>
                    <Button
                        disabled={isMetric ? false : true}
                        onClick={switchIsMetric}
                        style={isMetric
                            ? {}
                            : {fontWeight: '400', borderColor: 'transparent', backgroundColor: '#fff', color: '#000'}
                        }
                        className="slider-btn">
                            °F
                    </Button>
                </div>
            </div>
            <Slider {...settings} className='slider'>
                {isDaily ?
                    weatherArr.daily.map((item: any) => {
                        return <div key={item.dt} className="slider-item">
                            <div className="slider-item__content">
                                <div className="slider-item__day">
                                    {getDay(item.dt)}, 12:00
                                </div>
                                <div className="slider-item__icon">
                                    <img src={getIcon(item.weather[0].icon)} alt="slider-icon" />
                                </div>
                                <div className="slider-item__temp">
                                    {Math.round(item.temp.min)}{isMetric ? '°C' : '°F'} - {Math.round(item.temp.max)}{isMetric ? '°C' : '°F'}
                                </div>
                            </div>
                        </div>
                    })
                    :
                    weatherArr.hourly.map((item: any) => {
                        return <div key={item.dt} className="slider-item">
                            <div className="slider-item__content">
                                <div className="slider-item__day">
                                    {getDay(item.dt)}, {getTime(item.dt)}
                                </div>
                                <div className="slider-item__icon">
                                    <img src={getIcon(item.weather[0].icon)} alt="slider-icon" />
                                </div>
                                <div className="slider-item__temp">
                                    {Math.round(item.temp)} {isMetric ? '°C' : '°F'}
                                </div>
                            </div>
                        </div>
                    })
                }
            </Slider>
        </div>
    )
}

export default WeatherSlider;