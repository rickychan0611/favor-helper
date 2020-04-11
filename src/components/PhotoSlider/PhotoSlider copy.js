import React, { useContext } from 'react'
// import Carousel, { Dots } from '@brainhubeu/react-carousel';
// import '@brainhubeu/react-carousel/lib/style.css';
import { useHistory } from "react-router-dom";
import { Button, Image, Segment, Icon, Modal } from 'semantic-ui-react'
import noImage from '../../assets/images/no-image.jpg'
import styles from './styles'
import { PickFile } from '../../components'
import { ImageSliderContext } from '../../context/ImageSliderContext'
import addImage from '../../assets/images/add-image.jpg'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { Placeholder } from 'semantic-ui-react'
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, Dot } from 'pure-react-carousel'
import 'pure-react-carousel/dist/react-carousel.es.css';

const images = [
  {src: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"},
  {src: "https://i0.wp.com/images-prod.healthline.com/hlcmsresource/images/AN_images/eggs-breakfast-avocado-1296x728-header.jpg?w=1155&h=1528"},
  {src: "https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"},
  {src: "https://drop.ndtv.com/albums/COOKS/pasta-vegetarian/pastaveg_640x480.jpg"}
]

const PhotoSlider = () => {
  const { 
    // images, 
    deleteImage, 
    loading } = useContext(ImageSliderContext)

  return (
    <div style={{
      backgroundColor: '#e0dede', width: '100vw'
    }}>

      <CarouselProvider
        naturalSlideWidth={420}
        naturalSlideHeight={300}
        totalSlides={images.lenght}
        // orientation="horizontal"	
      >
        <Slider>
          {images.map((image, index) => {
            return (
              <div style={{position: "relative", heigth: 300, width: "100vw"}}>
                {/* {JSON.stringify(image.src)} */}
                {image.src == noImage ?
                  <Slide index={index -1 }>
                    <Placeholder style={{ height: 300, width: 420 }}>
                      <Placeholder.Image />
                    </Placeholder>
                  </Slide>
                  :
                  image.src == addImage ?
                    // only addPhoto placeholder and click to add image
                    <Slide index={index -1 }>
                    <PickFile src={image.src} index={index}>
                        <img fluid src={image.src} style={styles.photo} />
                      </PickFile>
                    </Slide>
                    :
                    //last uploaded pic with button
                    <Slide index={index -1 }>
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
                    </Slide>
                };
              </div>
            );
          })};
        </Slider>
        <ButtonBack>Back</ButtonBack>
        <ButtonNext>Next</ButtonNext>
      </CarouselProvider>

    </div >
  )
}

export default PhotoSlider