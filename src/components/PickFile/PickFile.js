import React, { Children } from 'react'
import firebase from 'firebase'
import {
  Container,
  Grid,
  Button,
  Form,
  Header,
  Segment,
  Input,
  Rating,
  Image,
  Divider,
  Icon,
  Checkbox,
  Responsive
} from 'semantic-ui-react'
import db from '../../firestore'
import imageCompression from 'browser-image-compression';

import styles from './styles'

const handleImageUpload = (event) => {

  var imageFile = event.target.files[0];
  console.log('originalFile instanceof Blob', imageFile instanceof Blob); // true
  console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

  var options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true
  }
  imageCompression(imageFile, options)
    .then(function (compressedFile) {
      console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
      console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB

      // return uploadToServer(compressedFile); // write your own logic
    })
    .catch(function (error) {
      console.log(error.message);
    });
}


const PickFile = ({ children }) => {

  const [imgFile, setImgFile] = React.useState({})

  const fileChangedHandler = (event) => {
    let file = event.target.files[0];// let files = event.target.files
    // console.log(file)
    let filename = ''
    filename = file.name
    if (filename.lastIndexOf('.') <= 0) {
      return alert('Please add a valid file!')
    };

    // ****changing the filename:
    // const ext = filename.slice(filename.lastIndexOf('.'))
    // let reader = new FileReader()
    // reader.onloadend = () => {
    //   setImgFile({
    //     file: file,
    //     imagePreviewUrl: reader.result
    //   });
    // }
    // reader.readAsDataURL(file)
    // updatePreview('imageUrl', imgFile.imagePreviewUrl);

    //****image Compression
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
    };

    imageCompression(file, options)
      .then(function (compressedFile) {
        console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
        console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB
        return uploadToServer(compressedFile, filename); // write your own logic
      })
      .catch(function (error) {
        console.log(error.message);
      });
  }

  //****upload the file to firebase
  const uploadToServer = (file, filename) => {
    firebase.storage().ref('image/' + filename).put(file)
      .then((fileData) => { // then get downloadUrl
        console.log('then get downloadUrl')
        let storage = firebase.storage()
        let urlRef = storage.ref('image/' + filename)
        urlRef.getDownloadURL().then(function (downloadURL) {
          // item.refundImg = downloadURL
          return downloadURL
        })
          .then((downloadURL) => {
            console.log('downloadURL: ' + downloadURL)
            return
            // updatePreview('imageUrl', downloadURL)
            // firebase.database().ref('sellers/' + this.id + '/' + item.productName + '/' + item.buyer).update({ 'refundImg': downloadURL })
          })
          // .then(() => {
            // item.loading = false
            // vm.$forceUpdate()
          // })
      });
  }

  //overwrite dom input button
  const onPickFile = () => {
    // console.log(this.$refs.fileInput.click)
    document.getElementById("file").click() // $refs = all ref in this file, in this case, ref="fileInput"
  }

  let { imagePreviewUrl } = imgFile;
  let imagePreview = null;
  if (imagePreviewUrl) {
    imagePreview = (<img src={imagePreviewUrl} />);
  } else {
    imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
  }

  return (
    <div>
      <Button onClick={onPickFile} >{children}
        {/* <input type="file" accept="image/*" onchange="handleImageUpload(event);"/> */}

        <input style={{ display: "none" }} id="file" type="file"
          accept="image/*"
          onChange={fileChangedHandler}
        />
      </Button>
    </div>
  )
}

export default PickFile