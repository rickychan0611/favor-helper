import React, { useState, useEffect, useContext } from 'react'
// import { GoogleMap, LoadScript, Marker, Circle  } from '@react-google-maps/api'
import { MapContext } from '../../context/MapContext'
import getLatLng from "../../functions/getLatLng"
import { Button, Checkbox, Form } from 'semantic-ui-react'

<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCquh2O1gZyLsvJGclXV4fgoMh682fso2E&libraries=places"></script>

import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

const MyMap = (props, {height}) => {
  const [loc, setLoc] = useState(null)

  const [myLocation, setMyLoacation] = useState("")
  const {
    jobLocations,
    userInitLocation
  } = useContext(MapContext)

  const handleChange = (e, { value }) => setMyLoacation(value)

  const handleSubmit = () => {
    const getLocation = async () => getLatLng(myLocation)
    getLocation().then((loc) => setLoc(loc))
  }

  //load user location to center map
  useEffect(() => {
    setMyLoacation(userInitLocation)
    const getLocation = async () => getLatLng(userInitLocation)
    getLocation().then((loc) => { setLoc(loc) })
  }, [userInitLocation])

  const mapStyles = {
    position: 'relative',
    width: 400,
    height: 400
  };

  return (
    <div>
      <div>Current city: {JSON.stringify(myLocation)} </div>
      <div>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Input
              placeholder='Set your city'
              onChange={handleChange} />
            <Form.Button content='Submit' />
          </Form.Group>
        </Form>
      </div>
      <div style={{display: 'block', height: 400`}}>
      <Map
        google={ props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={{
         lat: -1.2884,
         lng: 36.8233
        }}
      />
      </div>
      {/* {loc ? <LoadScript
        id="script-loader"
        googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY}
        region="ca"
      >
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
      </LoadScript>
      : null } */}
    </div>
  )
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCquh2O1gZyLsvJGclXV4fgoMh682fso2E'
})(MyMap)