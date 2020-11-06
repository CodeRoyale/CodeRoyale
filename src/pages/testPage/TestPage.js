import React, { useState } from 'react';
import Chat from '../../components/chat/Chat';
import { Nav } from 'rsuite';
import './TestPage.css';

const TestPage = () => {
  // document.body.style = 'background: gray;';
  const [showEveryone, setShowEveryone] = useState(false);
  return (
    <div className='test-page'>
      <Nav onSelect={() => setShowEveryone(!showEveryone)}>
        <Nav.Item eventKey='A'>Everyone</Nav.Item>{' '}
        <Nav.Item eventKey='B'>Team</Nav.Item>
        {showEveryone ? <Chat /> : null}
      </Nav>
    </div>
  );
};

export default TestPage;
