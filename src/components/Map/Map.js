import React, { useState, useEffect, useContext } from 'react'
import { MapContext } from '../../context/MapContext'
import getLatLng from "../../functions/getLatLng"
import { Button, Checkbox, Form } from 'semantic-ui-react'
import { LocationInput } from '..'
// import { withGoogleMap, GoogleMap, Circle } from '@react-google-maps/api'
import { usePosition } from 'use-position';
import { GoogleMap, Circle, useLoadScript } from '@react-google-maps/api'

const Map = ({ height, width, formState, setFormState, noSearchBar, currentLocation }) => {
  const { latitude, longitude, timestamp, accuracy, error } = usePosition();

  const [loc, setLoc] = useState({ lat: 0, lng: 0 })

  const [myLocation, setMyLoacation] = useState("")

  const {
    location,
    userInitLocation
  } = useContext(MapContext)

  const handleChange = (e, { value }) => setMyLoacation(value)

  const handleSubmit = () => {
    const getLocation = async () => getLatLng(myLocation)
    getLocation().then((loc) => setLoc(loc))
  }

  // get location from browser
  useEffect(() => {
    if (latitude && longitude && !error && !currentLocation) {
      setLoc({ 'lat': latitude, "lng": longitude })
    }
  }, [latitude])

  // location is from selecton in mapContext when create post
  // currentLocation is the location of the post
  useEffect(() => {
    if (noSearchBar && currentLocation) {
      console.log('currentLocation' + JSON.stringify(currentLocation))
      setLoc({ 'lat': currentLocation.lat, "lng": currentLocation.lng })
    }
    else {
      setLoc(location)
    }
  }, [location])

  return (
    <div>
      {noSearchBar ? null :
        <LocationInput formState={formState} setFormState={setFormState} />}
      <GoogleMap
        id='example-map'
        center={loc}
        mapContainerStyle={{
          height: height,
          width: width
        }}
        zoom={13}
      >
        <Circle
          center={loc}
          options={{
            strokeColor: '#FF0000',
            strokeOpacity: 0.3,
            strokeWeight: 0,
            fillColor: '#FF0000',
            fillOpacity: 0.2,
            clickable: false,
            draggable: false,
            editable: false,
            visible: true,
            radius: 1200,
            zIndex: 10
          }}
        />
      </GoogleMap>
    </div >
  )
}

export default Map