const mongoose = require('mongoose');

const subschema = new mongoose.Schema(
  {
    input: {
      type: String,
    },
    output: {
      type: String,
    },
  },
  { _id: false }
);

const testcaseSchema = new mongoose.Schema({
  problemCode: {
    type: String,
    required: true,
    unique: true,
  },
  testcases: {
    type: [subschema],
  },
});

// eslint-disable-next-line prettier/prettier
module.exports = mongoose.model('testcase', testcaseSchema);
