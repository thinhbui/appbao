import axios from 'axios';

const API = 'https://www.googleapis.com/youtube/v3/videos';

const getVideos = async () => {
  try {
    return await axios.get(API, {
      chart: 'mostPopular',
      regionCode: 'VN',
      part: 'snippet,contentDetails,statistics',
      videoCategoryId: '',
    });
  } catch (error) {
    console.log('get video api ', error);
    return null;
  }
};

export default getVideos;
