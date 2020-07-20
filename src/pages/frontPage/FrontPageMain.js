import React, { Component } from 'react';
import SigninButton from '../../components/signinButton/SigninButton';

class FrontMain extends Component {
  render() {
    return (
      <div>
        <SigninButton text='Sign in' />
      </div>
    );
  }
}

export default FrontMain;
