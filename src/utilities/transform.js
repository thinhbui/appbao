import { Dimensions, Platform } from 'react-native';
import { isIphoneX, isGalaxy } from './device';

const windowSize = Dimensions.get('window');
const ratioH = windowSize.height / 667;
const ratioW = windowSize.width / 375;
const iOSStatusBarHeight = isIphoneX() === true ? 40 * ratioH : 20 * ratioH;
const statusBarHeight = Platform.OS === 'ios' ? iOSStatusBarHeight : 20 * ratioH;
const navBarHeight =
  Platform.OS === 'ios'
    ? 44 * ratioH + statusBarHeight
    : isGalaxy()
      ? 25 * ratioH + statusBarHeight
      : 35 * ratioH + statusBarHeight;

export { statusBarHeight, navBarHeight, windowSize, ratioH, ratioW };
