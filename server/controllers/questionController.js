const Question = require('../models/questionModel');

const putQuestion =  async (req, res) => {
    try {
        const {
            question_title,
            problem_code,
            description,
            author,
            tags,
            date_added,
            time_limit,
            source_limit,
            difficulty,
        } = req.body; // storing everything from request body into new question object
        let question = {};
        question.question_title = question_title;
        question.problem_code = problem_code;
        question.description = description;
        question.author = author;
        question.tags = tags;
        question.date_added = date_added;
        question.time_limit = time_limit;
        question.source_limit = source_limit;
        question.difficulty = difficulty;
        let questionModel = new Question(question);
        await questionModel.save();
        res.json(questionModel);
    }
    catch (err) {
        res.status(401).json(
            { message:err.message }
        )
        console.log(err);
    }
};




const getQuestion = async (req, res) => {
    try {
      const questions = await Question.find({});
      res.status(201).json({ message: questions });
    } catch (err) {
      res.status(401).json({ message: err.message });
    }
  };

  module.exports = {
    getQuestion,
    putQuestion,
  };