import { Dimensions, Platform } from 'react-native';

const isIphoneX = () => {
  const dimen = Dimensions.get('window');
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (dimen.height === 812 || dimen.width === 812)
  );
};

const isGalaxy = () => {
  const dimen = Dimensions.get('window');
  return Platform.OS === 'android' && (dimen.height === 692 || dimen.width === 692);
};

export { isIphoneX, isGalaxy };
