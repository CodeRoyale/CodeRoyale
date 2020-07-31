const Question = require('../models/questionModel');

const putQuestion = async (req, res) => {
  try {
    const question = await Question.create(req.body);
    res.status(201).json({
      message: question,
    });
  } catch (err) {
    res.status(401).json({
      message: err.message,
    });
  }
};

const getQuestion = async (req, res) => {
  try {
    if (req.query.tags) {
      const questions = await Question.find({
        tags: {
          $in: req.query.tags,
        },
      });

      res.status(200).json({
        message: questions,
      });
    } else {
      const questions = await Question.findOne({});

      res.status(200).json({
        message: questions,
      });
    }
  } catch (err) {
    res.status(401).json({
      message: err.message,
    });
  }
};

const deleteQuestion = async (req, res) => {
  try {
    const resp = await Question.remove({});
    res.status(201).json({
      message: resp,
    });
  } catch (err) {
    res.status(200).json({
      message: err.message,
    });
  }
};

const deleteQuestionById = async (req, res) => {
  try {
    const deleteMessage = await Question.deleteOne({
      _id: req.params.questionId,
    });
    res.status(201).json({
      message: deleteMessage,
    });
  } catch (err) {
    res.status(401).json({
      message: err.message,
    });
  }
};

const patchQuestionById = async (req, res) => {
  try {
    const updateMessage = await Question.updateOne(
      {
        _id: req.params.questionId,
      },
      {
        $set: req.body,
      }
    );

    res.status(201).json({
      message: updateMessage,
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
  deleteQuestion,
  deleteQuestionById,
  patchQuestionById,
};
