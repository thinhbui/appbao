// import { GET_NEWS, GET_NEWS_SUCCESS, GET_NEWS_FAIL } from '../constants/actionTypes';

// const INIT_STATE = {
//   isLoading: false,
//   error: false,
//   data: [],
//   completed: false,
// };

// export default (state = INIT_STATE, action) => {
//   switch (action.type) {
//     case GET_NEWS:
//       return {
//         ...state,
//         isLoading: true,
//       };
//     case GET_NEWS_SUCCESS:
//       return {
//         ...state,
//         isLoading: false,
//         data: action.payload,
//         completed: true,
//       };
//     case GET_NEWS_FAIL:
//       return {
//         ...state,
//         isLoading: false,
//         completed: false,
//         error: true,
//       };
//     default:
//       return state;
//   }
// };
