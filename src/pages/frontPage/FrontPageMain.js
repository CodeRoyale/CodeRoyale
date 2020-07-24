import React, { Component } from 'react';
import FrontPageHeader from '../../components/frontPageHeader/FrontPageHeader';
import './FrontPageMain.css';
import Description from './description/Description';

class FrontPageMain extends Component {
  render() {
    return (
      <div className='front-page'>
        <FrontPageHeader />
        <Description />
      </div>
    );
  }
}

export default FrontPageMain;
