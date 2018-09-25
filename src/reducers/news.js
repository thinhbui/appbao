import { GET_NEWS, GET_NEWS_SUCCESS, GET_NEWS_FAIL } from '../constants/actionTypes';

export default (state = [], action) => {
  switch (action.type) {
    case GET_NEWS:
      return {
        ...state,
        isLoading: true,
      };
    case GET_NEWS_SUCCESS:
      return action.payload;
    case GET_NEWS_FAIL:
      return {
        ...state,
        isLoading: false,
        completed: false,
        error: true,
      };
    default:
      return state;
  }
};
