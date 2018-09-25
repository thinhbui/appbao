import { ScaledSheet } from 'react-native-size-matters';
import * as d from '../../../../utilities/transform';

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    height: d.windowSize.height,
    width: d.windowSize.width,
    flexDirection: 'row',
    // alignItems: 'flex-end',
    // paddingBottom: 15 * d.ratioH,
  },
  overlayStyle: {
    height: d.windowSize.height,
    width: d.windowSize.width,
    position: 'absolute',
    backgroundColor: '#000',
  },
  dialogStyle: {
    backgroundColor: '#FFF',
    height: 150 * d.ratioH,
    marginTop: d.windowSize.height - 150 * d.ratioH,
    position: 'absolute',
    paddingTop: 15 * d.ratioH,
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 15 * d.ratioW,
  },
});

export default styles;
