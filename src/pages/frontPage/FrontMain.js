import React, { Component } from 'react';
import FrontPageHeader from '../../components/frontPageHeader/FrontPageHeader';
import './FrontMain.css';
import Intro from './intro/Intro';

class FrontMain extends Component {
  render() {
    return (
      <div className='front-page'>
        <FrontPageHeader />
        <Intro />
      </div>
    );
  }
}

export default FrontMain;
