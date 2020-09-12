import React, { useEffect, useState } from 'react';
import { Pagination } from 'rsuite';
import './TestPage.css';

export default function SpringPopper() {
  const [noOfPages, setPages] = useState(10);
  const [activePage, setActivePage] = useState(1);

  const QuestionsList = ['q1', 'q2', 'q3'];

  const [CurrentQuestion, setCurrentQuestion] = useState('');

  return (
    <div>
      <Pagination
        prev
        last
        next
        first
        size='lg'
        pages={noOfPages}
        activePage={activePage}
        onSelect={(e) => {
          setActivePage(e);
          setCurrentQuestion(QuestionsList[activePage]);
        }}
      ></Pagination>

      <div>
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        {CurrentQuestion}
      </div>
    </div>
  );
}
