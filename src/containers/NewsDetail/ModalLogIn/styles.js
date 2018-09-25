import { ScaledSheet } from 'react-native-size-matters';
import * as d from '../../../utilities/transform';
import { Fonts } from '../../../constants';

const styles = ScaledSheet.create({
  modalContainer: {
    backgroundColor: 'red',
    width: 100 * d.ratioW,
    height: 100 * d.ratioH,
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
    // fontWeight: '600',
    fontFamily: Fonts.regular,
  },
  logInGGStyle: {
    color: '#CB453D',
    fontSize: 16 * d.ratioW,
    // fontWeight: '600',
    fontFamily: Fonts.regular,
  },
});

export default styles;
