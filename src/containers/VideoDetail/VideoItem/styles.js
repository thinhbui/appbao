import { ScaledSheet } from 'react-native-size-matters';
import * as d from '../../../utilities/transform';
import { Fonts } from '../../../constants';

const styles = ScaledSheet.create({
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: d.windowSize.height * 0.01,
  },
  commentText: {
    fontSize: 11 * d.ratioW,
    fontFamily: Fonts.regular,
    color: '#BDBDBD',
    marginBottom: d.windowSize.height * 0.003,
  },
  titleSnippet: {
    marginTop: d.windowSize.height * 0.01,
    fontSize: 16 * d.ratioW,
    fontFamily: Fonts.regular,
  },
});

export default styles;
