import React, { Component } from 'react';
import GoogleSignIn from '../../components/googleSignIn/GoogleSignIn';
import { Link, Redirect } from 'react-router-dom';
import { message } from 'antd';
import 'antd/dist/antd.css';
import './SignUpMain.css';

const CLIENT_URL = process.env.REACT_APP_CLIENT_URL;
const SIGNUP_API = process.env.REACT_APP_SIGNUP_API;

class SignUpSec extends Component {
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

  signUpError = (msg) => {
    message.error(msg);
  };

  signUpSuccess = (msg) => {
    message.success(msg);
  };

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
        // Alerts based on response
        if (jsonRes.message === 'User Account Created') {
          this.signUpSuccess(
            'User account has been created successfully. Please login to use CodeRoyale!'
          );
        } else if (jsonRes.message === 'User Already Exists') {
          this.signUpError(
            'Sorry, email already exists please sign up with a different email!'
          );
        } else {
          this.signUpError('Sorry, couldnt sign up. Please try again!');
        }
      })
      .catch((err) => {
        // Error response from server
        this.signUpError('Sorry, couldnt sign up. Please try again later!');
      });
  };

  handleGoogleData = (data) => {
    this.setState({ googleData: data });
    // Send to CodeRoyale API for signing up
    this.sendToServer();
  };

  render() {
    if (this.state.loggedIn) {
      return <Redirect to='/dashboard' />;
    }
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
