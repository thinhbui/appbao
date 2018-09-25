import { SAVE_LEVEL, SAVE_LEVEL_FAIL } from '../constants/actionTypes';

const INIT_STATE = {
  isLoading: false,
  error: false,
  data: [],
  completed: false,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case SAVE_LEVEL:
      return {
        ...state,
        isLoading: false,
        completed: true,
        data: action.payload,
      };
    case SAVE_LEVEL_FAIL:
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
