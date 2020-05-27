import React, { createContext, useEffect } from 'react'
import noImage from '../assets/images/no-image.jpg'
import addImage from '../assets/images/add-image.jpg'
import { Item } from 'semantic-ui-react'

export const ImageSliderContext = createContext()

const ImageSliderContextProvider = ({ children }) => {
  const [images, setImages] = React.useState([
    { src: addImage }
  ])

  const insertImage = (downloadURL, index) => {
    let imagesArr = []
    if (images.length == 1) {

      localStorage.setItem('Images', JSON.stringify([{ src: downloadURL }]))
      setImages([{ src: downloadURL }])

    }
    if (images.length >= 1 && images[0].src != addImage) {
      const list = [...images.slice(0, index), { src: downloadURL }, ...images.slice(index)]

      localStorage.setItem('Images', JSON.stringify(list))
      setImages(list)

      if (images.length > 1) {
        const list = [...images.slice(0, index), { src: downloadURL }, ...images.slice(index)]
        return list
      }
      console.log('!!images' + JSON.stringify(images))
    }
    if (images.length < 1) {

      localStorage.setItem('Images', JSON.stringify([{ src: addImage }]))
      setImages([{ src: addImage }])

    }
  }

  const deleteImage = (src) => {
    setImages(images => {
      const list = images.filter(item => item.src !== src)
      if (list.length == 0) {
        localStorage.setItem('Images', JSON.stringify([{ src: addImage }]))
        return [{ src: addImage }]
      }
      localStorage.setItem('Images', JSON.stringify(list))
      return list
    })
  }

  const [loading, setLoading] = React.useState(false)

  useEffect(()=>{
    let state = JSON.parse(localStorage.getItem('Images'))
    if (state){
      setImages(state)
    }
    else {
      setImages([{ src: addImage }])
    }

  }, [])

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

