import * as React from 'react';
import GoogleLogin from 'react-google-login';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Marketplace } from './Marketplace';
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link
// } from "react-router-dom";
// import { Redirect } from 'react-router-dom';


/*global gapi*/

// Created a login class to display the Google Login button when page is rendered
export class Login extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      loggedIn : false,
    }
    
    this.setLoggedIn = () => {
      this.setState({loggedIn: true})
    }
  }
  render() {
    const responseGoogle = (response) => {
        let auth = gapi.auth2.getAuthInstance();
        let user = auth.currentUser.get();
        //Does not work but was supposed to redirect to another page after user signed in.
        // if (user.isSignedIn()) {
        //   return <Redirect to="./static/marketplace.html"/>;
        // }
        if (user.isSignedIn()) {
            console.log("Google Token:  " + user.getAuthResponse().id_token);
            if (this.state.loggingIn) {
              console.log('Inside the function');
              return <Redirect to='/marketplace'/>;
              // return this.props.history.push('/marketplace/');
            }
        }
        console.log(response);
    };
    return (
      // Added a class for the login component to center it to the middle of the webpage. Css for wrapper class is in style.css file
      <div className ="wrapper">
        <GoogleLogin
            clientId = '433826711359-r31ipjdt01vfjhgbdi1go9b1508c7t8g.apps.googleusercontent.com'
            buttonText="Sign in with Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            theme='dark'
            cookiePolicy={'single_host_origin'}
        />
      </div>
    );
  }
}
