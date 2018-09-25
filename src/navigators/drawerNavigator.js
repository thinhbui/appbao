import React from 'react';
import { createDrawerNavigator } from 'react-navigation';
import Drawer from '../containers/Drawer';
import MainStack from './mainStack';

export default createDrawerNavigator(
  {
    MainStack,
  },
  {
    contentComponent: props => <Drawer {...props} />,
  },
);
