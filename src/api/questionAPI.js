import qapiAxios from '../helpers/qapiAxios';

/* eslint-disable import/prefer-default-export */
export const getQuestionById = async (history, quesIds) => {
  const response = await qapiAxios(history, quesIds).post(
    '/questions/getQById',
    {
      id: quesIds,
    }
  );

  return response.data;
};
