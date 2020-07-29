import React, { Component } from 'react';
import GoogleSignIn from '../../components/googleSignIn/GoogleSignIn';
import { Link } from 'react-router-dom';
import './SignUpMain.css';

const CLIENT_URL = process.env.REACT_APP_CLIENT_URL;
const SIGNUP_API = process.env.REACT_APP_SIGNUP_API;

class SignUpSec extends Component {
  constructor(props) {
    super(props);
    this.state = {
      googleData: {},
    };
  }

  sendToServer = () => {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Origin', CLIENT_URL);
    headers.append('Access-Control-Allow-Credentials', 'true');
    // Data to be sent to API
    const thirdPartyData = {
      issuer: 'google',
      signUpType: 'native',
      idToken: this.state.googleData.wc.id_token,
    };
    fetch(SIGNUP_API, {
      method: 'POST',
      headers,
      body: JSON.stringify(thirdPartyData),
    })
      .then((res) => res.json())
      .then((jsonRes) => {
        // Success response from server
        // TODO: Show alerts based on response
        console.log(jsonRes);
      })
      .catch((err) => {
        // Error response from server
        // TODO: Show alerts based on error response
        console.log(err);
      });
  };

  handleGoogleData = (data) => {
    this.setState({ googleData: data });
    // Send to CodeRoyale API for signing up
    this.sendToServer();
  };

  render() {
    return (
      <div className='signup-section-container'>
        <div className='signup-section-content'>
          <center>
            <p className='signup-section-title'>Sign up for CodeRoyale</p>
            <GoogleSignIn
              text='Sign up with Google'
              sendGoogleData={this.handleGoogleData}
            />
            <p className='signup-section-sign-up'>
              Already a member?{' '}
              <Link to='/signin' style={{ textDecoration: 'none' }}>
                <span className='span-text'>Sign in now</span>
              </Link>
            </p>
          </center>
        </div>
      </div>
    );
  }
}

export default SignUpSec;
