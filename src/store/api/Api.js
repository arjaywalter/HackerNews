import Config from 'react-native-config';
import axios from 'axios';
import * as transformer from './transformer';

const baseURL = Config.BASE_URL;
// const apiKey = Config.API_KEY;
const PAGE_COUNT = 10;

const instance = axios.create({
  baseURL: baseURL,
  headers: {
    // 'x-api-key': apiKey,
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    // Authorization: 'Basic Y29kZWdlZWszMTpuZW1lc2lzQDAx',
  },
});

async function request(options) {
  let successData = {};
  let hasError = false;
  let errorMessage = null;

  await instance(options)
    .then(response => {
      // console.log('*** RESPONSE', response);
      successData = response.data || response._response;
    })
    .catch(error => {
      hasError = true;
      if (error.response) {
        // When response status code is out of 2xxx range
        console.log('*** ERROR 1');
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        errorMessage = error.response.data.Description;
      } else if (error.request) {
        console.log('*** ERROR 2');
        // When no response was received after request was made
        console.log(error.request);
        errorMessage = error.request._response;
      } else {
        console.log('*** ERROR 3');
        // Error
        console.log(error.message);
        errorMessage = error.message;
      }
    });

  if (hasError) {
    throw new Error(errorMessage || 'Unknown error');
  }

  return successData;
}

export const getErrorMessage = error => {
  const message =
    (error.response && error.response.data && error.response.data.message) ||
    error.message ||
    error.toString();
  return message;
};

export const fetchTopStoriesApi = async () => {
  const options = {
    method: 'get',
    url: `${baseURL}/v0/topstories.json`,
    transformResponse: [res => transformer.transformStories(JSON.parse(res))],
  };
  return request(options);
};

export const fetchStoryApi = async ({id}) => {
  const options = {
    method: 'get',
    url: `${baseURL}/v0/item/${id}.json`,
  };
  return request(options);
};

export const fetchAuthorApi = async ({username}) => {
  const options = {
    method: 'get',
    url: `${baseURL}/v0/user/${username}.json`,
  };
  return request(options);
};
