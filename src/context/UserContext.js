import React, { createContext, useState } from 'react'
import firebase from 'firebase'

export const UserContext = createContext()

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({loading: true})
  const [loading, setLoading] = useState(true)

  React.useEffect(
    () => {
      firebase.auth().onAuthStateChanged(function(userData) {
        if (userData) {
          setUser(userData)
          setLoading(false)
          console.log('user signed in')
          console.log(JSON.stringify(userData))
        } else {
          setUser(null)
          setLoading(false)
          console.log('onAuthStateChanged not sign in')
        }
      });
    },
    []
  )

  return (
    <UserContext.Provider
      value={
        {
          user,
          loading      
        }
      }
      >
      {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider