const fetch = require("node-fetch");

const getQuestions = async (noIds) => {
  let response = await fetch(`${process.env.QAPI_URL}random?noIds=${noIds}?lobbyID=${process.env.LOBBY_ID}`, 
  {
    method: "GET",
    headers: {
      useQueryString: true,
      accept: "application/json",
      Authorization : `Bearer ${process.env.QAPI_BEARER}`
    },
  });
  response = await response.json();
  return response.message;
};

const getTestcase = async (id) => {
  let response = await fetch(
    `${process.env.QAPI_URL + "getTestcase"}?id=${id}?lobbyID=${process.env.LOBBY_ID}`,
    {
      method: "GET",
      headers: {
        useQueryString: true,
        accept: "application/json",
        Authorization : `Bearer ${process.env.QAPI_BEARER}`
      },
    }
  );
  response = await response.json();
  return response.message[id];
};
module.exports = { getQuestions, getTestcase };
