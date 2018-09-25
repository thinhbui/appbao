import { GET_FOLLOW, GET_FOLLOW_FAIL } from '../constants/actionTypes';
import { getFollow } from '../services/newsAPI';

const saveLevelSuccess = data => ({ type: GET_FOLLOW, payload: data });
const saveLevelFail = () => ({ type: GET_FOLLOW_FAIL });

const getFollowApi = () => async (dispatch) => {
  const result = await getFollow();
  try {
    if (result.status === 200) {
      dispatch(saveLevelSuccess(result.data));
    }
  } catch (error) {
    dispatch(saveLevelFail());
  }
};

export default getFollowApi;
