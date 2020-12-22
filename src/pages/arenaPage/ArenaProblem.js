import React from 'react';
import './ArenaMain.css';

const ArenaProblem = ({ currentQuestion }) => {
  let questionIO = [];
  let questionTitle = null;
  let questionCode = null;
  let questionDescription = null;
  let questionFormat = null;

  if (currentQuestion !== null && currentQuestion.io !== undefined) {
    questionTitle = currentQuestion.questionTitle;
    questionCode = currentQuestion.problemCode;
    questionFormat = currentQuestion.format;
    questionDescription = currentQuestion.description;
    questionIO = currentQuestion.io;
    for (let i = 0; i < questionIO.length; i++) {
      questionIO[i]['key'] = i;
    }
  }

  const questionIOView = questionIO.map((data) => (
    <div key={data.key}>
      <div>
        <div className='problem-heading'>
          <b>Input</b>
        </div>
        {data.input}
        <div className='problem-heading'>
          <b>Output</b>
        </div>
        {data.output}
        <div className='problem-heading'>
          <b>Explanation</b>
        </div>
        {data.explanation}
      </div>
      <br />
    </div>
  ));

  return (
    <div className='problem'>
      <div className='problem-title'>
        <b>{questionTitle}</b>
      </div>
      <div className='problem-code'>{questionCode}</div>
      <br />

      <div className='problem-heading'>
        <b>Description</b>
      </div>
      <div>
        <p>{questionDescription}</p>
      </div>
      <br />

      <div className='problem-heading'>
        <b>Format</b>
      </div>
      <div>
        <p>{questionFormat}</p>
      </div>
      <br />

      {questionIOView}
    </div>
  );
};

export default ArenaProblem;
