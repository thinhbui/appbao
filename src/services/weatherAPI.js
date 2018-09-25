import axios from 'axios';

const API =
  'https://api.openweathermap.org/data/2.5/forecast?lat=21.025849&lon=105.800397&appid=cb9867d86274c8d87e60b42395ef27fd';

const getWeatherApi = async () => {
  try {
    return await axios.get(API);
  } catch (err) {
    console.log(err);
    return null;
  }
};

export default getWeatherApi;
