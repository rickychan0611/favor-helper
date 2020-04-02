import React, { createContext } from 'react'
import posts from '../data/posts'
import getLatLng from "../functions/getLatLng"

export const MapContext = createContext()

let userInitLocation = "v7a 4n9"
const jobLocations = []

// const getInitLocation = async () => getLatLng(userInitLocation)
// getInitLocation().then((loc) => return loc)

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

