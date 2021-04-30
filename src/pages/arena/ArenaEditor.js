import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { submitCode, arenaDataReset } from '../../actions/arenaActions';
import {
  Flex,
  Select,
  IconButton,
  Icon,
  Text,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Button,
  useToast,
} from '@chakra-ui/react';
import { IoMdSettings } from 'react-icons/io';
import { BiReset } from 'react-icons/bi';
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
import ArenaScore from './ArenaScore';

/*
  {
    language: languageID
  }
*/
const editorLanguageIdObject = {
  c_cpp: 53,
  java: 62,
  python: 71,
};

/* 
  { 
    value: label 
  } 
*/
const editorLanguageObject = {
  c_cpp: 'C++',
  java: 'Java',
  python: 'Python',
};

const editorFontSizesObject = {
  10: '10',
  12: '12',
  14: '14',
  16: '16',
  18: '18',
  20: '20',
  22: '22',
  24: '24',
};

const editorThemesObject = {
  tomorrow: 'Tomorrow',
  terminal: 'Terminal',
  monokai: 'Monokai',
  github: 'Github',
};

const ArenaEditor = ({
  arenaData,
  socketData,
  submitCode,
  arenaDataReset,
  currentQuestion,
}) => {
  const socket = socketData.socket;

  // For showing toast messages
  const toast = useToast();

  // Editor settings state
  const [editorLanguage, setEditorLanguage] = useState('c_cpp');
  const [editorFontSize, setEditorFontSize] = useState(16);
  const [editorTheme, setEditorTheme] = useState('terminal');

  // Code typed in editor
  const [editorCode, setEditorCode] = useState('');

  let problemCode = null;
  let questionId = null;

  if (currentQuestion !== undefined && currentQuestion !== null) {
    problemCode = currentQuestion.problemCode;
    questionId = currentQuestion._id;
  }

  // Error handling for code submission
  useEffect(() => {
    if (arenaData.codeSubmission.error) {
      toast({
        title: 'Error on Code Submission',
        description: 'The code you submitted didnot pass the testcases',
        status: 'error',
        position: 'top-right',
        duration: 4000,
        isClosable: true,
      });
      arenaDataReset();
    }
  }, [arenaData.codeSubmission, arenaDataReset, toast]);

  // If someone in room submits the right solution for problem
  useEffect(() => {
    if (arenaData.codeSubmission.data) {
      const teamName = arenaData.codeSubmission.data.team_name;
      const problemCode = arenaData.codeSubmission.data.problemCode;
      toast({
        title: 'Success on Code Submission',
        description: `${teamName} passed all testcases for question ${problemCode}`,
        status: 'success',
        position: 'top-right',
        duration: 4000,
        isClosable: true,
      });
      arenaDataReset();
    }
  }, [arenaData.codeSubmission, arenaDataReset, toast]);

  const handleSubmitSolution = () => {
    submitCode(socket, {
      problemCode: problemCode,
      code: editorCode,
      langId: editorLanguageIdObject[editorLanguage],
      ques_id: questionId,
    });
  };

  // Editor code onChange
  const handleEditorCodeChange = (newEditorCode) => {
    setEditorCode(newEditorCode);
  };

  return (
    <Flex as='div' alignItems='flex-end' flexDir='column' bgColor='white'>
      <Flex width='40%' padding='1.2em'>
        <Select
          variant='filled'
          value={editorLanguage}
          onChange={(e) => setEditorLanguage(e.target.value)}
        >
          {Object.keys(editorLanguageObject).map((language, index) => {
            return (
              <option key={index} value={language}>
                {editorLanguageObject[language]}
              </option>
            );
          })}
        </Select>
        <IconButton
          aria-label='Reset Code'
          marginLeft='0.8em'
          onClick={() => setEditorCode('')}
          icon={<Icon as={BiReset} />}
        />
        <Popover>
          <PopoverTrigger>
            <IconButton
              aria-label='Settings'
              marginLeft='0.8em'
              icon={<Icon as={IoMdSettings} />}
            />
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>Settings</PopoverHeader>
            <PopoverBody>
              <Text fontSize='sm' fontWeight='bold'>
                Font Size
              </Text>
              <Select
                marginTop='0.3em'
                value={editorFontSize}
                onChange={(e) => setEditorFontSize(Number(e.target.value))}
              >
                {Object.keys(editorFontSizesObject).map((fontSize, index) => {
                  return (
                    <option key={index} value={fontSize}>
                      {editorFontSizesObject[fontSize]}
                    </option>
                  );
                })}
              </Select>
              <Text marginTop='0.3em' fontSize='sm' fontWeight='bold'>
                Theme
              </Text>
              <Select
                marginTop='0.3em'
                value={editorTheme}
                onChange={(e) => setEditorTheme(e.target.value)}
              >
                {Object.keys(editorThemesObject).map((theme, index) => {
                  return (
                    <option key={index} value={theme}>
                      {editorThemesObject[theme]}
                    </option>
                  );
                })}
              </Select>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Flex>
      <AceEditor
        height='600px'
        width='100%'
        mode={editorLanguage}
        theme={editorTheme}
        fontSize={editorFontSize}
        value={editorCode}
        showGutter={true}
        showPrintMargin={false}
        editorProps={{ $blockScrolling: Infinity }}
        onChange={handleEditorCodeChange}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: false,
          enableSnippets: true,
          tabSize: 2,
        }}
      />
      <Flex>
        <ArenaScore />
        <Button
          marginRight='1em'
          marginTop='1em'
          marginBottom='1em'
          colorScheme='codeRoyale'
          isLoading={arenaData.codeSubmission.isLoading}
          loadingText='Submitting Code'
          onClick={handleSubmitSolution}
        >
          Submit Code
        </Button>
      </Flex>
    </Flex>
  );
};

const mapStateToProps = (state) => ({
  arenaData: state.arenaData,
  socketData: state.socketData,
});

export default connect(mapStateToProps, { submitCode, arenaDataReset })(
  ArenaEditor
);
