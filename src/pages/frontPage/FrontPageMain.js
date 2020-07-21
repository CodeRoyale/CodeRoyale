import React, { Component } from 'react';
import FrontPageHeader from '../../components/frontpage-header/FrontPageHeader';
import './FrontPageMain.css';
import Intro from './Intro/Intro';

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
