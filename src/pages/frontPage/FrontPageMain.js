import React, { Component } from 'react';
import FrontPageHeader from '../../components/frontPageHeader/FrontPageHeader';
import './FrontPageMain.css';
import Intro from './intro/Intro';

class FrontPageMain extends Component {
  render() {
    return (
      <div className='front-page'>
        <FrontPageHeader />
        <Intro />
      </div>
    );
  }
}

export default FrontPageMain;
