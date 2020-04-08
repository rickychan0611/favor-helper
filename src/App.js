import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from './routes'
import MapContextProvider from './context/MapContext'
import PostsContextProvider from './context/PostsContext'
import UserContextProvider from './context/UserContext'
import QuestionsContextProvider from './context/QuestionsContext'

const App = () => {
  return (
    <UserContextProvider>
      <PostsContextProvider>
        <QuestionsContextProvider>
          <MapContextProvider >
            <BrowserRouter>
              <AppRoutes />
            </ BrowserRouter>
          </MapContextProvider>
        </QuestionsContextProvider>
      </PostsContextProvider>
    </UserContextProvider>
  )
}

export default App;
