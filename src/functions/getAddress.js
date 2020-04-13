import Geocode from "react-geocode"

Geocode.setApiKey("AIzaSyCquh2O1gZyLsvJGclXV4fgoMh682fso2E");
Geocode.setLanguage("en")

const getAddress = (loc) => {
  return Geocode.fromLatLng(loc.lat, loc.lng).then(
    response => {
      const address = response.results[0].address_components;
      console.log('getCity getCity run: ' + JSON.stringify(address))
      return address
    },
    error => {
      console.error("error" + error)
    }
  )
}

export  default getAddress