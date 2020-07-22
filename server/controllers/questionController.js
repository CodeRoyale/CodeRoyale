const Question = require('../models/questionModel');

const putQuestion = async (req, res) => {
  try {
    const {
      questionTitle,
      problemCode,
      description,
      author,
      tags,
      dateAdded,
      timeLimit,
      sourceLimit,
      difficulty,
    } = req.body; // storing everything from request body into new question object

    const question = {};
    question.questionTitle = questionTitle;
    question.problemCode = problemCode;
    question.description = description;
    question.author = author;
    question.tags = tags;
    question.dateAdded = dateAdded;
    question.timeLimit = timeLimit;
    question.sourceLimit = sourceLimit;
    question.difficulty = difficulty;

    const questionModel = new Question(question);
    await questionModel.save();
    res.json(questionModel);
  } catch (err) {
    res.status(401).json({
      message: err.message,
    });
    console.log(err);
  }
};

const getQuestion = async (req, res) => {
  try {
    const questions = await Question.find({});
    res.status(201).json({
      message: questions,
    });
  } catch (err) {
    res.status(401).json({
      message: err.message,
    });
  }
};

module.exports = {
  getQuestion,
  putQuestion,
  // eslint-disable-next-line prettier/prettier
};