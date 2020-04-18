import React, { createContext } from 'react'
import noImage from '../assets/images/no-image.jpg'
import addImage from '../assets/images/add-image.jpg'
import { Item } from 'semantic-ui-react'

export const ImageSliderContext = createContext()

const ImageSliderContextProvider = ({ children }) => {
  const [images, setImages] = React.useState([
    { src: addImage }
  ])

  // React.useEffect(() => {
  //     const unsubscribe = 
  //       db.collection('posts')
  //       .orderBy('createAt', 'desc')
  //       .onSnapshot( snapshot => { 
  //         const arr = [] 
  //         snapshot.forEach(doc => { arr.push(doc.data()) }) 
  //         setPosts(arr)
  //       }
  //     )
  //     return () => unsubscribe()
  //   }, []
  // )

  const insertImage = (downloadURL, index) => {
    let imagesArr = []
    if (images.length == 1) {
      console.log('!!images' + downloadURL)
      setImages([{ src: downloadURL }])
      console.log('!!images' + downloadURL)
    }
    if (images.length >= 1 && images[0].src != addImage){
            console.log('indexindeximage add run: ' , index)

            const list = [...images.slice(0, index), {src: downloadURL}, ...images.slice(index)]
            // return list
            setImages(list)
        if (images.length > 1 ) {
          const list = [...images.slice(0, index), {src: downloadURL}, ...images.slice(index)]
        return list
        }
    // setImages([{ src: downloadURL }, ...images])
    console.log('!!images' + JSON.stringify(images))
    }
    if (images.length < 1){
      setImages([{ src: addImage }])
      console.log('!!images' + downloadURL)
      }
  }

  const deleteImage = (src) => {
    setImages(images => {
      const list = images.filter(item => item.src !== src )
      if (list.length == 0 ) {
        return [{src: addImage}]
      }
      return list
    })
  }
  
  const [loading, setLoading] = React.useState(false)
  
  return (
    <ImageSliderContext.Provider
      value={
        {
          images,
          setImages,
          insertImage,
          deleteImage,
          setLoading,
          loading
        }
      }>
      {children}
    </ImageSliderContext.Provider>
  )
}

export default ImageSliderContextProvider

