import React from 'react';
import Chat from '../../components/chat/Chat';
import jwt from 'jsonwebtoken';
import './TestPage.css';

const TestPage = () => {
  jwt.sign({
    email: 'coderoyaleuser@email.com',
    firstName: 'CodeRoyale',
    lastName: 'User',
    picture: 'https://www.flaticon.com/svg/static/icons/svg/21/21104.svg',
    userName: 'coderoyaleuser',
  });
  // document.body.style = 'background: gray;';
  return (
    <div className='test-page'>
      <Chat />
    </div>
  );
};

export default TestPage;
