const styles = {
  container :{ 
    width: "100%", 
    height: 440, 
    backgroundColor: "white", 
    position: 'relative' ,
    boxShadow: '0px 10px 15px #cfdde8'
  },
  foodPic : { 
    width: "100%", 
    height: 200, 
    objectFit: "cover", 
    position: 'absolute', 
    top: 0,
  },
  photoURLContainer:{
    position: 'absolute', 
    top: 180,
    left: 8,
    zIndex: 1000
  },
  favesContainer:{
    position: 'absolute', 
    top: 10,
    left: 10,
    zIndex: 200,
    color: "white",
    padding: 5,
    opacity: 0.7,
    filter: 'drop-shadow(0 0 5px #333)'

  },
  priceContainer:{
    position: 'absolute', 
    top: 150,
    right: 0,
    backgroundColor: "black", 
    zIndex: 100,
    color: "white",
    padding: 5,
    opacity: 0.7
  },
  photoURL : {
    objectFit: "cover", 
    width: 50,
    height: 50,
    borderRadius: '50%',
    borderWidth: 1.5,
    borderColor: 'white',
    borderStyle: 'solid'
  },
  displayName : {
    position: 'absolute', 
    top: 205,
    left:65
  },
  details : {
    position: 'absolute', 
    top: 250,
    left:0,
    width: '100%', 
    paddingLeft: 20,
    paddingRight: 20,
    PaddingTop: 0
  },
  title : {
    marginTop: 0
  },
  address : {
    color: "grey",
    marginTop: 5,
    marginBottom: 5,
    float: 'left'
  },
  pickup : {
    color: "grey",
    float: 'right',
    marginTop: 5,
    marginBottom: 5,

  },
  dates : {
    color: "grey",
    marginTop: 5,
    marginBottom: 5,
  },
}

export default styles