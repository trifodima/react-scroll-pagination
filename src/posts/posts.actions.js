import axios from 'axios';

import { processErrorRes } from '../common/utils';
import { API_URL } from '../common/configs';

export const POSTS_REQUEST = 'POSTS_REQUEST';
export const POSTS_SUCCESS= 'POSTS_SUCCESS';
export const POSTS_FAILURE = 'POSTS_FAILURE';

export const requestPosts = (skip, limit) => ({
  type: POSTS_REQUEST,
  skip: skip + limit,
  limit
});
export const postsSuccess = (newsList) => {
  return {
    type: POSTS_SUCCESS,
    newsList,
    hasMore: newsList.length > 0 // You can either make an additional request to check whether there are still items left to fetch or return a hasMore property with a response from the api to instantly get info about it.
  }
};
export const requestError = (error) => ({
  type: POSTS_FAILURE,
  errorMessage: error
});


export function fetchPosts(skip, limit) {
  return (dispatch) => {
    console.log('skip = ', skip);
    console.log('limit = ', limit);

    dispatch(requestPosts(skip, limit));

    //return axios.get(`${API_URL}/posts?skip=${skip}&limit=${limit}`)
    return axios.get(`${API_URL}/news/`)
      .then(response => {
        const { data } = response;
        if (data) {
          dispatch(postsSuccess(data));
        } else {
          dispatch(requestError('err'));
        }
      })
      .catch((error) => dispatch(requestError(processErrorRes(error))));
  }
}
