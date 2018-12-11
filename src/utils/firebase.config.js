import firebase from 'firebase'

var config = {
    apiKey: "AIzaSyCZcDvBZX-j41-I1GqXCqqs0V5Ldm8C3dk",
    authDomain: "admin-dashboard-test-9589f.firebaseapp.com",
    databaseURL: "https://admin-dashboard-test-9589f.firebaseio.com",
    projectId: "admin-dashboard-test-9589f",
    storageBucket: "admin-dashboard-test-9589f.appspot.com",
    messagingSenderId: "350438429707"
  };
  firebase.initializeApp(config);

  export const firebaseDB = firebase.database();