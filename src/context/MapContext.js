import React, { createContext } from 'react'
import posts from '../data/posts'
import getLatLng from "../functions/getLatLng"

export const MapContext = createContext()

let userInitLocation = "vancouver"
const jobLocations = []

//get Lat, Lng by address from all posts in database
posts.map((post) => {
   const getLocation = async () => getLatLng(post.PostalCode)
   return getLocation().then((loc) => jobLocations.push({loc, title:post.title}))
})


const MapContextProvider = ({ children }) => {
  return (
    <MapContext.Provider
      value={
        {
          jobLocations,
          userInitLocation
        }
      }>
      {children}
    </MapContext.Provider>
  )
}

export default MapContextProvider

