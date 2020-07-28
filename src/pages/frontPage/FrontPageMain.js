import React, { Component } from 'react';
import './FrontPageMain.css';
import Description from './Description';
import FrontPageNavBar from '../../components/frontPageNavBar/FrontPageNavBar';

class FrontPageMain extends Component {
  render() {
    return (
      <div className='front-page'>
        <FrontPageNavBar />
        <Description />
      </div>
    );
  }
}

export default FrontPageMain;
