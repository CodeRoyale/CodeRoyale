import React from 'react';
import './Solution.css';
import AceEditor from 'react-ace';

function solution() {
  return (
    <div className='solution-body'>
      <div className='solution-header'>SOLUTION</div>
      <div className='solution-content'>
        <AceEditor height='100%' width='100%' />
      </div>
    </div>
  );
}

export default solution;
