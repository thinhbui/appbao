import { AsyncStorage } from 'react-native';
import { GET_CATEGORIES } from '../constants/actionTypes';
import { getCategories } from '../services/newsAPI';
import { StorageTypes } from '../constants';

export const getSuccessCategories = categories => ({ type: GET_CATEGORIES, payload: categories });

const getCategory = () => async (dispatch) => {
  const result = await getCategories();
  if (result.status === 200) {
    const categories = [
      // { id: 1, name: 'Đề xuất', slug: 'de-xuat' },
      { id: 123, name: 'Theo dõi', slug: 'theo-doi' },
      ...result.data.filter(item => item.parent_id === null),
    ];
    const suggests = [];
    AsyncStorage.setItem(StorageTypes.CATEGORIES, JSON.stringify({ categories, suggests }));
    dispatch(getSuccessCategories({ categories, suggests }));
  }
};

export default getCategory;
