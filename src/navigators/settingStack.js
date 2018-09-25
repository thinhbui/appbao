import { createStackNavigator } from 'react-navigation';
import Setting from '../containers/Setting';
import AccountSetting from '../containers/Setting/AccountSetting';

export default createStackNavigator(
  {
    Setting,
    AccountSetting,
  },
  {
    initialRouteName: 'Setting',
    mode: 'card',
    headerMode: 'none',
  },
);
