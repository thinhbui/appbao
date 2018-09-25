import { Platform } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import * as d from '../../utilities/transform';
import { Fonts } from '../../constants';

const styles = ScaledSheet.create({
  centerHeaderContainer: {
    width: 260 * d.ratioW,
    height: 30 * d.ratioH,
    backgroundColor: 'rgba(255,255,255,0.4)',
    borderRadius: 4,
    paddingLeft: 30 * d.ratioW,
    marginBottom: 5 * d.ratioH,
    marginLeft: Platform.OS === 'ios' ? null : 10 * d.ratioW,
    justifyContent: 'center',
  },
  iconCenterHeaderStyle: {
    position: 'absolute',
    top: 5 * d.ratioH,
    left: 8 * d.ratioW,
  },
  textCenterHeaderStyle: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 16 * d.ratioW,
    fontFamily: Fonts.regular,
    marginTop: Platform.OS === 'ios' ? 5 * d.ratioH : null,
  },
  coinIconStyle: {
    // marginRight: Platform.OS === 'ios' ? 15 * d.ratioW : 5 * d.ratioW,
    // marginLeft: Platform.OS === 'ios' ? null : 5 * d.ratioW,
    top: 5 * d.ratioH,
  },
  textPostStyle: {
    color: '#FFF',
    fontSize: 9 * d.ratioW,
    bottom: 8 * d.ratioH,
    fontFamily: Fonts.regular,
  },
  tabBarContainer: {
    flexDirection: 'row',
    height: 40 * d.ratioH,
    // width: '100%',
    backgroundColor: '#fff',
    borderBottomColor: '#9E9E9E',
    borderBottomWidth: 0.5,
  },
  scrollViewContainer: {
    flex: 1,
    paddingLeft: 5 * d.ratioW,
  },
  tabBarComponentStyle: {
    // width: 100 * d.ratioW,
    justifyContent: 'center',
    alignItems: 'center',
    // marginLeft: 8 * d.ratioW,/
    paddingHorizontal: 5 * d.ratioW,
    borderBottomColor: '#C21E2B',
  },
  addIconContainer: {
    width: 40 * d.ratioW,
    height: 40 * d.ratioH,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#9E9E9E',
    borderBottomWidth: 0.5,
  },
  avatarStyle: {
    width: 30 * d.ratioW,
    height: 30 * d.ratioW,
    borderRadius: 15 * d.ratioW,
  },
});

export default styles;
