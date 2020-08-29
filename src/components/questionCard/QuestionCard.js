import React from 'react';
import { Checkbox } from 'rsuite';
import './QuestionCard.css';

const QuestionCard = (props) => {
  return (
    <div className='question-card-container'>
      <p className='question-card-number'># {props.questionNumber}</p>
      <p className='question-card-title'>{props.questionTitle}</p>
      <p className='question-card-desc'>{props.questionDesc}</p>
      <Checkbox>Select this question</Checkbox>
    </div>
  );
};

export default QuestionCard;
