import React, { Component } from 'react';
import GoogleSignIn from '../../components/googleSignIn/GoogleSignIn';
import { Link } from 'react-router-dom';
import './SignUpMain.css';

class SignUpSec extends Component {
  constructor(props) {
    super(props);
    this.state = {
      googleData: {},
    };
  }

  handleGoogleData = (data) => {
    this.setState({ googleData: data });
    console.log(this.state.googleData.wc.id_token);
  };

  sendToServer = () => {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    // headers.append('Origin', 'http://localhost:3000');
    // headers.append('Access-Control-Allow-Credentials', 'true');
    const thirdPartyData = {
          issuer: 'google',
          signUpType: 'native',
          idToken: this.state.googleData.wc.id_token
        };
    console.log('Sending data..');
    fetch('http://localhost:5000/users/signup', {
      method: 'POST',
      headers,
      body: JSON.stringify(
        thirdPartyData
        ),
    })
      .then((res) => res.json())
      .then((jsonRes) => {
        // Success response from server
        console.log(jsonRes);
      })
      .catch((err) => {
        // Error response from server
        console.log(err);
      });
    console.log(thirdPartyData);
    console.log('Got response back..');
  };

  render() {
    return (
      <div className='signup-section-container'>
        <div className='signup-section-content'>
          <center>
            <p className='signup-section-title'>Sign up for CodeRoyale</p>
            <GoogleSignIn
              text='Sign up with Google'
              receiveGoogleData={this.handleGoogleData}
            />
            <button onClick={this.sendToServer}>Send To server</button>
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
