import React from 'react';
import { Loader } from 'rsuite';
import QuestionCard from '../../components/questionCard/QuestionCard';
import Button from '../../components/button/Button';
import './VetoMain.css';

const VetoBody = ({ isLoading, questions }) => {
  let questionCards = null;
  const questionsArray = questions.message;

  if (questionsArray !== undefined) {
    questionCards = questionsArray.map((item, index) => {
      return (
        <QuestionCard
          questionNumber={index}
          questionTitle={item.questionTitle}
          questionDesc={item.description}
        />
      );
    });
  }

  let content = (
    <div className='veto-body'>
      <div className='veto-body-question'>{questionCards}</div>
      <Button
        type='button'
        buttonStyle='btn--primary--normal'
        buttonSize='btn--medium'
      >
        Start
      </Button>
    </div>
  );

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
