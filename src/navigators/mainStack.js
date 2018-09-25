import { createStackNavigator } from 'react-navigation';
import NewsTab from './newsTab';
import NewsDetail from '../containers/NewsDetail';
import Category from './TabBar/Category';
import Search from '../containers/Search';
import CommentDetail from '../containers/NewsDetail/CommentDetail';
import AccountPage from '../containers/Drawer/AccountPage';
import Setting from '../containers/Setting';
import Ads from '../containers/Ads';
import AccountSetting from '../containers/Setting/AccountSetting';
import VideoDetail from '../containers/VideoDetail';
import MyComment from '../containers/MyComment';
import History from '../containers/History';
import UserLevel from '../containers/Drawer/User/UserLevel';
import LevelIntroduction from '../containers/Drawer/User/UserLevel/LevelIntroduction';
import Notification from '../containers/Notification';
import Wallet from '../containers/Wallet';
import Lotery from '../containers/Lotery';
import TabViewExample from '../containers/NewsTab';
import Source from '../containers/Source';

export default createStackNavigator(
  {
    NewsTab,
    NewsDetail,
    VideoDetail,
    Setting,
    AccountSetting,
    AccountPage,
    Category,
    Search,
    CommentDetail,
    Ads,
    MyComment,
    History,
    UserLevel,
    LevelIntroduction,
    Notification,
    Wallet,
    Lotery,
    TabViewExample,
    Source,
  },
  {
    initialRouteName: 'TabViewExample',
    mode: 'card',
    headerMode: 'none',
  },
);
