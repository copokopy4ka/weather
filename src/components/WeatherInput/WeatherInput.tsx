import { useState } from "react";
import { useDispatch } from 'react-redux'
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng
} from 'react-places-autocomplete';
import Input from "../UI/Input/Input";
import './weatherInput.scss';
import { SET_ADDRESS, SET_COORDINATES } from "../../store/actions";


const WeatherInput = () => {
    const dispatch = useDispatch();
    const [address, setAddress] = useState('');

    const handleSelect = async (value: any) => {
        const results = await geocodeByAddress(value);
        const addressResultsArr = [...results[0].address_components];

        if (+addressResultsArr[addressResultsArr.length - 1].short_name) {
            addressResultsArr.pop()
        } else if (+addressResultsArr[0].short_name) {
            addressResultsArr.shift()
        }
        addressResultsArr.splice(1, addressResultsArr.length - 2);
        const addressResult: string = addressResultsArr.length > 1
            ? `${addressResultsArr[0].short_name}, ${addressResultsArr[1].short_name}`
            : `${addressResultsArr[0].long_name}`;
        const latLng = await getLatLng(results[0]);

        dispatch({type: SET_COORDINATES, payload: latLng})
        dispatch({type: SET_ADDRESS, payload: addressResult})
        setAddress('')
    }

    return (
        <div className="sidebar__input-wrapper">
            <label className="sidebar__input-label" htmlFor="sidebar__input">L</label>
            <PlacesAutocomplete value={address} onChange={setAddress} onSelect={handleSelect}>
                {({getInputProps, suggestions, getSuggestionItemProps}) => (
                    <div>
                        <Input {...getInputProps(
                            {
                                onClick: () => {setAddress('')},
                                placeholder: 'Enter address...',
                                className: 'sidebar__input',
                                id: 'sidebar__input'
                            })}/>

                        <div className="sidebar__input-suggestions-list">
                            {suggestions.map(suggestion => {
                                const onClick = (e: any) => {
                                    setAddress(e.target.innerText);
                                }
                                return <div
                                            {...getSuggestionItemProps(suggestion, {onClick})}
                                            key={suggestion.placeId}
                                            className={suggestion.active
                                                ? 'sidebar__input-suggestion active'
                                                : 'sidebar__input-suggestion'}>
                                                    {suggestion.description}
                                        </div>
                            })}
                        </div>
                    </div>
                )}
            </PlacesAutocomplete>
        </div>
    )
}

export default WeatherInput;