const fetch = require("node-fetch");

const getQuestions = async (noIds) => {
  let response = await fetch(`${process.env.QAPI_URL}?noIds=${noIds}`, {
    method: "GET",
    headers: {
      useQueryString: true,
      accept: "application/json",
    },
  });
  response = await response.json();
  return response.message;
};

const getTestcase = async (id) => {
  let response = await fetch(
    `${process.env.QAPI_URL + "getTestcase"}?id=${id}`,
    {
      method: "GET",
      headers: {
        useQueryString: true,
        accept: "application/json",
      },
    }
  );
  response = await response.json();
  return response.message;
};
module.exports = { getQuestions, getTestcase };
