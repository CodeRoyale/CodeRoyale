import React from 'react';
import './CountBar.css';
import { Progress } from 'rsuite';

function CountBar({ count, total, width }) {
  const { Line } = Progress;
  const percent = (count / total) * 100;
  return (
    <div style={{ width: width }} className='count-bar'>
      {count}
      <Line
        strokeWidth={7}
        strokeColor='#0083DD'
        percent={percent}
        showInfo={false}
      />
      {total}
    </div>
  );
}

export default CountBar;
