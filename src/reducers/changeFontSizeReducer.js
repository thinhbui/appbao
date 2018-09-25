import { CHANGE_FONT_SIZE } from '../constants/actionTypes';
import * as d from '../utilities/transform';

const INIT_STATE = {
  data: 16 * d.ratioW,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case CHANGE_FONT_SIZE:
      return {
        data: action.payload,
      };
    default:
      return state;
  }
};
