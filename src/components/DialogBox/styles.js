import { ScaledSheet } from 'react-native-size-matters';
import * as d from '../../utilities/transform';
import { Fonts } from '../../constants';

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    height: d.windowSize.height,
    width: d.windowSize.width,
  },
  overlayStyle: {
    height: d.windowSize.height,
    width: d.windowSize.width,
    position: 'absolute',
    backgroundColor: '#000',
  },
  dialogStyle: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    position: 'relative',
    paddingVertical: 15 * d.ratioH,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleStyle: {
    fontSize: 18 * d.ratioW,
    // fontWeight: 'bold',
    alignSelf: 'center',
    fontFamily: Fonts.regular,
  },
  descriptionStyle: {
    fontSize: 15 * d.ratioW,
    marginTop: 10 * d.ratioH,
    marginHorizontal: 5 * d.ratioW,
    fontFamily: Fonts.regular,
  },
  buttonContainer: {
    borderTopWidth: 0.5,
    borderColor: '#757575',
    flexDirection: 'row',
    height: 50 * d.ratioH,
    marginTop: 50 * d.ratioH,
  },
  cancelContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 0.5,
    borderColor: '#757575',
    flex: 0.5,
  },
  cancelStyle: {
    fontSize: 20 * d.ratioW,
    fontWeight: '600',
    color: '#F22F3D',
    fontFamily: Fonts.regular,
  },
  acceptContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.5,
  },
  acceptStyle: {
    fontSize: 20 * d.ratioW,
    fontWeight: '600',
    color: '#216FEF',
    fontFamily: Fonts.regular,
  },
});

export default styles;
