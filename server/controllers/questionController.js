const Question = require('../models/questionModel');
const RESPONSE = require('../utils/constantResponse');


const putQuestion = async (req, res) => {
  try {
    const question = await Question.create(req.body);
    res.status(201).json({
      status: true,
      payload:{
        message: RESPONSE.CREATED,
        data: question
      }
    });
  } catch (err) {
    res.status(401).json({
      status: false,
      payload:{
        message: RESPONSE.NOTCREATED
      }
    });
  }
};

const getRandom = async (req, res) => {
  try {
    const n = parseInt(req.query.noIds, 10);
    const NRandomIds = await Question.aggregate([
      {
        $sample: {
          size: n,
        },
      },
    ]);

    const qids = [];
    let i;
    // eslint-disable-next-line no-plusplus
    for (i = 0; i < n; i++) {
      // eslint-disable-next-line no-underscore-dangle
      qids.push(NRandomIds[i]._id);
    }

    res.status(200).json({
      status: true,
      payload: {
        message: RESPONSE.RECEIVED,
        data: qids
      }
    });
  } catch (err) {
    res.status(401).json({
      status: false,
      message: RESPONSE.NOTRECEIVED
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
        status: true,
        payload: {
          message: RESPONSE.RECEIVED,
          data: questions
        }
        
      });
    } else {
      const questions = await Question.findOne({});

      res.status(200).json({
        status: true,
        payload: {
          message: RESPONSE.RECEIVED,
          data: questions
        }
        
      });
    }
  } catch (err) {
    res.status(401).json({
      status: false,
      payload: {
        message: RESPONSE.NOTRECEIVED
      }
    });
  }
};

const getQuestionById = async (req, res) => {
  try {
    const size = req.body.id.length;
    const qids = [];
    let i;
    for (i = 0; i < size; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const question = await Question.findOne({ _id: req.body.id[i] });
      qids.push(question);
    }
    res.status(200).json({
      status: true,
      payload: {
        message: RESPONSE.RECEIVED,
        data: qids
      }
    });
  } catch (err) {
    // wrong id by user
    res.status(401).json({
      status: false,
      payload: {
        message: RESPONSE.NOTRECEIVED
      }
    });
  }
};

const deleteQuestion = async (req, res) => {
  try {
    const resp = await Question.remove({});
    res.status(201).json({
      status: true,
      payload: {
        message: RESPONSE.DELETED,
        data: resp
      }
    });
  } catch (err) {
    res.status(401).json({
      status: false,
      payload: {
        message: RESPONSE.NOTDELETED
      }
    });
  }
};

const deleteQuestionById = async (req, res) => {
  try {
    const deleteMessage = await Question.deleteOne({
      _id: req.params.questionId,
    });
    res.status(201).json({
      status: true,
      payload: {
        message: RESPONSE.DELETED,
        data: deleteMessage
      }
    });
  } catch (err) {
    res.status(401).json({
      status: false,
      payload: {
        message: RESPONSE.NOTDELETED
      }
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
      status: true,
      payload: {
        message: RESPONSE.UPDATE,
        data: updateMessage
      }
    });
  } catch (err) {
    res.status(401).json({
      status: true,
      payload: {
        message: RESPONSE.NOTRECEIVED
      }
    });
  }
};

module.exports = {
  putQuestion,
  getRandom,
  getQuestion,
  getQuestionById,
  deleteQuestion,
  deleteQuestionById,
  patchQuestionById,
};
