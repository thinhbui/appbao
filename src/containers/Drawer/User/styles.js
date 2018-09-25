import { Platform } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import * as d from '../../../utilities/transform';
import { Fonts } from '../../../constants';

const styles = ScaledSheet.create({
  userContainer: {
    alignItems: 'center',
  },
  logInContainer: {
    alignItems: 'center',
    position: 'absolute',
    marginBottom: Platform.OS === 'ios' ? null : 30 * d.ratioH,
  },
  descriptionStyle: {
    color: '#F8C25C',
    marginTop: 10 * d.ratioH,
    // fontWeight: '600',
    fontSize: 16 * d.ratioW,
    fontFamily: Fonts.regular,
  },
  avatarStyle: {
    width: 50 * d.ratioW,
    height: 50 * d.ratioW,
    borderRadius: 25 * d.ratioW,
  },
  userNameStyle: {
    marginTop: 10 * d.ratioH,
    color: '#FFF',
    fontFamily: Fonts.regular,
    fontSize: 16 * d.ratioW,
  },
  userLevelStyle: {
    top: 10 * d.ratioH,
    color: '#FFF',
    fontFamily: Fonts.regular,
    alignItems: 'center',
    fontSize: 16 * d.ratioW,
  },
  coinStyle: {
    fontSize: 14 * d.ratioW,
    marginTop: d.windowSize.height * 0.005,
    color: '#FFF',
    alignSelf: 'center',
    fontFamily: Fonts.regular,
  },
  backgroundIconContainer: {
    backgroundColor: '#FFF',
    height: 56 * d.ratioW,
    width: 56 * d.ratioW,
    borderRadius: 28 * d.ratioW,
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 3 * d.ratioW,
  },
  iconStyle: {
    left: 2 * d.ratioW,
    bottom: Platform.OS === 'ios' ? 5 * d.ratioH : null,
  },
  logInButtonStyle: {
    height: 35 * d.ratioH,
    width: 100 * d.ratioW,
    backgroundColor: '#6C8CAF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20 * d.ratioW,
    marginTop: 10 * d.ratioH,
    paddingTop: Platform.OS === 'ios' ? 3 * d.ratioH : null,
  },
  logInTextStyle: {
    fontSize: 16 * d.ratioH,
    color: '#FFF',
    fontFamily: Fonts.regular,
  },
});

export default styles;
