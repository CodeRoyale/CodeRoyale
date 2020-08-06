import React, { Component } from 'react';
import GoogleSignIn from '../../components/googleSignIn/GoogleSignIn';
import { Link, Redirect } from 'react-router-dom';
import './SignInMain.css';

const CLIENT_URL = process.env.REACT_APP_CLIENT_URL;
const SIGNIN_API = process.env.REACT_APP_SIGNIN_API;

class SignInSec extends Component {
  constructor(props) {
    super(props);
    const accessToken = localStorage.getItem('access-token');
    let loggedIn = true;
    if (accessToken === null) {
      loggedIn = false;
    }
    this.state = {
      loggedIn,
      googleData: {},
    };
  }

  handleGoogleData = (data) => {
    this.setState({
      googleData: data,
    });
    // Send to CodeRoyale API for signing in
    this.sendToServer();
  };

  sendToServer = () => {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Origin', CLIENT_URL);
    headers.append('Access-Control-Allow-Credentials', 'true');
    // Data to be sent to API
    const thirdPartyData = {
      issuer: 'google',
      idToken: this.state.googleData.wc.id_token,
    };
    fetch(SIGNIN_API, {
      method: 'POST',
      headers,
      body: JSON.stringify(thirdPartyData),
    })
      .then((res) => res.json())
      .then((jsonRes) => {
        // Success response from server
        if (jsonRes.message === 'Login successful') {
          this.setState({ loggedIn: true });
          localStorage.setItem('user-data', JSON.stringify(jsonRes));
          localStorage.setItem('access-token', jsonRes.accessToken);
        }
        // React to other response messages from server
      })
      .catch((err) => {
        // Error response from server
        // TODO: Show alerts based on error response
        console.log(err);
      });
  };

  render() {
    if (this.state.loggedIn) {
      return <Redirect to='/dashboard' />;
    }
    return (
      <div className='signin-section-container'>
        <div className='signin-section-content'>
          <center>
            <p className='signin-section-title'>Sign into CodeRoyale</p>
            <GoogleSignIn
              text='Sign in with Google'
              sendGoogleData={this.handleGoogleData}
            />
            <p className='signin-section-sign-up'>
              Not a member?{' '}
              <Link to='signup' style={{ textDecoration: 'none' }}>
                <span className='span-text'>Sign up now</span>
              </Link>
            </p>
          </center>
        </div>
      </div>
    );
  }
}

export default SignInSec;
