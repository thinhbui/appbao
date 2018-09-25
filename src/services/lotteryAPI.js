import axios from 'axios';
import * as rssParser from 'react-native-rss-parser';

const getLottery = async () => {
  try {
    // const result = await axios.get('https://xskt.com.vn/rss-feed/mien-nam-xsmn.rss');
    // const lotteryResult = await rssParser.parse(result.data);
    // console.log('lottery ', result);
    // console.log('lottery ', lotteryResult);
    // console.log('lottery ', await rssParser.parse(lotteryResult.items[0].description));
    // return result;
  } catch (error) {
    console.log('lottery error ', error);
  }
};

export default getLottery;
