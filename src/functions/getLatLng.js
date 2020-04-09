import Geocode from "react-geocode"

Geocode.setApiKey("AIzaSyCquh2O1gZyLsvJGclXV4fgoMh682fso2E");
Geocode.setLanguage("en")

const getLatLng = (location) => {
  return Geocode.fromAddress(location).then(
    response => {
      console.log('getLatLng run: ' + location + JSON.stringify(response.results[0].geometry.location))
      return response.results[0].geometry.location
    },
    error => {
      console.error("error" + error)
      alert(location + ' is not a place')
      return {
        lat: 0,
        lng: 0
      }
    }
  )
}

export  default getLatLng