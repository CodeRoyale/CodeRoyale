import React, { useState } from 'react';
import './WinLoseMain.css';
import { WON, LOST } from '../../utils/constants';
import { Icon, Whisper, Tooltip } from 'rsuite';
import { Redirect } from 'react-router';

function WinLoseMain({ action }) {
  const [backClicked, setBackClicked] = useState(false);
  const greenRGB = '60, 255, 0';
  const redRGB = '255, 0, 17';
  const alpha = ',0.7';
  let rgb = null;

  if (backClicked) {
    return <Redirect to='/dashboard' />;
  }

  if (action === WON) {
    rgb = greenRGB;
  } else if (action === LOST) {
    rgb = redRGB;
  }
  return (
    <div className='win-lose'>
      <div className='win-lose-back'>
        <Whisper
          placement='right'
          trigger='hover'
          speaker={<Tooltip>Go to Dashboard</Tooltip>}
        >
          <Icon
            onClick={() => setBackClicked(true)}
            icon='back-arrow'
            size='2x'
            style={{ margin: '20px' }}
          />
        </Whisper>
      </div>

      <div className='win-lose-result-container'>
        <div
          style={{
            background: 'rgba(' + rgb + alpha + ')',
            border: 'solid rgb(' + rgb + ') 5px',
          }}
          className='win-lose-result'
        >
          <b>{action}</b>
        </div>
      </div>
    </div>
  );
}

export default WinLoseMain;
