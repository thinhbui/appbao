import { Platform } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { isGalaxy } from '../../utilities/device';
import * as d from '../../utilities/transform';
import { Fonts } from '../../constants';

const styles = ScaledSheet.create({
  container: {
    width: d.windowSize.width,
    height: d.navBarHeight,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  headerComponent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop:
      /* eslint-disable */
      Platform.OS === 'ios' ? d.statusBarHeight : isGalaxy() ? 5 * d.ratioH : 13 * d.ratioH,
    /* eslint-enable */
    // paddingHorizontal: 15 * d.ratioW,
  },
  leftHeaderStyle: {
    // width: '50@s',
    height: '100%',
    marginLeft: 15 * d.ratioW,
  },
  centerHeaderStyle: {
    // paddingTop: '5@vs',
    flex: 1,
    alignItems: 'center',
  },
  centerHeaderTextStyle: {
    fontSize: 18 * d.ratioW,
    fontWeight: '500',
    fontFamily: Fonts.regular,
  },
  rightHeaderStyle: {
    alignItems: 'flex-end',
    // width: '50@s',
    height: '100%',
    justifyContent: 'center',
    marginRight: 15 * d.ratioW,
  },
});

export default styles;
