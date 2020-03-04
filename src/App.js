import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header/header.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null
    }
  }

  //Set the subscription to null by default
  unsubscribeFromAuth = null

  componentDidMount() {
      //Using the onAuthStateChanged method from firebase auth to keep track of the authentication status (open subscription)
      this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
        if (userAuth) {
          //When user login, create a user object in firestore
          const userRef = await createUserProfileDocument(userAuth);

          /**
          The onSnapshot method will always check if our database has updated at that reference with any new data (i.e. see if the snapshot has changed)
          and send us a snapshot object (the data that we stored in firestore)
          **/
          userRef.onSnapshot(snapShot => {
            this.setState({
              currentUser: {
                id: snapShot.id,
                ...snapShot.data()
              }
            })

            console.log(this.state);
          })
        } else {
          //User logout
          this.setState({
            currentUser: userAuth
          })
        }
      });
  }

  //Close subscription
  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route path='/signin' component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
