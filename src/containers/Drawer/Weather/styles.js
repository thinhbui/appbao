import { Platform } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import * as d from '../../../utilities/transform';
import { Fonts } from '../../../constants';

const styles = ScaledSheet.create({
  weatherContainer: {
    flexDirection: 'row',
    paddingTop: Platform.OS === 'ios' ? d.statusBarHeight : 0,
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
    fontSize: 50 * d.ratioW,
    fontWeight: '700',
    paddingTop: 20 * d.ratioH,
    marginHorizontal: 3 * d.ratioW,
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
    fontFamily: Fonts.regular,
  },
  rangeTempStyle: {
    right: 20 * d.ratioW,
    fontFamily: Fonts.regular,
  },
});

export default styles;
