import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from './routes'
import MapContextProvider from './context/MapContext'
import PostspContextProvider from './context/PostsContext'

const App = () => {
  return (
    <PostspContextProvider>
      <MapContextProvider >
        <BrowserRouter>
          <AppRoutes />
        </ BrowserRouter>
      </MapContextProvider>
    </PostspContextProvider>
  )
}

export default App;
