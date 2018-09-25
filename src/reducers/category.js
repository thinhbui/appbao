import { GET_CATEGORIES } from '../constants/actionTypes';

const initialState = { categories: [], suggests: [] };

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CATEGORIES: {
      console.log(action.payload);

      return {
        categories: action.payload.categories,
        suggests: action.payload.suggests,
      };
    }
    default:
      return state;
  }
};
