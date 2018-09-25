import { GET_WEATHER, GET_WEATHER_SUCCESS, GET_WEATHER_FAIL } from '../constants/actionTypes';

const getWeather = () => ({
  type: GET_WEATHER,
});

const getWeatherSuccess = data => ({
  type: GET_WEATHER_SUCCESS,
  payload: data,
});

const getWeatherFail = () => ({
  type: GET_WEATHER_FAIL,
});

const getWeatherData = data => (dispatch) => {
  dispatch(getWeather());
  try {
    dispatch(getWeatherSuccess(data));
  } catch (error) {
    dispatch(getWeatherFail());
  }
};

export default getWeatherData;
