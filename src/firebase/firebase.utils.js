import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth'; 

const config = {
    apiKey: "AIzaSyBSPw-ybyXWxanUveH3iBwzLj615HDyr0A",
    authDomain: "crwn-db-5663d.firebaseapp.com",
    databaseURL: "https://crwn-db-5663d.firebaseio.com",
    projectId: "crwn-db-5663d",
    storageBucket: "crwn-db-5663d.appspot.com",
    messagingSenderId: "552663275922",
    appId: "1:552663275922:web:bf45dda4cb70950c97094b",
    measurementId: "G-SPW7M1DRY6"
  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  //Instantiate the GoogleAuthProvider class from the authentication library
  const provider = new firebase.auth.GoogleAuthProvider();
  //Triger the google pop up whenever we use the GoogleAuthProvider for authentication and sign in
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;