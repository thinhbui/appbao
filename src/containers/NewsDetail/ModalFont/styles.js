import { ScaledSheet } from 'react-native-size-matters';
import * as d from '../../../utilities/transform';
import { Fonts } from '../../../constants';

const styles = ScaledSheet.create({
  modalContainer: {
    backgroundColor: 'red',
    width: 100 * d.ratioW,
    height: 100 * d.ratioH,
  },
  wrapper: {
    width: '100%',
    height: 100 * d.ratioH,
  },
  buttonContainer: {
    borderWidth: 1,
    borderColor: '#C21E2B',
    borderRadius: 3 * d.ratioW,
    height: 40 * d.ratioH,
    width: 50 * d.ratioW,
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallTextStyle: {
    fontSize: 12 * d.ratioW,
    color: '#C21E2B',
    fontFamily: Fonts.regular,
  },
  mediumTextStyle: {
    fontSize: 16 * d.ratioW,
    color: '#C21E2B',
    fontFamily: Fonts.regular,
  },
  largeTextStyle: {
    fontSize: 20 * d.ratioW,
    color: '#C21E2B',
    fontFamily: Fonts.regular,
  },
});

export default styles;
