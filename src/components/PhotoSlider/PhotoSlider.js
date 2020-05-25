import React, { useContext, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import { Button, Dimmer, Image, Header, Segment, Icon, Modal, Container } from 'semantic-ui-react'
import noImage from '../../assets/images/no-image.jpg'
import styles from './styles'
import { PickFile } from '../../components'
import { ImageSliderContext } from '../../context/ImageSliderContext'
import addImage from '../../assets/images/add-image.jpg'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { Placeholder } from 'semantic-ui-react'
import { CarouselProvider, Slider, Slide, DotGroup, Dot, ButtonBack, ButtonNext } from 'pure-react-carousel'
import 'pure-react-carousel/dist/react-carousel.es.css';
import useWindowDimensions from '../../functions/getWindowDimensions'
import FavButton from '../FavButton/FavButton';

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

const PhotoSlider = ({ formState, setFormState, createPost }) => {

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

  useEffect(() => {
    // when the last photo is deleted, set img to empty
    if (images[0].src == addImage) {
      setFormState({ ...formState, images: '' })
    }
    else {
      setFormState({ ...formState, images: images })
    }
  }, images)

  return (
    // slider container
    <>
      <CarouselProvider
        naturalSlideWidth={420}
        naturalSlideHeight={350}
        totalSlides={images.length}
        visibleSlides={createPost ?
          1 :
          width < 420 ? 1 : width < 800 ? 2 : width < 1025 ? 3 : width < 1677 ? 4 : width < 2097 ? 5 : 6
        }
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
                  <Slide index={index - 1} style={{ position: "relative" }} key={index}>

                    {/* // photo loading */}
                    {image.src == noImage ?
                      <Slide index={index - 1} key={index}>
                        <PickFile src={image.src} index={index}>
                          <Placeholder style={{ height: 350, width: 420 }}>
                            <Placeholder.Image />
                          </Placeholder>
                          <div style={{ position: "absolute", width: '100%', top: 0, left: 0, }}>
                                <Button fluid style={{
                                  backgroundImage: 'linear-gradient(to top right, #7775fa, #9a99f0)',
                                  color: "white"
                                }}>Upload photos to gallery</Button>
                              </div>
                          </PickFile>
                      </Slide>
                      :

                      image.src == addImage ?
                        // {/* // **** photo placeholder with no picture added */}
                        <>
                          <Slide index={index - 1} style={{ position: "relative" }} >
                            <PickFile src={image.src} index={index}>
                              <div style={{ position: "relative", width: '100%' }}>
                                <img src={image.src} style={{
                                  objectFit: 'contain',
                                  height: 350,
                                  // width: "100vw",
                                  // width: 'auto'
                                }} />
                              </div>

                              <div style={{ position: "absolute", width: '100%', top: 0, left: 0, }}>
                                <Button fluid style={{
                                  backgroundImage: 'linear-gradient(to top right, #7775fa, #9a99f0)',
                                  color: "white"
                                }}>Upload photos to gallery</Button>
                              </div>
                            </PickFile>
                          </Slide>
                        </>
                        :
                        // {/* // **** more than 2 photos with buttons */}
                        <>
                          <PickFile index={index}>
                            <div style={{ position: "absolute", bottom: 20, right: 20 }}>
                              <Button circular icon='add' size='huge' color="olive"
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
                <ButtonBack>Back</ButtonBack>
                <ButtonNext>Next</ButtonNext>
                <p>You can slide left and right to switch picture</p>

        </div >
      </CarouselProvider>
    </>
  )
}

export default PhotoSlider