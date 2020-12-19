import React from 'react';
import './Divider.css';

function Divider({color, width, height}) {
  const style = {
    color: color,
    width: width,
    height: height,
  }
  return <div style={style} className='divider'></div>;
}

export default Divider;
