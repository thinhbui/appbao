import { createSwitchNavigator } from 'react-navigation';
import Loading from '../containers/Loading';
import Drawer from './drawerNavigator';

export default createSwitchNavigator(
  {
    Drawer,
    Loading,
  },
  {
    initialRouteName: 'Loading',
  },
);
