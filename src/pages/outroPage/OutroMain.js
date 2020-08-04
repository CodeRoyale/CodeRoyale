import React, { Component } from 'react';
import OutroContent from './OutroContent';

class OutroMain extends Component {
  render() {
    return (
      <div data-test='outro-page' className='outro-page'>
        <OutroContent />
      </div>
    );
  }
}

export default OutroMain;
