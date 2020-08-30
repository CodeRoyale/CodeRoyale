const Testcase = require('../models/testCase');

const putTestcase = async (req, res) => {
  try {
    const testcase = await Testcase.create(req.body);
    res.status(201).json({
      message: testcase,
    });
  } catch (err) {
    res.status(401).json({
      message: err.message,
    });
  }
};

const getTestcase = async (req, res) => {
  try {
    const testArray = {};
    let arr = Array(req.query.id);
    const n = arr.length;
    let i;
    // eslint-disable-next-line no-plusplus
    for (i = 0; i < n; i++) {
      // eslint-disable-next-line no-await-in-loop
      const testcase = await Testcase.findOne({
        qid: {
          $in: req.query.id,
        },
      });
      testArray[arr[i]] = testcase.testcases;
    }
    res.status(200).json({
      message: testArray,
    });
  } catch (err) {
    res.status(401).json({
      message: err.message,
    });
  }
};

module.exports = {
  putTestcase,
  getTestcase,
};
