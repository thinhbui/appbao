import { Platform } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { isIphoneX } from '../../utilities/device';
import * as d from '../../utilities/transform';
import { Fonts } from '../../constants';

const styles = ScaledSheet.create({
  container: {
    width: d.windowSize.width,
    height: d.navBarHeight,
    backgroundColor: '#C21E2B',
    // #F65A5D
  },
  headerComponent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop:
      /* eslint-disable */
      Platform.OS === 'ios' ? d.statusBarHeight : 13 * d.ratioH,
    /* eslint-enable */
    paddingHorizontal: 10 * d.ratioW,
    height: '100%',
  },
  centerHeaderStyle: {
    paddingTop: 5 * d.ratioH,
  },
  centerHeaderTextStyle: {
    fontSize: 18 * d.ratioW,
    fontWeight: '500',
    fontFamily: Fonts.regular,
  },
  rightHeaderStyle: {
    alignItems: 'flex-end',
    width: 50 * d.ratioW,
    height: 30 * d.ratioW,
  },
});

export default styles;
