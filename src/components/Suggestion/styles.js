import { ScaledSheet } from 'react-native-size-matters';
import * as d from '../../utilities/transform';
import { Fonts } from '../../constants';

const styles = ScaledSheet.create({
  container: {
    width: d.windowSize.width * 0.9,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    paddingBottom: 5 * d.ratioH,
    marginBottom: 5 * d.ratioH,
    paddingRight: 0,
    borderBottomWidth: 0.4,
    borderColor: '#BDBDBD',
  },
  image: {
    width: d.windowSize.width * 0.3,
    height: d.windowSize.width * 0.23,
    borderRadius: 3 * d.ratioW,
    paddingRight: 10 * d.ratioW,
    marginVertical: d.windowSize.height * 0.015,
  },
  title: {
    fontSize: 17 * d.ratioW,
    width: d.windowSize.width * 0.58,
    marginLeft: 10 * d.ratioW,
    marginTop: d.windowSize.height * 0.01,
    // height: d.windowSize.width * 0.175,
    color: '#000',
    fontFamily: Fonts.regular,
  },
  cardContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    marginLeft: 10 * d.ratioW,
    width: d.windowSize.width * 0.63,
  },
});

export default styles;
