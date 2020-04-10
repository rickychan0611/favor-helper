import React, { useContext } from 'react'
import Carousel, { Dots } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import { useHistory } from "react-router-dom";
import { Button, Image, Segment, Icon, Modal } from 'semantic-ui-react'
import noImage from '../../assets/images/no-image.jpg'
import styles from './styles'
import { PickFile } from '../../components'
import { ImageSliderContext } from '../../context/ImageSliderContext'
import addImage from '../../assets/images/add-image.jpg'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { Placeholder } from 'semantic-ui-react'

const PhotoSlider = () => {
  const { images, deleteImage, loading } = useContext(ImageSliderContext)

  return (
    <div style={{
      backgroundColor: '#e0dede'
    }}>
      <Carousel
        // autoPlay={4000}
        // animationSpeed={1000}
        keepDirectionWhenDragging
        stopAutoPlayOnHover
        centered
        // infinite
        // rtl dots
        offset={1}
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
        {images.map((image, index) => {
          return (
            <div style={{ position: "relative", width: '100%' }}>
              {/* {JSON.stringify(image.src)} */}
              {image.src == noImage ?
                <Placeholder style={{ height: 300, width: 420 }}>
                  <Placeholder.Image />
                </Placeholder> :
                image.src == addImage ?
                  // only addPhoto placeholder and click to add image
                  <PickFile src={image.src} index={index}>
                    <img fluid src={image.src} style={styles.photo} />
                  </PickFile>
                  :
                  //last uploaded pic with button
                  <>
                    <PickFile index={index}>
                      <div style={{ position: "absolute", bottom: 20, right: 20 }}>
                        <Button raised circular icon='add' size='huge' color="olive"
                          style={{ boxShadow: '0px 0px 5px grey' }} />
                      </div>
                    </PickFile>

                    <div style={{ position: "absolute", bottom: 20, left: 20 }}>
                      <Button circular icon='remove' size='huge' color="red"
                        onClick={() => { deleteImage(image.src) }}
                        style={{ boxShadow: '0px 0px 5px grey' }} />
                    </div>
                    <Modal closeIcon trigger={<img fluid src={image.src} style={styles.photo} />} basic size='small'>
                    <Segment Placeholder basic textAlign='center'>
                    <img fluid src={image.src} />
                    </Segment>
                    </Modal>
                  </>
              }
            </div>
          )
        })}
      </Carousel>        
    </div >
  )
}

export default PhotoSlider