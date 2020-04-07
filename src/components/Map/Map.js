import React, { useState, useEffect, useContext } from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
import { MapContext } from '../../context/MapContext'
import getLatLng from "../../functions/getLatLng"
import { Button, Checkbox, Form } from 'semantic-ui-react'

const Map = () => {
  const [loc, setLoc] = useState({})
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
    getLocation().then((loc) => setLoc(loc))
  }, [userInitLocation])

  return (
    <div>
      <div>Current city: {JSON.stringify(myLocation)} </div>
      <div>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Input
              placeholder='Set your city'
              onChange={handleChange}            />
            <Form.Button content='Submit' />
          </Form.Group>
        </Form>
      </div>

      <LoadScript
        id="script-loader"
        googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY}
        region="ca"
      >
        <GoogleMap
          id="map"
          mapContainerStyle={{
            height: "calc(100vh - 11rem)",
            width: "auto"
          }}
          zoom={11}
          center={{
            lat: loc.lat,
            lng: loc.lng
          }}
        >
          {jobLocations ? jobLocations.map((job, i) => {
            return (
              <Marker
                // onLoad={onLoad}
                position={job.loc}
                key={i}
              />
            )
          }) : null}

        </GoogleMap>
      </LoadScript>
    </div>
  )
}

export default Map