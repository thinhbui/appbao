import { SAVE_USER_SUCCESS, SAVE_USER_FAIL } from '../constants/actionTypes';

const saveUserSuccess = data => ({
  type: SAVE_USER_SUCCESS,
  payload: data,
});

const saveUserFail = () => ({
  type: SAVE_USER_FAIL,
});

const saveUserData = data => (dispatch) => {
  try {
    dispatch(saveUserSuccess(data));
  } catch (error) {
    dispatch(saveUserFail());
  }
};

export default saveUserData;
