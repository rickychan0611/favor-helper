import React, { createContext } from 'react'
import db from '../firestore'
import { PostsContext } from './PostsContext'

export const QuestionsContext = createContext()

const QuestionsContextProvider = ({ children }) => {
  const [questions, setQuestions] = React.useState([])
  const [loading, setLoading] = React.useState(true)

  // const {post} = React.useContext(PostsContext)

  const questionsQuery = (props) => {
    setLoading(true)
    setQuestions([]) 

    let tempArr = []
    // if (props) {
    //   db.collection('questions')
    //   .where('postId', '==', props).get()
    //   .then(snapshot => {
    //   if (snapshot.empty) {
    //     console.log('No matching documents.');
    //     setLoading(false)
    //     return;
    //   }  
    //   snapshot.forEach(doc => {
    //     tempArr.push(doc.data())
    //   })
    //   console.log('tempArr'+ JSON.stringify(tempArr))
    //   setLoading(false)
    //   setQuestions(tempArr) 
    // })
    // .catch(err => {
    //   console.log('Error getting documents', err);
    //   setLoading(false)
    //   }
    // )
    // }
    
  }
      // const unsubscribe =
      //   db.collection('posts').doc(props).collection('questions')
      //     .orderBy('createAt', 'desc')
      //     .onSnapshot(snapshot => {
      //       const arr = []
      //       snapshot.forEach(doc => { arr.push(doc.data()) })
      //       setQuestions(arr)
      //       // console.log(JSON.stringify('questions' + questions))
      //     }
      //     )
      // return () => unsubscribe()
    // }
  

  // React.useEffect(
  //   () => {
  //     const unsubscribe =
  //       db.collection('posts').doc(props).collection('questions')
  //         .orderBy('createAt', 'desc')
  //         .onSnapshot(snapshot => {
  //           const arr = []
  //           snapshot.forEach(doc => { arr.push(doc.data()) })
  //           setQuestions(arr)
  //           console.log(JSON.stringify('questions' + questions))
  //         }
  //         )
  //     return () => unsubscribe()
  //   },
  //   []
  // )

  return (
    <QuestionsContext.Provider
      value={
        {
          questionsQuery,
          questions,
          loading
        }
      }>
      {children}
    </QuestionsContext.Provider>
  )
}

export default QuestionsContextProvider

