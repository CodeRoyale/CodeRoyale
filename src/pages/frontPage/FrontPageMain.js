import React, { Component } from 'react';
import FrontPageHeader from '../../components/frontpage-header/FrontPageHeader';
import './FrontPageMain.css';

class FrontMain extends Component {
  render() {
    return (
      <div className='front-page'>
        <FrontPageHeader />
      </div>
    );
  }
}

export default FrontMain;
