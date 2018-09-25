import { CHANGE_FONT_SIZE } from '../constants/actionTypes';

const changeFontSizeSuccess = data => ({
  type: CHANGE_FONT_SIZE,
  payload: data,
});

const changeFontSize = data => (dispatch) => {
  dispatch(changeFontSizeSuccess(data));
};

export default changeFontSize;
