import React, { useState, useEffect, useContext } from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
import { MapContext } from '../../context/MapContext'
import getLatLng from "../../functions/getLatLng"

const Map = () => {
  const [loc, setLoc] = useState({})
  const {
    jobLocations,
    userInitLocation
  } = useContext(MapContext)

  //load user location to center map
  useEffect(() => {
    const getLocation = async () => getLatLng(userInitLocation)
    getLocation().then((loc) => setLoc(loc))
  }, [userInitLocation])

  return (
    <div>
      <div>Location: {JSON.stringify(userInitLocation)} </div>
      <LoadScript
        id="script-loader"
        googleMapsApiKey="AIzaSyCquh2O1gZyLsvJGclXV4fgoMh682fso2E"
        region = "ca"
      > 
        <GoogleMap
          id="map"
          mapContainerStyle={{
            height: "calc(100vh - 9.5rem)",
            width: "auto"
          }}
          zoom={11}
          center={{
            lat: loc.lat,
            lng: loc.lng
          }}
        >
          {jobLocations ? jobLocations.map((job, i)=>{
            return (
            <Marker
              // onLoad={onLoad}
              position={job.loc}
              key={i}
            />
          )
          }): null }
          
        </GoogleMap>
      </LoadScript>
    </div>
  )
}

export default Map