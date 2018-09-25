import { ScaledSheet } from 'react-native-size-matters';
import { Platform } from 'react-native';
import * as d from '../../../utilities/transform';

const styles = ScaledSheet.create({
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
    // borderTopColor: 'rgba(0,0,0,0.1)',
    // borderTopWidth: 1,
    // paddingBottom: 10 * d.ratioH,
  },
  giftIconStyle: {
    alignSelf: 'flex-end',
    position: 'absolute',
    top: d.windowSize.height * 0.01,
    right: d.windowSize.width * 0.03,
    marginVertical: 5 * d.ratioH,
  },
});

export default styles;
