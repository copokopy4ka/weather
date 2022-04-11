import { useEffect, useRef, useState } from "react";
import {useSelector} from 'react-redux'
import { RootState } from "../../store/reducers";
import Marker from "../Marker/Marker";
import './map.scss'


const Map: React.FC = () => {
    const {coordinates} = useSelector((state: RootState) => state.weather)
    const [map, setMap] = useState<google.maps.Map>();
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (ref.current && !map) {
            setMap(new window.google.maps.Map(ref.current, {
                center: coordinates,
                zoom: 5
            }))
        }
    }, [ref, map])

    useEffect(() => {
        if (map) {
            map.setOptions({center: coordinates})
        }
    },[coordinates])

    return (
        <div ref={ref} className="map-container">
            <Marker position={coordinates} map={map}/>
        </div>
    )
}

export default Map;
