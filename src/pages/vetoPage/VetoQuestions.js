import React from 'react';
import { Loader } from 'rsuite';
import QuestionCard from '../../components/questionCard/QuestionCard';
import './VetoMain.css';

const VetoQuestions = ({ questionsLoading, preCheckLoading, questions }) => {
  let questionsArray = null;
  let questionCards = null;

  // Mapping questions to the QuestionCard component
  if (questions !== undefined) {
    questionsArray = questions.payload.data;
    questionCards = questionsArray.map((item, index) => {
      return (
        <QuestionCard
          key={index}
          questionNumber={index}
          questionTitle={item.questionTitle}
          questionDesc={item.description}
          questionID={item._id}
          questionTags={item.tags}
        />
      );
    });
  }

  // Default content
  let content = <div className='veto-questions'>{questionCards}</div>;

  // Loading while fetching questions
  if (questionsLoading || preCheckLoading) {
    content = (
      <div className='veto-questions-loading'>
        <Loader size='sm' content='Fetching veto questions...' />
      </div>
    );
  }

  return content;
};

export default VetoQuestions;
