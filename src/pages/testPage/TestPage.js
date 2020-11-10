import React from 'react';
import Chat from '../../components/chat/Chat';
import './TestPage.css';

const TestPage = () => {
  // document.body.style = 'background: gray;';
  return (
    <div className='test-page'>
      <Chat />
    </div>
  );
};

export default TestPage;
