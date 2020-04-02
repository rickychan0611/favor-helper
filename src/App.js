import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from './routes'
import MapContextProvider from './context/MapContext'

const App = () => {
  return (
    <MapContextProvider >
      <BrowserRouter>
        <AppRoutes />
      </ BrowserRouter>
    </MapContextProvider>
  )
}

export default App;
