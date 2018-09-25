import { AsyncStorage, Platform } from 'react-native';
import axios from 'axios';
import moment from 'moment';

const HOST = 'https://admin.vntimes.app/api';
const OAUTH = 'https://admin.vntimes.app/oauth/token';
const token = '';
const tokenDefault =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjdiMDg4ZDlkYTY0MTU1OWYyODI1ZDJmOTgxYmRiOWFiZjIwYmIzMmZhMjE4N2E5NzdhMmMwMTViNWY3NTg0MmJjMjE2ZjQyOGMxMTNhN2U0In0.eyJhdWQiOiI2IiwianRpIjoiN2IwODhkOWRhNjQxNTU5ZjI4MjVkMmY5ODFiZGI5YWJmMjBiYjMyZmEyMTg3YTk3N2EyYzAxNWI1Zjc1ODQyYmMyMTZmNDI4YzExM2E3ZTQiLCJpYXQiOjE1Mzc1ODM3NDQsIm5iZiI6MTUzNzU4Mzc0NCwiZXhwIjoxNTM4ODc5NzQ0LCJzdWIiOiIiLCJzY29wZXMiOltdfQ.M6H1sVk5UKTrZhqxKfsJV30pPSILns0Up9_7dBEjdxU3nFnaoVBju-1axOBCBUsZLEvdLFpsgCZFyGY1E1D6yGogoUdgupctZwvbf7nccITwQk-UtTsvw_fo8j58Ya5nH4jmkEXjWOmX2beK_CuF-b2zv8LkyTIzFqBPnnJ0Ux4AyuRkoj3LGjmv3xAtzSSjJ8m2zldrF6hHQXXJMjEidD6KJLbwDS3fdDDgVWhlUUxu0cILW183-6qBtVueJFChxyFMNehy33JlgnftmuuW_CchPxMlPO4_k-6URib8r8PolhNU3-L8lDiNdE1sxE75ZJybSC_xWTw0z6Ng09yKME_LjXJQjDrtJK_cZAN0dR7mC0ai8YHbEK5PHknmE8wEmTYwYbkeFmgXgirW-eb-WAhVBzJ6cb9Y6uNBY8kEY3RaeOELRHbJM8DiCkO3DMqKPWti5yZdVE_efSAl-ogDueSZE-VHlMbrhl-v5lrBPqqF2DXbBMQOIsnA_-VyrDpdQO0qC5td4V2R20IbfZU8LYEHUhbZJEanrapcSFft4ZwF9C8N7OkepHqaWoyXiN8U2hdcfki0_UuFOaueC45_s-aq9Xa45YC3WwBwKYztLjbeYJagf7yRCUALEqiCWftF7C1lLMwsrn2Zpe-VqTJxE6CPK9YASy4zikwC5v62XPI';
const lightService = axios.create({
  baseURL: HOST,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// const oauth = async () => {
//   try {
//     const result = await axios.post(OAUTH, {
//       client_id: 6,
//       client_secret: 'TSX321PeG4lE0vILIU0Rw03lV6tRFjM8Q99hRdbI',
//       grant_type: 'client_credentials',
//     });
//     console.log(result);
//     if (result.status === 200) {
//       lightService.defaults.headers.Authorization = `${result.data.token_type} ${
//         result.data.access_token
//       }`;
//     }
//   } catch (error) {
//     // lightService.defaults.headers.Authorization = tokenDefault;
//     console.log('OAUTH ', error);
//   }
// };

const oauth = async () => {
  try {
    const tokenStorage = JSON.parse(await AsyncStorage.getItem('token'));

    const refreshToken = tokenStorage ? tokenStorage.refreshToken : null;
    const duration = tokenStorage
      ? moment(tokenStorage.expireDate, 'DD/MM/YYYY HH:mm:ss').diff(moment(), 'second')
      : null;

    if (tokenStorage) {
      if (duration < 0) {
        const result = await axios.post(OAUTH, {
          client_id: 6,
          client_secret: 'TSX321PeG4lE0vILIU0Rw03lV6tRFjM8Q99hRdbI',
          grant_type: 'refresh_token',
          refresh_token: refreshToken,
        });
        if (result.status === 200) {
          lightService.defaults.headers.Authorization = `${result.data.token_type} ${
            result.data.access_token
          }`;
          const tokenObject = {
            accessToken: `${result.data.token_type} ${result.data.access_token}`,
            expireDate: moment()
              .add(1296000, 'seconds')
              .format('DD/MM/YYYY HH:mm:ss'),
            refreshToken: result.data.refresh_token,
          };
          AsyncStorage.setItem('token', JSON.stringify(tokenObject));
        }
      } else {
        lightService.defaults.headers.Authorization = tokenStorage.accessToken;
      }
    } else {
      const resultWeather = await axios.get('https://api.openweathermap.org/data/2.5/forecast?lat=21.025849&lon=105.800397&appid=cb9867d86274c8d87e60b42395ef27fd');
      const result = await axios.post(OAUTH, {
        client_id: 6,
        client_secret: 'TSX321PeG4lE0vILIU0Rw03lV6tRFjM8Q99hRdbI',
        grant_type: 'client_credentials',
      });
      lightService.defaults.headers.Authorization = `${result.data.token_type} ${
        result.data.access_token
      }`;
    }
  } catch (error) {
    // const tokenObject = {
    //   accessToken: tokenDefault,
    //   expireDate: moment()
    //     .add(1296000, 'seconds')
    //     .format('DD/MM/YYYY HH:mm:ss'),
    //   refreshToken: 'refresh_token',
    // };
    // AsyncStorage.setItem('token', JSON.stringify(tokenObject));
    // lightService.defaults.headers.Authorization = tokenDefault;
    console.log('OAUTH ', error);
  }
};

const login = async (id, email, name, social, full_name, avatar) => {
  try {
    const result = await lightService.post('/v1/login/social', {
      id,
      email,
      name,
      social,
      full_name,
      avatar,
    });
    console.log(result);

    lightService.defaults.headers.Authorization = `${result.data.token_type} ${
      result.data.access_token
    }`;
    return result;
  } catch (error) {
    console.log('login', error);
    return null;
  }
};

const user = async () => {
  try {
    return await lightService.get('/user');
  } catch (error) {
    console.log('user', error);
    return null;
  }
};

const getCategories = async () => {
  try {
    const result = await lightService.get('/v1/categories');
    console.log(lightService.defaults.headers.Authorization);
    return result;
  } catch (error) {
    console.log('getCategories', error);
    return null;
  }
};

const getNewsByCategory = async (category_id, page, user_report) => {
  try {
    return await lightService.post('/v1/posts', {
      category_id,
      page_size: 10,
      page,
      user_report,
    });
  } catch (error) {
    console.log('getNewsByCategory', error);
    return null;
  }
};

const getVideos = async () => {
  try {
    // console.log(page);
    return await lightService.get(`/v1/post/client/video?page_size=15`);
  } catch (error) {
    console.log('getVideos', error);
    return null;
  }
};

const getNewsDetail = async (id, user_id) => {
  try {
    return await lightService.get(`/v1/posts/${id}?user_id=${user_id}`);
  } catch (error) {
    console.log('getNewsDetail', error);
    return null;
  }
};

const getComment = async (id) => {
  try {
    return await lightService.get(`/v1/comments/${id}?page_size=10`);
  } catch (error) {
    console.log('getComment', error);
    return null;
  }
};

const comment = async (post_id, content, comment_id) => {
  let commentObject = {};
  if (comment_id) {
    commentObject = {
      post_id,
      content,
      comment_id,
    };
  } else {
    commentObject = {
      post_id,
      content,
    };
  }
  console.log(commentObject);

  try {
    return await lightService.post('/v1/posts/comment', {
      ...commentObject,
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};

const like = async (post_id) => {
  console.log(post_id);

  try {
    return await lightService.post('/v1/posts/like', {
      post_id,
    });
  } catch (error) {
    console.log('like', error);
    return null;
  }
};

const searchPost = async (keyword, page_current, user_report) => {
  try {
    return await lightService.post('/v1/search/post', {
      keyword,
      page_current,
      page_size: 10,
      user_report,
    });
  } catch (error) {
    console.log('searchPost', error);
    return null;
  }
};
const getSubComment = async (id) => {
  try {
    return await lightService.get(`/v1/comment/${id}`);
  } catch (error) {
    return null;
  }
};
const deleteComment = async (id) => {
  try {
    return await lightService.delete(`/v1/comments/${id}`);
  } catch (error) {
    console.log('likeComment', error);
    return null;
  }
};
const likeComment = async (id) => {
  try {
    return await lightService.get(`/v1/comment/${id}/like`);
  } catch (error) {
    console.log('likeComment', error);
    return null;
  }
};

const level = async () => {
  try {
    return await lightService.get('/v1/level');
  } catch (error) {
    return null;
  }
};

const myComment = async () => {
  try {
    return await lightService.get('/v1/my_comment');
  } catch (error) {
    return null;
  }
};
const getAds = async () => {
  try {
    return await lightService.get(`v1/ads/${Platform.OS === 'android' ? 3 : 4}`);
  } catch (error) {
    return null;
  }
};

const getReportTypes = async () => {
  try {
    return await lightService.get('v1/report');
  } catch (error) {
    return null;
  }
};

const reportPost = async (post_id, data) => {
  try {
    return await lightService.post('v1/report', {
      post_id,
      data: JSON.stringify(data),
    });
  } catch (error) {
    return null;
  }
};

const follow = async (frame_id) => {
  try {
    return await lightService.get(`v1/follow?frame_id=${frame_id}`);
  } catch (error) {
    return null;
  }
};

const getFollow = async () => {
  try {
    return await lightService.get('v1/my_follow');
  } catch (error) {
    return null;
  }
};
const getHistory = async (page) => {
  try {
    return await lightService.post('v1/posts/histories', {
      page_size: 15,
      page,
    });
  } catch (error) {
    return null;
  }
};

const getFrame = async (id, page) => {
  try {
    return await lightService.get(`v1/frame/${id}?page=${page}`);
  } catch (error) {
    return null;
  }
};

const getHotNews = async () => {
  try {
    return await lightService.get('v1/posts/client/top_view');
  } catch (error) {
    return null;
  }
};

const getSource = async () => {
  try {
    return await lightService.get('v1/frame/mobile/all?page_size=10&page=1');
  } catch (error) {
    return null;
  }
};

const logout = () => {
  lightService.defaults.headers.Authorization = tokenDefault;
};

export {
  getHistory,
  getCategories,
  getNewsByCategory,
  getNewsDetail,
  comment,
  like,
  login,
  searchPost,
  getComment,
  tokenDefault,
  lightService,
  user,
  deleteComment,
  likeComment,
  getSubComment,
  oauth,
  level,
  myComment,
  getAds,
  getReportTypes,
  reportPost,
  follow,
  getFollow,
  logout,
  getVideos,
  getFrame,
  getHotNews,
  getSource,
};
