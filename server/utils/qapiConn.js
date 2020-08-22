const fetch = require('node-fetch');

const getQuestions = async () => {

Url = 'http://localhost:3000/questions/random?noIds=3';

async function getQuestions(url = '') {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      useQueryString: true,
      accept: 'application/json',
    },
  });
  return await response.json();
}
// (async () => {
//   let data = await getQuestions(Url);
//   return data;
// })();
  
};

module.exports = { getQuestions };