import React, { useState } from 'react';
import './ArenaMain.css';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/theme-tomorrow';
import 'ace-builds/src-noconflict/theme-terminal';
import 'ace-builds/src-noconflict/snippets/c_cpp';
import 'ace-builds/src-noconflict/snippets/python';
import 'ace-builds/src-noconflict/snippets/java';

import 'ace-builds/src-noconflict/ext-language_tools';
import Button from '../../components/button/Button';
import { Popover } from 'antd';
import { Row, Col } from 'antd';
import { SettingFilled } from '@ant-design/icons';

function Solution() {
  const [ideLanguage, setLanguage] = useState('c_cpp');
  const [ideFontSize, setFontSize] = useState('12');
  const [ideTheme, setTheme] = useState('terminal');
  const [ideCode, setCode] = useState('');

  const settings_popup_content = (
    <div className='ide-options-popup'>
      <Row className='ide-options-row'>
        <Col span={20}>
          <div>FontSize:</div>
        </Col>
        <Col span={20}>
          <div>
            <select onChange={(e) => setFontSize(Number(e.target.value))}>
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
        </Col>
      </Row>
      <Row className='ide-options-row'>
        <Col span={20}>
          <div>Theme:</div>
        </Col>
        <Col span={20}>
          <div>
            <select onChange={(e) => setTheme(e.target.value)}>
              <option value='tomorrow'>tomorrow</option>
              <option value='terminal'>terminal</option>
              <option value='monokai'>monokai</option>
            </select>
          </div>
        </Col>
      </Row>
    </div>
  );

  function onChangeIDE(newValue) {
    setCode(newValue);
  }

  const SendCode = () => {
    console.log(ideCode);
  };

  return (
    <div>
      <div className='solution-body'>
        <div className='solution-header'>
          <div className='solution-title'>SOLUTION</div>

          <div className='solution-heading-right'>
            <div className='language-options'>
              <select onChange={(e) => setLanguage(e.target.value)}>
                <option value='c_cpp'>c++</option>
                <option value='java'>java</option>
                <option value='python'>python</option>
              </select>
            </div>

            <div className='ide-options'>
              <div>
                <Popover
                  content={settings_popup_content}
                  trigger='click'
                  placement='bottomRight'
                >
                  <SettingFilled />
                </Popover>
              </div>
            </div>
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
            editorProps={{ $blockScrolling: Infinity }}
            onChange={onChangeIDE}
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: false,
              enableSnippets: true,
              tabSize: 2,
            }}
          />
        </div>
      </div>
      <div className='button-container'>
        <Button
          type='button'
          buttonStyle='btn--primary--normal'
          buttonSize='btn--medium'
          onClick={SendCode}
        >
          SUBMIT
        </Button>
      </div>
    </div>
  );
}

export default Solution;
