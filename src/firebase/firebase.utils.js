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

  //Make an API request to our firestore to see if there's the user object that we created based on userAuth, if not, we create one.
  export const createUserProfileDocument = async (userAuth, additionalData) => {
    //If the user auth object does not exist (user sign out) then return null
    if (!userAuth) return;

    //referenceObject represents the current place of the object in our database (firestore)
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    //snapshotObject represents the data. We get the snapshotObject from the referenceObject using .get() method.
    const snapShot = await userRef.get();
    
    //If the user auth object exists (user sign in) but the database doesn't have the data, then create a user object in our database (firestore) based on that user auth object
    if(!snapShot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try {
        //Use .set to create a new user object using the data from our auth object
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      } catch (error) {
        console.log('error creating user', error.message);
      }
    }

    //Return the referenceObject with our new created data (snapshotObject) inside.
    return userRef;
  }

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  //Instantiate the GoogleAuthProvider class from the authentication library
  const provider = new firebase.auth.GoogleAuthProvider();
  //Triger the google pop up whenever we use the GoogleAuthProvider for authentication and sign in
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;