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
import { CarouselProvider, Slider, Slide, DotGroup, Dot } from 'pure-react-carousel'
import 'pure-react-carousel/dist/react-carousel.es.css';
import useWindowDimensions from '../../functions/getWindowDimensions'


const PhotoSlideInDetail = ({images}) => {
  const { height, width } = useWindowDimensions();
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
  const [state, setState] = React.useState({})
  const [dimPhoto, setDimPhoto] = React.useState()

  const handleOpen = (image) => {
    setDimPhoto(image.src)
    setState({ active: true })
  }
  const handleClose = () => setState({ active: false })
  const { active } = state

  return (
    <>
    {images ? 
      <CarouselProvider
        naturalSlideWidth={420}
        naturalSlideHeight={350}
        totalSlides={images.length}
        visibleSlides={width < 420 ? 1 : width < 800 ? 2 : width < 1025 ? 3 : width < 1677 ? 4 : width < 2097 ? 5 : 6}
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
                     {/* // **** more than 2 photos with buttons */}
                        <>
                          <img src={image.src} style={styles.photo}
                            onMouseDown={() => { start() }}
                            onMouseUp={() => { end(image) }} />
                        </>
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
      : null }
    </>
  )
}

export default PhotoSlideInDetail