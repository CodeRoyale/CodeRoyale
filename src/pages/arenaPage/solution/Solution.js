import React, { useState } from 'react';
import './Solution.css';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/theme-monokai';

function Solution() {
  const [ideLanguage, setLanguage] = useState('c_cpp');

  return (
    <div className='solution-body'>
      <div className='solution-header'>
        <div className='solution-title'>SOLUTION</div>

        <div className='language-options'>
          <select onChange={(e) => setLanguage(e.target.value)}>
            <option value='c++'>c++</option>
            <option value='java'>java</option>
            <option value='python'>python</option>
          </select>
        </div>
      </div>

      <div className='solution-content'>
        <AceEditor
          height='100%'
          width='100%'
          mode={ideLanguage}
          theme='monokai'
        />
      </div>
    </div>
  );
}

export default Solution;
