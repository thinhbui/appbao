import { Platform } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import * as d from '../../utilities/transform';
import { Fonts } from '../../constants';

const styles = ScaledSheet.create({
  wrapper: {
    flex: 1,
    height: '100%',
  },
  container: {
    flex: 1,
    zIndex: 0,
    justifyContent: 'space-between',
    height: Platform.OS === 'ios' ? null : 650 * d.ratioH,
  },
  weatherContainer: {
    flexDirection: 'row',
    paddingTop: Platform.OS === 'ios' ? 20 * d.ratioH : 0,
    justifyContent: 'space-between',
    height: Platform.OS === 'ios' ? 100 * d.ratioH : 80 * d.ratioH,
  },
  currentTempContainer: {
    flexDirection: 'row',
    left: 10 * d.ratioW,
  },
  currentTempTextStyle: {
    color: '#C21E2B',
    fontSize: 36 * d.ratioW,
    paddingTop: 25 * d.ratioH,
    fontFamily: Fonts.regular,
  },
  tempIconStyle: {
    fontSize: 60 * d.ratioW,
    fontWeight: '700',
    paddingTop: Platform.OS === 'ios' ? 25 * d.ratioH : 20 * d.ratioH,
    right: Platform.OS === 'ios' ? 10 * d.ratioW : 5 * d.ratioW,
    color: '#C21E2B',
    fontFamily: Fonts.regular,
  },
  detailsContainer: {
    marginRight: 25 * d.ratioW,
    paddingTop: 20 * d.ratioH,
  },
  generalDetailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: 80 * d.ratioW,
  },
  textGeneralDetailStyle: {
    paddingLeft: 5 * d.ratioW,
  },
  locationTextStyle: {
    color: '#C21E2B',
  },
  userContainer: {
    alignItems: 'center',
  },
  logInContainer: {
    alignItems: 'center',
    position: 'absolute',
    marginBottom: Platform.OS === 'ios' ? null : 30 * d.ratioH,
  },
  logInButtonStyle: {
    height: 30 * d.ratioH,
    width: 90 * d.ratioW,
    backgroundColor: '#6C8CAF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20 * d.ratioW,
    marginTop: 10 * d.ratioH,
  },
  logInTextStyle: {
    color: '#FFF',
  },
  descriptionStyle: {
    color: '#F8C25C',
    marginTop: 10 * d.ratioH,
    fontWeight: '600',
    fontSize: 15 * d.ratioW,
    fontFamily: Fonts.regular,
  },
  firstBodyContainer: {
    width: '100%',
    height: 80 * d.ratioH,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
  },
  iconFirstBodyStyle: {
    marginBottom: 5 * d.ratioH,
    alignSelf: 'center',
  },
  secondBodyContainer: {
    width: '100%',
    alignSelf: 'center',
    borderTopColor: 'rgba(0,0,0,0.1)',
    borderTopWidth: 1,
    paddingBottom: 10 * d.ratioH,
  },
  giftIconStyle: {
    alignSelf: 'flex-end',
    position: 'absolute',
    top: d.windowSize.height * 0.01,
    right: d.windowSize.width * 0.03,
  },
  logInButtonContainer: {
    width: 250 * d.ratioW,
    height: 40 * d.ratioH,
    borderWidth: 1,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10 * d.ratioH,
  },
  logInFBStyle: {
    color: '#466BAE',
    fontSize: 16 * d.ratioW,
    fontWeight: '600',
    fontFamily: Fonts.regular,
  },
  logInGGStyle: {
    color: '#CB453D',
    fontSize: 16 * d.ratioW,
    fontWeight: '600',
    fontFamily: Fonts.regular,
  },
  rangeTempStyle: {
    right: '20@s',
  },
  userLevelStyle: {
    top: 10 * d.ratioH,
    color: '#FFF',
  },
  coinStyle: {
    fontSize: 14 * d.ratioW,
    marginTop: d.windowSize.height * 0.005,
    color: '#FFF',
    alignSelf: 'center',
    fontFamily: Fonts.regular,
  },
  customBackGround: {
    height: 800 * d.ratioH,
    width: 800 * d.ratioH,
    borderTopLeftRadius: 450 * d.ratioH,
    borderTopRightRadius: 450 * d.ratioH,
    alignSelf: 'center',
    position: 'absolute',
    zIndex: -100,
    backgroundColor: '#C21E2B',
    top: 20 * d.ratioH,
  },
  backgroundIconContainer: {
    backgroundColor: '#FFF',
    height: 50 * d.ratioH,
    width: 50 * d.ratioH,
    borderRadius: 30 * d.ratioH,
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 3 * d.ratioW,
  },
  iconStyle: { left: 2 * d.ratioW, bottom: Platform.OS === 'ios' ? 5 * d.ratioH : null },
  bodyContainer: {
    position: 'absolute',
    zIndex: 100,
    width: '100%',
    height: '100%',
    flex: 1,
    backgroundColor: '#FFF',
  },
  avatarStyle: {
    width: 50 * d.ratioW,
    height: 50 * d.ratioW,
    borderRadius: 25 * d.ratioW,
  },
  userNameStyle: {
    marginTop: 10 * d.ratioH,
    color: '#FFF',
  },
  modalContainer: {
    backgroundColor: 'red',
    width: 100 * d.ratioW,
    height: 100 * d.ratioH,
  },
});

export default styles;
