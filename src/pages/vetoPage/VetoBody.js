import React from 'react';
import { Loader } from 'rsuite';
import QuestionCard from '../../components/questionCard/QuestionCard';
import './VetoMain.css';

const VetoBody = ({ isLoading, questions, getVotedQuestion }) => {
  let questionsArray = null;
  let questionCards = null;

  // Send selected question in props
  const handleQuestionVoted = (value) => {
    getVotedQuestion(value);
  };

  // Mapping questions in QuestionCard
  if (questions !== undefined) {
    questionsArray = questions.message;
    questionCards = questionsArray.map((item, index) => {
      return (
        <QuestionCard
          key={item._id}
          questionNumber={index}
          questionTitle={item.questionTitle}
          questionDesc={item.description}
          questionID={item._id}
          questionTags={item.tags}
          getVotedQuestion={handleQuestionVoted}
        />
      );
    });
  }

  // Default content
  let content = (
    <div className='veto-body'>
      <div className='veto-body-question'>{questionCards}</div>
    </div>
  );

  // Loading while fetching questions
  if (isLoading) {
    content = (
      <div className='veto-body-loading'>
        <Loader size='md' content='Fetching veto questions...' />
      </div>
    );
  }

  return content;
};

export default VetoBody;
