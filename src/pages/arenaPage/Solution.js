import React, { useState, useEffect } from 'react';
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
import { Popover, Whisper } from 'rsuite';
import { Grid, Row, Col } from 'rsuite';
import { Drawer } from 'rsuite';
import { SettingFilled } from '@ant-design/icons';

function Solution({ socket }) {
  const [ideLanguage, setLanguage] = useState('c_cpp');
  const [ideFontSize, setFontSize] = useState('12');
  const [ideTheme, setTheme] = useState('terminal');
  const [ideCode, setCode] = useState('');
  const [drawerStatus, showDrawer] = useState(false);
  const [languageID, setLanID] = useState(53);

  const LanguageCode = 70;

  const response = {
    data: {
      submissions: [
        {
          language_id: 70,
          stdout: 'YES\n',
          status_id: 3,
          stderr: null,
          token: '8d787b3d-6f5b-457d-bc41-cc22b0e9b4a9',
        },
        {
          language_id: 70,
          stdout: 'NO\n',
          status_id: 3,
          stderr: null,
          token: '6f92c14e-3294-4afc-84b0-937ba00b2726',
        },
        {
          language_id: 70,
          stdout: 'YES\n',
          status_id: 3,
          stderr: null,
          token: 'a7da4b63-31bf-495b-b2fc-73c9881c482b',
        },
        {
          language_id: 70,
          stdout: 'NO\n',
          status_id: 3,
          stderr: null,
          token: '87b7c616-0197-4eb8-a536-f787870c34da',
        },
      ],
    },
  };

  const testcases = [
    {
      input: '0 3 4 2',
      output: 'YES',
    },
    {
      input: '0 2 5 3',
      output: 'NO',
    },
    {
      input: '14 4 98 2',
      output: 'YES',
    },
    {
      input: '21 6 47 3',
      output: 'NO',
    },
  ];

  const settings_popup_content = (
    <div className='ide-options-popup'>
      <Grid fluid>
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
      </Grid>
    </div>
  );

  function onChangeIDE(newValue) {
    setCode(newValue);
  }

  const SendCode = () => {
    // console.log(ideLanguage);
    // console.log(typeof ideCode);
    console.log(ideCode);

    // socket.emit(
    //   'CODE_SUBMISSION',
    //   { testcase: testcases, code: ideCode, langId: LanguageCode },
    //   (data) => {
    //     console.log(data);
    //   }
    // );
  };

  useEffect(() => {
    socket.on('CODE_SUBMITTED', (data) => {
      console.log('code res:', data);
      console.log(JSON.stringify(data));
    });
  }, [socket]);

  useEffect(() => {
    //should vary according to language selected c++=53, java=62, python 3.8=71
    if (ideLanguage === 'c_cpp') {
      setLanID(53);
    } else if (ideLanguage === 'java') {
      setLanID(62);
    } else if (ideLanguage === 'python') {
      setLanID(71);
    }

    console.log(languageID);
  }, [ideLanguage, languageID]);

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
                <Whisper
                  trigger='click'
                  placement='bottomEnd'
                  speaker={
                    <Popover title='Settings'>{settings_popup_content}</Popover>
                  }
                >
                  <SettingFilled />
                </Whisper>
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

        <Button
          type='button'
          buttonStyle='btn--primary--normal'
          buttonSize='btn--medium'
          onClick={() => {
            showDrawer(true);
          }}
        >
          STATUS
        </Button>
      </div>

      <div className='submissions-drawer'>
        <Drawer
          size='xs'
          placement='right'
          show={drawerStatus}
          onHide={() => {
            showDrawer(false);
          }}
        >
          <Drawer.Header>
            <Drawer.Title>CODE SUBMISSION STATUS</Drawer.Title>
          </Drawer.Header>
          <Drawer.Body>{JSON.stringify(response)}</Drawer.Body>
          <Drawer.Footer>
            <Button
              type='button'
              buttonStyle='btn--primary--normal'
              buttonSize='btn--medium'
              onClick={() => {
                showDrawer(false);
              }}
            >
              Cancel
            </Button>
          </Drawer.Footer>
        </Drawer>
      </div>
    </div>
  );
}

export default Solution;
