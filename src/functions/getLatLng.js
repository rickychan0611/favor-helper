import Geocode from "react-geocode"

Geocode.setApiKey("AIzaSyCquh2O1gZyLsvJGclXV4fgoMh682fso2E");
Geocode.setLanguage("en")

const getLatLng = (location) => {
  return Geocode.fromAddress(location).then(
    response => {
      return response.results[0].geometry.location
    },
    error => {
      console.error("error" + error)
      alert(location + ' not found')
    }
  )
}

export  default getLatLng