const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

firebase.initializeApp({
    apiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
    authDomain: "favor-helper.firebaseapp.com",
    databaseURL: "https://favor-helper.firebaseio.com",
    projectId: "favor-helper",
    storageBucket: "favor-helper.appspot.com",
    messagingSenderId: "23684861633",
    appId: "1:23684861633:web:5132dc92a792e6c5858e40",
    measurementId: "G-PL6DM0GRJF"
});

const db = firebase.firestore();

export default db