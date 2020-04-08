import React from 'react'
import Carousel, { Dots } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import { useHistory } from "react-router-dom";
import { Image, Header, Icon, Modal } from 'semantic-ui-react'

import styles from './styles'

const images = [
  { src: 'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2019/1/07/0/FNK_Chicken-Tortilla-Dump-Dinner_s4x3.jpg' },
  { src: 'https://www.budgetbytes.com/wp-content/uploads/2018/01/Sheet-Pan-BBQ-Meatloaf-Dinner-plate.jpg' },
  { src: 'https://www.dinneratthezoo.com/wp-content/uploads/2017/10/firecracker-chicken-1.jpg' },
  { src: 'https://www.theseasonedmom.com/wp-content/uploads/2018/11/Sheet-Pan-Salmon-Dinner-with-Sweet-Potatoes-and-Broccoli-13.jpg'}
]

const PhotoSlider = () => {
  const history = useHistory()
  const [openModal, setOpenModal] = React.useState(false)
  const [imgUrl, setImgUrl] = React.useState('')

  const onImageModal = (open, src) => {
    setOpenModal(open)
    setImgUrl(src)
  }

  return (
    <div>
      <Carousel
        autoPlay={4000}
        animationSpeed={1000}
        keepDirectionWhenDragging
        stopAutoPlayOnHover
        centered
        infinite
        rtl dots
        offset={0}
        slidesPerPage={4}
        itemWidth={420}
        breakpoints={{
          1200: {
            slidesPerPage: 3
          },
          800: {
            slidesPerPage: 2
          },
          420: {
            slidesPerPage: 1
          }
        }}
      >
        {images.map((image) => {
          return (
            <img fluid src={image.src}
              onClick={() => {
                onImageModal(true, image.src)
              }}
              style={styles.photo}
            />
          )
        })}

      </Carousel>
      {/* <Modal closeIcon trigger={openModal}> */}
        {/* <Image src={imgUrl} /> */}
      {/* </Modal> */}
    </div>
  )
}

export default PhotoSlider