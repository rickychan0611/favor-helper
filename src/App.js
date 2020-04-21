import React, { useContext } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from './routes'
import MapContextProvider from './context/MapContext'
import PostsContextProvider from './context/PostsContext'
import UserContextProvider from './context/UserContext'
import QuestionsContextProvider from './context/QuestionsContext'
import ImageSliderContextProvider from './context/ImageSliderContext'
import { PostControlBottomBar, TopBar, SideNavBar } from './components'
import { Sidebar } from 'semantic-ui-react'

const App = () => {
  return (
    <div style={{
      backgroundImage: 'linear-gradient(to top, white, white, #dcebf2)',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
    }}>
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
    </div>
  )
}

export default App;
