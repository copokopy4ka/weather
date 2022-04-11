import WeatherSidebar from "./components/WeatherSidebar/WeatherSidebar";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./store/reducers";
import { fetchWeather } from "./store/actions";
import { makeUrl } from "./func";
import Highlights from "./components/Highlights/Highlights";
import WeatherSlider from "./components/WeatherSlider/WeatherSlider";

const App = () => {
    const dispatch = useDispatch()
    const {coordinates, weatherImperial} = useSelector((store: RootState) => store.weather);
    const urls = makeUrl(coordinates.lat, coordinates.lng);

    useEffect(() => {
        if (urls) {
            dispatch(fetchWeather(urls))
        }
    }, [coordinates]);

    if (!weatherImperial.current) {
        return <div style={{fontSize: '50px', textAlign: 'center', padding: '100px 0 0'}}>...loading</div>
    }
    
  return (
    <div className="App">
        <WeatherSidebar/>
        <WeatherSlider/>
        <Highlights/>
    </div>
  );
}

export default App;
