import { ScaledSheet } from 'react-native-size-matters';
import * as d from '../../utilities/transform';
import { Fonts } from '../../constants';

const styles = ScaledSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: d.windowSize.height * 0.012,
    left: d.windowSize.width * 0.03,
  },
  textStyle: {
    fontSize: 16 * d.ratioW,
    fontWeight: '300',
    // top: '7@vs',
    left: 20 * d.ratioW,
    fontFamily: Fonts.regular,
  },
});

export default styles;
