import { createStackNavigator } from 'react-navigation';
import Drawer from '../containers/Drawer';

export default createStackNavigator(
  {
    Drawer,
  },
  {
    initialRouteName: 'Drawer',
    mode: 'card',
    headerMode: 'none',
  },
);
