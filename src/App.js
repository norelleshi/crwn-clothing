import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { connect } from 'react-redux';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header/header.component';
import { setCurrentUser } from './redux/user/user.actions';

import './App.css';

class App extends React.Component {
  //Set the subscription to null by default
  unsubscribeFromAuth = null

  componentDidMount() {
    const { setCurrentUser } = this.props;

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
          setCurrentUser({
              id: snapShot.id,
              ...snapShot.data()
          })
        })
      } else {
        //User logout
        setCurrentUser(userAuth)
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
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/signin' render={() => this.props.currentUser ? (<Redirect to='/' />) : (<SignInAndSignUpPage />)} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
