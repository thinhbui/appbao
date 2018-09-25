import { GET_NEWS, GET_NEWS_SUCCESS, GET_NEWS_FAIL } from '../constants/actionTypes';
import { getNewsByCategory } from '../services/newsAPI';

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

const getNewsData = data => async (dispatch) => {
  const result = await getNewsByCategory(data);

  if (result.status === 200) {
    dispatch(getNewsSuccess(result.data));
  } else {
    dispatch(getNewsFail());
  }
};

export default getNewsData;
