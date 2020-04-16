import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from './routes'
import MapContextProvider from './context/MapContext'
import PostsContextProvider from './context/PostsContext'
import UserContextProvider from './context/UserContext'
import QuestionsContextProvider from './context/QuestionsContext'
import ImageSliderContextProvider from './context/ImageSliderContext'
import { PostControlBottomBar } from './components'

const App = () => {
  return (
    <BrowserRouter>
      <UserContextProvider>
        <PostsContextProvider>
          <ImageSliderContextProvider>
            <QuestionsContextProvider>
              <MapContextProvider >
                <AppRoutes />
                {/* <PostControlBottomBar /> */}
              </MapContextProvider>
            </QuestionsContextProvider>
          </ImageSliderContextProvider>
        </PostsContextProvider>
      </UserContextProvider>
    </ BrowserRouter>

  )
}

export default App;
