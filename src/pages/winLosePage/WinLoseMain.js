import React from 'react';
import './WinLoseMain.css';
import { WON, LOST } from '../../utils/constants';

function WinLoseMain() {
  const action = WON;
  const greenRGB = '60, 255, 0, 0.5';
  const redRGB = '255, 0, 17, 0.5';
  let rgb = null;
  if (action === WON) {
    rgb = greenRGB;
  } else if (action === LOST) {
    rgb = redRGB;
  }
  console.log(rgb);
  return (
    <div className='win-lose'>
      <div>
        <img
          style={{ height: '100vh', width: '100%' }}
          src='/images/results.svg'
          alt='n/a'
        />
      </div>
      <div className='win-lose-result-container'>
        <div className='win-lose-result'>
          <b>{action}</b>
        </div>
      </div>
    </div>
  );
}

export default WinLoseMain;
