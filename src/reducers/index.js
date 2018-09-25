import { combineReducers } from 'redux';

import saveUserReducers from './saveUserReducers';
import getWeatherReducers from './getWeatherReducers';
// import getNewsReducers from './getNewsReducers';
import getCurrentWeatherReducers from './getCurrentWeatherReducers';
import categories from './category';
import news from './news';
import levelReducers from './levelReducers';
import changeFontSizeReducer from './changeFontSizeReducer';
import getFollowReducers from './getFollowReducers';

const appReducer = combineReducers({
  saveUserReducers,
  getWeatherReducers,
  // getNewsReducers,
  getFollowReducers,
  getCurrentWeatherReducers,
  categories,
  news,
  levelReducers,
  changeFontSizeReducer,
});

export default appReducer;
