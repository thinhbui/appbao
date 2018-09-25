import { GET_NEWS, GET_NEWS_SUCCESS, GET_NEWS_FAIL } from '../constants/actionTypes';

const getNews = () => ({
  type: GET_NEWS,
});

const getNewsSuccess = data => ({
  type: GET_NEWS_SUCCESS,
  payload: data,
});

const getNewsFail = () => ({
  type: GET_NEWS_FAIL,
});

const getNewsData = data => (dispatch) => {
  dispatch(getNews());
  try {
    dispatch(getNewsSuccess(data));
  } catch (error) {
    dispatch(getNewsFail());
  }
};

export default getNewsData;
