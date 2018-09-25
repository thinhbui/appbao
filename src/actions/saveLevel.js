import { SAVE_LEVEL_FAIL, SAVE_LEVEL } from '../constants/actionTypes';
import { level } from '../services/newsAPI';

const saveLevelSuccess = data => ({ type: SAVE_LEVEL, payload: data });
const saveLevelFail = () => ({ type: SAVE_LEVEL_FAIL });

const saveLevel = () => async (dispatch) => {
  const result = await level();
  try {
    if (result.status === 200) {
      dispatch(saveLevelSuccess(result.data));
    }
  } catch (error) {
    dispatch(saveLevelFail());
  }
};

export default saveLevel;
