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
  response = await response.json();
  return response.message;
};

module.exports = { getQuestions };
