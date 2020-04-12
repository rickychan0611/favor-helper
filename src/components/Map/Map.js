import React, { useState, useEffect, useContext } from 'react'
import { MapContext } from '../../context/MapContext'
import getLatLng from "../../functions/getLatLng"
import { Button, Checkbox, Form } from 'semantic-ui-react'
import { LocationInput } from '..'
import { withGoogleMap, GoogleMap, Circle } from 'react-google-maps';
import { usePosition } from 'use-position';

const Map = ({ height, formState, setFormState }) => {
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
      </>
    )
  });

  return (
    <div>
      <LocationInput formState={formState} setFormState={setFormState} />
      <br></br>
      {/* <code>
        latitude: {latitude}<br />
      longitude: {longitude}<br />
      accuracy: {accuracy && `${accuracy}m`}<br />
      error: {error}
      </code> */}

      {loc ?
        <>
          <RenderMap
            containerElement={<div style={{ height, width: 'auto' }} />}
            mapElement={<div style={{ height: `100%` }} />}
          />
        </> : null}
    </div>
  )
}

export default Map