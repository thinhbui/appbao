import {
  GET_CURRENT_WEATHER,
  GET_CURRENT_WEATHER_SUCCESS,
  GET_CURRENT_WEATHER_FAIL,
} from '../constants/actionTypes';

const INIT_STATE = {
  isLoading: false,
  error: false,
  data: [],
  completed: false,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_CURRENT_WEATHER:
      return {
        ...state,
        isLoading: true,
      };
    case GET_CURRENT_WEATHER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
        completed: true,
      };
    case GET_CURRENT_WEATHER_FAIL:
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
