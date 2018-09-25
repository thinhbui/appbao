import {
  GET_CURRENT_WEATHER,
  GET_CURRENT_WEATHER_SUCCESS,
  GET_CURRENT_WEATHER_FAIL,
} from '../constants/actionTypes';

const getCurrentWeather = () => ({
  type: GET_CURRENT_WEATHER,
});

const getCurrentWeatherSuccess = data => ({
  type: GET_CURRENT_WEATHER_SUCCESS,
  payload: data,
});

const getCurrentWeatherFail = () => ({
  type: GET_CURRENT_WEATHER_FAIL,
});

const getCurrentWeatherData = data => (dispatch) => {
  dispatch(getCurrentWeather());
  try {
    dispatch(getCurrentWeatherSuccess(data));
  } catch (error) {
    dispatch(getCurrentWeatherFail());
  }
};

export default getCurrentWeatherData;
