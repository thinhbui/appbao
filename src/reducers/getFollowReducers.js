import { GET_FOLLOW, GET_FOLLOW_FAIL } from '../constants/actionTypes';

const INIT_STATE = {
  isLoading: false,
  error: false,
  data: [],
  completed: false,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_FOLLOW:
      return {
        ...state,
        isLoading: false,
        completed: true,
        data: action.payload,
      };
    case GET_FOLLOW_FAIL:
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
