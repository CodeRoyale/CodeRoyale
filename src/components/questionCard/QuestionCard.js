import React from 'react';
import { Checkbox } from 'rsuite';
import './QuestionCard.css';

const QuestionCard = (props) => {
  const {
    questionID,
    questionNumber,
    questionTitle,
    questionDesc,
    questionTags,
  } = props;

  // Send selected question through props
  const handleQuestionVoted = (value) => {
    props.getVotedQuestion(value);
  };

  // Display tags from API
  let tagsText = questionTags.map((item) => {
    return (
      <span key={questionID} className='question-card-tags'>
        {item}{' '}
      </span>
    );
  });

  return (
    <div className='question-card-container'>
      <p className='question-card-number'># {questionNumber}</p>
      <p className='question-card-title'>{questionTitle}</p>
      <p className='question-card-desc-head'>Description</p>
      <p className='question-card-desc'>{questionDesc}</p>
      <p className='question-card-tags-head'>Tags</p>
      <p>{tagsText}</p>
      <Checkbox value={questionID} onChange={handleQuestionVoted}>
        Select this question
      </Checkbox>
    </div>
  );
};

export default QuestionCard;
