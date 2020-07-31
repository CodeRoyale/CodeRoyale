import React, { useState } from 'react';
import './ArenaMain.css';
import AceEditor from 'react-ace';
import { Popup, Grid } from 'semantic-ui-react';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/theme-tomorrow';
import 'ace-builds/src-noconflict/theme-terminal';
import Button from '../../components/button/Button';

function Solution() {
  const [ideLanguage, setLanguage] = useState('c_cpp');
  const [ideFontSize, setFontSize] = useState('12');
  const [ideTheme, setTheme] = useState('terminal');

  return (
    <div>
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

          <div className='ide-options'>
            <Popup
              width='100%'
              className='ide-options-popup'
              trigger={<div>Settings</div>} //replace this with settings Icon
              flowing
              on='click'
              position='bottom left'
            >
              <Grid centered divided rows={3}>
                <Grid.Row className='ide-options-row'>
                  <div>FontSize:</div>
                  <div>
                    <select
                      onChange={(e) => setFontSize(Number(e.target.value))}
                    >
                      <option value='10'>10</option>
                      <option value='12'>12</option>
                      <option value='14'>14</option>
                      <option value='16'>16</option>
                      <option value='18'>18</option>
                      <option value='20'>20</option>
                      <option value='22'>22</option>
                      <option value='24'>24</option>
                    </select>
                  </div>

                  <hr />
                </Grid.Row>
                <Grid.Row className='ide-options-row'>
                  <div>Theme:</div>
                  <div>
                    <select onChange={(e) => setTheme(e.target.value)}>
                      <option value='tomorrow'>tomorrow</option>
                      <option value='terminal'>terminal</option>
                      <option value='monokai'>monokai</option>
                    </select>
                  </div>
                  <hr />
                </Grid.Row>
              </Grid>
            </Popup>
          </div>
        </div>

        <div id='MyAceEditor' className='solution-content'>
          <AceEditor
            height='100%'
            width='100%'
            mode={ideLanguage}
            theme={ideTheme}
            fontSize={ideFontSize}
            showGutter={true}
            showPrintMargin={false}
          />
        </div>
      </div>
      <div className='button-container'>
        <Button
          type='button'
          buttonStyle='btn--primary--normal'
          buttonSize='btn--medium'
        >
          SUBMIT
        </Button>
      </div>
    </div>
  );
}

export default Solution;
