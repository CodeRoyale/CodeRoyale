import React from 'react';
import Chat from '../../components/chat/Chat';
import QuestionCard from '../../components/questionCard/QuestionCard';
import './TestPage.css';

const TestPage = () => {
  // document.body.style = 'background: gray;';
  return (
    <div className='test-page'>
      <QuestionCard
        questionNumber={1}
        questionTitle={'Decrease the Sum of Digits'}
        questionDesc={
          'You are given a positive integer n. In one move, you can increase n by one (i.e. make n:=n+1). Your task is to find the minimum number of moves you need to perform in order to make the sum of digits of n be less than or equal to s.You have to answer t independent test cases.'
        }
        questionID={'asdasdasd'}
        questionTags={['strings', 'array']}
      />
    </div>
  );
};

export default TestPage;
