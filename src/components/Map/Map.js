import React, { useState, useEffect, useContext } from 'react'
import { MapContext } from '../../context/MapContext'
import getLatLng from "../../functions/getLatLng"
import { Button, Checkbox, Form } from 'semantic-ui-react'
import { LocationInput } from '..'
import { withGoogleMap, GoogleMap, Circle } from 'react-google-maps';
import { usePosition } from 'use-position';


const Map = ({ height }) => {
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
    if (latitude && longitude && !error) {
      setLoc({ 'lat': latitude, "lng": longitude })
    }
  }, [latitude])

  // get location from selecton in mapContext
  useEffect(() => {
    setLoc(location)
  }, [location])

  const RenderMap = withGoogleMap((props) => {
    return (
      <>
        <GoogleMap
          defaultCenter={loc}
          defaultZoom={13}
          center={loc}
        >
          <Circle
            center={loc}
            options={{
              strokeColor: '#FF0000',
              strokeOpacity: 0.6,
              strokeWeight: 0,
              fillColor: '#FF0000',
              fillOpacity: 0.35,
              clickable: false,
              draggable: false,
              editable: false,
              visible: true,
              radius: 1200,
              zIndex: 10
            }}
          />
        </GoogleMap>
      </>
    )
  });

  return (
    <div>
      <LocationInput />
      <div>selected city: {JSON.stringify(location)} </div>
      <code>
        latitude: {latitude}<br />
      longitude: {longitude}<br />
        {/* timestamp: {timestamp}<br/> */}
      accuracy: {accuracy && `${accuracy}m`}<br />
      error: {error}
      </code>

      {loc ?
        <>
          <div>{JSON.stringify(loc)}</div>

          <RenderMap
            containerElement={<div style={{ height, width: 'auto' }} />}
            mapElement={<div style={{ height: `100%` }} />}
          />
        </> : null}

      {/* {loc ?
        <GoogleMap
          mapContainerStyle={{
            height,
            width: "auto"
          }}
          zoom={13}
          center={{
            lat: loc.lat,
            lng: loc.lng
          }}
        >
          <Circle 
            center={{
              lat: loc.lat,
              lng: loc.lng
            }}
            options={{
              strokeColor: '#FF0000',
              strokeOpacity: 0.8,
              strokeWeight: 0,
              fillColor: '#FF0000',
              fillOpacity: 0.35,
              clickable: false,
              draggable: false,
              editable: false,
              visible: true,
              radius: 1000,
              zIndex: 10
            }}
          />

        </GoogleMap>
      : null } */}
    </div>
  )
}

export default Map