// /*
//  * This function re-requests for the question after updating the token
//  * This function will be called if middleware gets response as 403 for qapi request (question, testcase)
//  */

// import store from '../store';
// import loggedInAxios from '../helpers/loggedInAxios';
// import qapiAxios from '../helpers/qapiAxios';
// import { SERVER_DOWN } from './constants';
// import {
//   PRECHECK_LOADING,
//   PRECHECK_SUCCESS,
//   PRECHECK_FAIL,
//   VETO_QUESTIONS_LOADING,
//   VETO_QUESTIONS_SUCCESS,
//   VETO_QUESTIONS_FAIL,
// } from '../actions/types';

// export const reRequestQapi = (history, quesIds) => {
//   store.dispatch({
//     type: PRECHECK_LOADING,
//   });
//   loggedInAxios(history)
//     .get('/precheck')
//     .then((response) => {
//       localStorage.token = response.data.payload.accessToken;

//       store.dispatch({
//         type: PRECHECK_SUCCESS,
//         payload: response.data,
//       });

//       // If the preCheck is successfull then fetch questions
//       store.dispatch({
//         type: VETO_QUESTIONS_LOADING,
//       });

//       qapiAxios(history)
//         .post('/questions/getQById', quesIds)
//         .then((response) => {
//           store.dispatch({
//             type: VETO_QUESTIONS_SUCCESS,
//             payload: response.data,
//           });
//         })
//         .catch((error) => {
//           store.dispatch({
//             type: VETO_QUESTIONS_FAIL,
//             payload: error.response ? error.response.data : SERVER_DOWN,
//           });
//         });
//     })
//     .catch((error) => {
//       store.dispatch({
//         type: PRECHECK_FAIL,
//         payload: error.response ? error.response.data : SERVER_DOWN,
//       });
//     });
// };
