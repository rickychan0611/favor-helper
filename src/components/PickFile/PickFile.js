import React, { useContext, Fragment } from 'react'
import firebase from 'firebase'
import imageCompression from 'browser-image-compression';
import { ImageSliderContext } from '../../context/ImageSliderContext'
import { UserContext } from '../../context/UserContext'
import addImage from '../../assets/images/add-image.jpg'
import noImage from '../../assets/images/no-image.jpg'

const PickFile = ({ children, index, profilePic }) => {
  const { insertImage, setImages } = useContext(ImageSliderContext)
  const { user, updateProfilePic } = useContext(UserContext)

  const [imgFile, setImgFile] = React.useState({})

  const fileChangedHandler = (event, index) => {
    let file = event.target.files[0];// let files = event.target.files
    let filename = ''
    if (file) {
      filename = file.name
    }
    if (filename.lastIndexOf('.') <= 0) {
      return alert('Please add a valid file!')
    };

    //****image Compression
    const options = {
      maxSizeMB: 0.5,
      maxWidthOrHeight: 600,
    };

    imageCompression(file, options)
      .then(function (compressedFile) {
        return uploadToServer(compressedFile, filename, index); // write your own logic
      })
      .catch(function (error) {
        alert("This file is invalid. please select another one")
        // setImages({src: addImage})
        console.log(error);
      });
  }

  //****upload the file to firebase
  const uploadToServer = (file, filename, index) => {
    firebase.storage().ref('image/' + filename).put(file)
      .then((fileData) => { // then get downloadUrl
        let storage = firebase.storage()
        let urlRef = storage.ref('image/' + filename)
        urlRef.getDownloadURL().then(function (downloadURL) {
          // item.refundImg = downloadURL
          return downloadURL
        })
          .then((downloadURL) => {
            if (profilePic) {
              console.log('PickFile PROFILE PIC load ' + downloadURL)
              updateProfilePic(downloadURL)
            }
            if (!profilePic) {
              insertImage(downloadURL, index)
            }
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


  let { imagePreviewUrl } = imgFile;
  let imagePreview = null;
  if (imagePreviewUrl) {
    imagePreview = (<img src={imagePreviewUrl} />);
  } else {
    imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
  }

  const fileInputRef = React.createRef();

  return (
    <div>

      <div onClick={() => {
        if (user) {
          fileInputRef.current.click()
        }
        else (
          alert('please login 1st')
        )
      }} >
        {children}
        <input hidden
          type="file"
          ref={fileInputRef}
          accept="image/*"
          onChange={(e) => {
            fileChangedHandler(e, index)
            if (!profilePic) {insertImage(noImage, index)}
          }}
        />
      </div>

    </div>
  )
}

export default PickFile