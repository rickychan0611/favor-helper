import React, { useContext } from 'react'
import { useHistory } from "react-router-dom";
import { Button, Dimmer, Image, Header, Segment, Icon, Modal, Container } from 'semantic-ui-react'
import noImage from '../../assets/images/no-image.jpg'
import styles from './styles'
import { PickFile } from '../../components'
import { ImageSliderContext } from '../../context/ImageSliderContext'
import addImage from '../../assets/images/add-image.jpg'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { Placeholder } from 'semantic-ui-react'
import { CarouselProvider, Slider, Slide, DotGroup, Dot } from 'pure-react-carousel'
import 'pure-react-carousel/dist/react-carousel.es.css';
import useWindowDimensions from '../../functions/getWindowDimensions'

// const images = [
//   { src: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" },
//   { src: "https://i0.wp.com/images-prod.healthline.com/hlcmsresource/images/AN_images/eggs-breakfast-avocado-1296x728-header.jpg?w=1155&h=1528" },
//   { src: "https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" },
//   { src: "https://drop.ndtv.com/albums/COOKS/pasta-vegetarian/pastaveg_640x480.jpg" },
//   { src: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" },
//   { src: "https://i0.wp.com/images-prod.healthline.com/hlcmsresource/images/AN_images/eggs-breakfast-avocado-1296x728-header.jpg?w=1155&h=1528" },
//   { src: "https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" },
//   { src: "https://drop.ndtv.com/albums/COOKS/pasta-vegetarian/pastaveg_640x480.jpg" }
// ]

const PhotoSlider = () => {

  const { height, width } = useWindowDimensions();

  const [state, setState] = React.useState({})
  const [dimPhoto, setDimPhoto] = React.useState()

  const handleOpen = (image) => {
    setDimPhoto(image.src)
    setState({ active: true })
  }
  const handleClose = () => setState({ active: false })

  const {
    images,
    deleteImage,
    loading } = useContext(ImageSliderContext)

  const { active } = state

  var start_time;
  const start = () => {
    start_time = Date.now()
  }
  const end = (image) => {
    var now = Date.now()
    if (now - start_time < 100) {
      handleOpen(image)
    }
    // alert(now-start_time);
  }

  return (
    // slider container
    <>
      <CarouselProvider
        naturalSlideWidth={400}
        naturalSlideHeight={500}
        totalSlides={images.length}
        visibleSlides={width < 420 ? 1 : width < 800 ? 2 : width < 1025 ? 3 : 4}
        isIntrinsicHeight={true}
        touchEnabled={true}
        dragEnabled={true}
      >
        <div style={{
          backgroundColor: '#e0dede', height: 350
        }}>
          <Slider >
            {images.map((image, index) => {
              return (
                <>
                  <Slide index={index - 1} style={{ position: "relative" }} >

                  {/* // photo loading */}
                    {image.src == noImage ?
                      <Slide index={index - 1}>
                        <Placeholder style={{ height: 350, width: 420 }}>
                          <Placeholder.Image />
                        </Placeholder>
                      </Slide>
                      :

                      image.src == addImage ?
                        // {/* // **** photo placeholder with no picture added */}
                        <>
                          <Slide index={index - 1} style={{ position: "relative" }} >
                            <PickFile src={image.src} index={index}>
                              <img fluid src={image.src} style={styles.photo} />
                            </PickFile>
                          </Slide>
                        </>
                        :
                        // {/* // **** more than 2 photos with buttons */}
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
                          <img src={image.src} style={styles.photo}
                            onMouseDown={() => { start() }}
                            onMouseUp={() => { end(image) }} />
                        </>
                    }

                  </Slide>
                  <Dimmer active={active} onClickOutside={handleClose} page>
                    <img src={dimPhoto} style={styles.ModalPhoto} onClick={handleClose} />
                  </Dimmer>
                </>
              );
            })}
          </Slider>
        </div >
      </CarouselProvider>
    </>
  )
}

export default PhotoSlider