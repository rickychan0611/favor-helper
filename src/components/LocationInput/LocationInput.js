import React, { useContext } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
// If you want to use the provided css
import 'react-google-places-autocomplete/dist/index.min.css';
import { MapContext } from '../../context/MapContext'
import getLatLng from "../../functions/getLatLng"

const LocationInput = ({formState, setFormState}) => {
  const {
    selectLoaction,
    userInitLocation
  } = useContext(MapContext)

const handleSelect = (description) => {
  const getLocation = async () => getLatLng(description)
    getLocation().then((loc) => {
      selectLoaction(loc)
      setFormState({...formState, location: loc, address: description})
    }
    )
    return
}
  return (
    <div>
      <h3>Search an address</h3>
    <GooglePlacesAutocomplete
      onSelect={({ description })=>{
        console.log('@@@@' + description)
        handleSelect(description)
      }}
    />
  </div>
  );
};

export default LocationInput