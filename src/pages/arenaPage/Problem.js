import React, { useState, useEffect } from 'react';
import './ArenaMain.css';
import { Pagination } from 'rsuite';

function Problem(props) {
  console.log(props.questions);
  const questionsList = [
    'The dog is a pet animal. A dog has sharp teeth so that it can eat flesh very easily, it has four legs, two ears, two eyes, a tail, a mouth, and a nose. ... A dog saves the life of the master from danger. One can find dogs everywhere in the world. Dogs are a very faithful animal.',
    'Cat is a very adorable and a cute animal. It is a domestic animal and is kept as a pet. It has very sharp claws and keen eyes that help it in seeing during the night. That means that it has a very good nocturnal vision that is much better than humans.',
    'The horse is a four-footed animal. Its legs are slender but strong enough to run few miles at a stretch without any break. The horse may be of different sizes and colours. They may be white, red, brown, grey, black or a mixture of such colours. The horse lives on grass, straw, grams and leaves of trees.',
  ];

  const [noOfPages, setPages] = useState(questionsList.length);
  const [activePage, setActivePage] = useState(1);

  const [CurrentQuestion, setCurrentQuestion] = useState('');

  const handlePageChange = (e) => {
    setActivePage(e);
    console.log(e);
  };

  useEffect(() => {
    setCurrentQuestion(questionsList[activePage - 1]);
    console.log(questionsList[activePage - 1]);
  }, [activePage]);

  return (
    <div className='problem-body'>
      <div className='problem-header'>
        PROBLEM
        <Pagination
          prev
          last
          next
          first
          size='xs'
          pages={noOfPages}
          activePage={activePage}
          onSelect={(e) => {
            handlePageChange(e);
          }}
        ></Pagination>
      </div>

      <div className='problem-content'>{CurrentQuestion}</div>
    </div>
  );
}

export default Problem;
