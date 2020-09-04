
const fetch = require('node-fetch');

//POST URL
const postUrl = 'http://ec2-34-227-73-43.compute-1.amazonaws.com/submissions/batch?base64_encoded=true';

//testcases encoding to base64
const testcasestobase64 = ( test ) => {
	encoded_test = "";
	let testcases = [];
	try{
		for (i of test) {
			encoded_input = Buffer.from(i.input).toString('base64');
			encoded_output = Buffer.from(i.output).toString('base64');
			var data = {"input":encoded_input,"output":encoded_output};
			testcases.push(data);
		}
		
	} catch(err){
		console.log(err);
	}
	return testcases;
}

//source code encoding to base64
const codetobase64 = ( source ) => {
	var encoded_source = "";
	try {
		encoded_source = Buffer.from(source).toString('base64');
	} catch(err){
		console.log(err);
	}
	return encoded_source;
}

// create required body data for create batch submission
const createBody = (test, source, lang) => {
	encoded_code  = codetobase64(source);
	encoded_test = testcasestobase64(test);
	let data = [];
	for ( i of encoded_test)
		{
		 var sub = {
		    "language_id": lang,
		    "source_code": encoded_code,
		    "stdin": i.input,
		    "expected_output":i.output
		 };
		 data.push(sub);
		}
	const body = {
	  "submissions": data
	}
	return body;
}

// create a URL for get batch submission
const createUrl = (responseTokens) => {
	let tokens = "";
	for ( tok of responseTokens)
		{
		  tokens = tokens + ',' + tok.token;
		};
	const url = 'http://ec2-34-227-73-43.compute-1.amazonaws.com/submissions/batch?tokens=' + tokens.slice(1) + '&base64_encoded=false&fields=token,stdout,stderr,status_id,language_id';
	return url;
};

// function for creating a post submissionn
async function postData(url = '', data = {}) {
	const response = await fetch(url ,{
	  method: 'POST',
	  headers: {
	    "Content-Type": "application/json",
	    "accept": "application/json",
	    "useQueryString": true,
	  },
	  body: JSON.stringify(data)
	});
	return response.json();
}

// function for getting a get submissionn
async function getData(url = '') {
	const response = await fetch(url, {
	  method: 'GET',
	  headers: {
	    "useQueryString": true,
	  },
	});
	return response.json();
}

// send test cases in array and source code in string all should be base64 encoded and language ID
const submitCode = (testCase, code, langId) => {
  // body data
  const bodyData = createBody(testCase, code, langId);

  // do a batch submission with url and submission data
  postData(postUrl, bodyData)
  	// response data is send in data write with then and it contains all tokens
    .then(data => {
    	// parsing all data to get tokens using createUrl
        const getUrl = createUrl(data);
        // time out is set to give time for server to load the answer properly to send response
        setTimeout(() => {
          // getData called to get submission results
          getData(getUrl)
            .then(data => {
              return data;
            });
         }, 2000);
        
  });
};

module.exports = { submitCode };
