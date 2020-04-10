import React, { useContext, Fragment } from 'react'
import firebase from 'firebase'
import imageCompression from 'browser-image-compression';
import { ImageSliderContext } from '../../context/ImageSliderContext'
import { UserContext } from '../../context/UserContext'

import noImage from '../../assets/images/no-image.jpg'

const PickFile = ({ children, index }) => {
  const [currectIndex, setcurrectIndex] = React.useState(0)
  console.log('pickfile index', index)
  const { insertImage } = useContext(ImageSliderContext)
  const { user } = useContext(UserContext)

  const [imgFile, setImgFile] = React.useState({})

  const fileChangedHandler = (event, index) => {
    console.log('@@@@@@@@@@@@@@@@@@@@@@' + index)
    let file = event.target.files[0];// let files = event.target.files
    // console.log(file)
    let filename = ''
    if (file) {
      filename = file.name
    }
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
      maxSizeMB: 0.5,
      maxWidthOrHeight: 600,
    };

    imageCompression(file, options)
      .then(function (compressedFile) {
        console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
        console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB
        return uploadToServer(compressedFile, filename, index); // write your own logic
      })
      .catch(function (error) {
        console.log(error.message);
      });
  }

  //****upload the file to firebase
  const uploadToServer = (file, filename, index) => {
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
            insertImage(downloadURL, index)
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
  // const onPickFile = (index) => {
  //   // console.log(this.$refs.fileInput.click)
  //   document.getElementById("file").click() // $refs = all ref in this file, in this case, ref="fileInput"
  // }

  let { imagePreviewUrl } = imgFile;
  let imagePreview = null;
  if (imagePreviewUrl) {
    imagePreview = (<img src={imagePreviewUrl} />);
  } else {
    imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
  }


  React.useEffect(() => {
    setcurrectIndex(index)
    console.log(currectIndex)
  })

  const fileInputRef = React.createRef();

  return (
    <div>

      <div onClick={() => {
        if (user){
        fileInputRef.current.click()
      }
      else (
        alert('please login 1st')
      )
        // onPickFile(index)
      }} >
        {children}
        <input hidden
          type="file"
          ref={fileInputRef}
          accept="image/*"
          onChange={(e) => {
            fileChangedHandler(e, index)
            insertImage( noImage ,index)
          }}
        />
      </div>
    </div>
  )
}

export default PickFile