import React from 'react';
import './Solution.css';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/theme-github';

function solution() {
  return (
    <div className='solution-body'>
      <div className='solution-header'>SOLUTION</div>
      <div className='solution-content'>
        <AceEditor height='100%' width='100%' mode='java' theme='github' />
      </div>
    </div>
  );
}

export default solution;
