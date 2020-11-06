const Testcase = require('../models/testCase');
const RESPONSE = require('../utils/constantResponse');

const putTestcase = async (req, res) => {
  try {
    const testcase = await Testcase.create(req.body);
    res.status(201).json({
      status: true,
      payload: {
        message: RESPONSE.CREATED,
        data: testcase
      }
    });
  } catch (err) {
    res.status(406).json({
      status: false,
      payload: {
        message: RESPONSE.MISSING
      }
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
        problemCode: {
          $in: req.query.id,
        },
      });
      testArray[arr[i]] = testcase.testcases;
    }
    res.status(200).json({
      status: true,
      payload: {
        message: RESPONSE.RECEIVED,
        data: testArray
      }
    });
  } catch (err) {
    res.status(406).json({
      status: false,
      payload: {
        message: RESPONSE.INVALID
      }
    });
  }
};

module.exports = {
  putTestcase,
  getTestcase,
};