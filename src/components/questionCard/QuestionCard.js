import React, { useState } from 'react';
import { Checkbox, Alert } from 'rsuite';
import { connect } from 'react-redux';
import { addVetoVote, removeVetoVote } from '../../actions/vetoActions';
import './QuestionCard.css';

const QuestionCard = (props) => {
  const {
    questionID,
    questionNumber,
    questionTitle,
    questionDesc,
    questionTags,
    addVetoVote,
    removeVetoVote,
    vetoData,
    roomData,
  } = props;
  const [checkBoxChecked, setCheckBoxChecked] = useState(false);

  // Handle user voting for question
  // Show alert if user exceeds question vote max limit
  const handleQuestionVoted = (qid) => {
    if (checkBoxChecked) {
      removeVetoVote(qid);
      setCheckBoxChecked(false);
    } else if (
      vetoData.vetoVotedQuestions.length <
        roomData.data.competition.veto.max_vote &&
      !checkBoxChecked
    ) {
      addVetoVote(qid);
      setCheckBoxChecked(true);
    } else {
      Alert.error(
        `Maximum questions allowed for voting is ${roomData.data.competition.veto.max_vote}`
      );
      setCheckBoxChecked(false);
    }
  };

  // Display tags from API
  let tagsText = questionTags.map((item, index) => {
    return (
      <span key={index} className='question-card-tags'>
        {item}
        {index !== questionTags.length - 1 ? ', ' : ' '}
      </span>
    );
  });

  return (
    <div
      className='question-card-container'
      onClick={() => {
        handleQuestionVoted(questionID);
      }}
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

const mapStateToProps = (state) => ({
  vetoData: state.vetoData,
  roomData: state.roomData,
});

export default connect(mapStateToProps, { addVetoVote, removeVetoVote })(
  QuestionCard
);
