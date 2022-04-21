import WeatherSidebar from "./components/WeatherSidebar/WeatherSidebar";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./store/reducers";
import { fetchWeather } from "./store/actions";
import { makeUrl } from "./func";
import Highlights from "./components/Highlights/Highlights";
import WeatherSlider from "./components/WeatherSlider/WeatherSlider";
import Button from "./components/UI/Button/Button";

const App = () => {
    const dispatch = useDispatch()
    const {coordinates, weatherImperial} = useSelector((store: RootState) => store.weather);
    const urls = makeUrl(coordinates.lat, coordinates.lng);

    const burgerBtnHandler = () => {
        const burgerBtn = document.querySelector('.weather-sidebar__burger-btn');
        const sidebar = document.querySelector('.weather-sidebar');

        burgerBtn?.classList.toggle('active');
        sidebar?.classList.toggle('active');
    }

    document.addEventListener('click', (event) => {
        const burgerBtn = document.querySelector('.weather-sidebar__burger-btn');
        const burgerSpan = document.querySelector('.weather-sidebar__burger-span');
        const sidebar = document.querySelector('.weather-sidebar');
        console.log(event.target === sidebar)

        if (event.target !== burgerBtn && event.target !== burgerSpan && sidebar?.classList.contains('active') && sidebar) {
            const sidebarElements = sidebar.querySelectorAll('*');

            for (let i = 0; i < sidebarElements?.length; i++) {
                if (sidebarElements[i] === event.target || event.target === sidebar) {
                    return;
                }
            }

            burgerBtn?.classList.remove('active');
            sidebar.classList.remove('active');
        }
    })

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
        <Button
            className="weather-sidebar__burger-btn"
            onClick={burgerBtnHandler} >
            <span className="weather-sidebar__burger-span"></span>
        </Button>
        <WeatherSidebar/>
        <WeatherSlider/>
        <Highlights/>
    </div>
  );
}

export default App;
