const URL_TOKEN = 'https://opentdb.com/api_token.php?command=request';

const getToken = async () => {
  const data = await fetch(URL_TOKEN);
  const dataJson = await data.json();
  return dataJson.token;
};

const getQuestion = async (token) => {
  const URL_QUESTION = `https://opentdb.com/api.php?amount=5&token=${token}`;
  const data = await fetch(URL_QUESTION);
  const dataJson = await data.json();
  return dataJson;
};

export { getToken, getQuestion };
