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
import { SettingFilled } from '@ant-design/icons';
import { connect } from 'react-redux';


const ArenaSolution = ({ socket, currentQuestion, roomData }) => {
  const [ideLanguage, setLanguage] = useState('c_cpp');
  const [ideFontSize, setFontSize] = useState('12');
  const [ideTheme, setTheme] = useState('terminal');
  const [ideCode, setCode] = useState('');
  
  const [sendCodeClicked, setSendCodeClicked] = useState(false);
  const [languageID, setLanID] = useState(53);
  
  let problemCode = null;
  let _id = null;

  if (currentQuestion !== undefined && currentQuestion !== null) {
    problemCode = currentQuestion.problemCode;
    _id = currentQuestion._id;
  }

  function onChangeIDE(newValue) {
    setCode(newValue);
  }

  // Getting winner...
  // useEffect(() => {
  //   socket.on('COMPETITION_STOPPED', (data) => {
  //     setWinTeamName(true);
  //   });
  // }, [socket]);

  useEffect(() => {
    if (sendCodeClicked) {
      socket.emit(
        'CODE_SUBMISSION',
        {
          problemCode: problemCode,
          code: ideCode,
          langId: languageID,
          ques_id: _id,
        },
        (data) => {
          console.log(data);
        }
      );
      setSendCodeClicked(false);
    }
  }, [sendCodeClicked, ideCode, socket, problemCode, languageID, _id]);

  useEffect(() => {
    //should vary according to language selected c++=53, java=62, python 3.8=71
    if (ideLanguage === 'c_cpp') {
      setLanID(53);
    } else if (ideLanguage === 'java') {
      setLanID(62);
    } else if (ideLanguage === 'python') {
      setLanID(71);
    }

   
  }, [ideLanguage, languageID]);

  // if (winTeamName) {
  //   return <Redirect to='/results' />;
  // }

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

  return (
    <div className='solution'>
      <div className='solution-options-container'>
      <div className='solution-options'>
        <div className='solution-language'>
          <select onChange={(e) => setLanguage(e.target.value)}>
            <option value='c_cpp'>c++</option>
            <option value='java'>java</option>
            <option value='python'>python</option>
          </select>
        </div>

        <div className='solution-settings'>
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
      <div id='MyAceEditor'>
        <AceEditor
            height='500px'
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
      
      <div className='solution-button-container'>
        <Button
          type='button'
          buttonStyle='btn--primary--normal'
          buttonSize='btn--small'
          onClick={() => setSendCodeClicked(true)}
        >
          SUBMIT
        </Button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  roomData: state.roomData,
});

export default connect(mapStateToProps, null)(ArenaSolution);
