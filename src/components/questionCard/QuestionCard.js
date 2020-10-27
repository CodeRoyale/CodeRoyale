import React, { useState } from 'react';
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
  const [checkBoxChecked, setCheckBoxChecked] = useState(false);

  // Send selected question through props
  const handleQuestionVoted = (value) => {
    // props.getVotedQuestion(value);
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
    <div
      className='question-card-container'
      onClick={() => setCheckBoxChecked(!checkBoxChecked)}
    >
      <div className='question-card-select-question'>
        <div className='question-card-select-indicator-section'>
          <p className='question-card-number'>#{questionNumber}</p>
          {checkBoxChecked ? (
            <div className='question-card-select-indicator'>Selected</div>
          ) : null}
        </div>
        <Checkbox
          value={questionID}
          onChange={handleQuestionVoted}
          checked={checkBoxChecked}
        ></Checkbox>
      </div>
      <p className='question-card-title'>{questionTitle}</p>
      <p className='question-card-desc'>{questionDesc}</p>
      <p>{tagsText}</p>
    </div>
  );
};

export default QuestionCard;
