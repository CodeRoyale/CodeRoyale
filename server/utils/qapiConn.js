<<<<<<< HEAD
const getQuestions = async (n) => {
  // return n random questions
  return ["23", "434", "1235", "3"];
=======
const fetch = require("node-fetch");

QAPI_URL = "http://localhost:3000/questions/random";

const getQuestions = async (noIds) => {
  const response = await fetch(`${QAPI_URL}?noIds=${noIds}`, {
    method: "GET",
    headers: {
      useQueryString: true,
      accept: "application/json",
    },
  });
  return await response.json();
>>>>>>> feature/getQuestion
};

module.exports = { getQuestions };
