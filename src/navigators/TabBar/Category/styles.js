import { ScaledSheet } from 'react-native-size-matters';
import * as d from '../../../utilities/transform';
import { Fonts } from '../../../constants';

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  headerContainer: {
    paddingLeft: 5 * d.ratioW,
    // paddingRight: 15 * d.ratioW,
    marginBottom: 5 * d.ratioH,
  },
  headerDescriptionContainer: {
    width: '100%',
    paddingHorizontal: 5 * d.ratioW,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  guideStyle: {
    fontSize: 13 * d.ratioW,
    color: 'rgba(0,0,0,0.3)',
    marginVertical: 5 * d.ratioH,
    marginLeft: 5 * d.ratioW,
    fontFamily: Fonts.regular,
  },
  fixButtonContainer: {
    borderWidth: 1,
    borderRadius: 15,
    borderColor: 'rgba(0,0,0,0.3)',
    paddingHorizontal: 25 * d.ratioW,
    paddingVertical: 5 * d.ratioH,
  },
  contentContainer: {
    flexWrap: 'wrap',
    width: '100%',
    flexDirection: 'row',
    // alignItems: 'center',
    marginTop: 10 * d.ratioH,
  },
  categoryContainer: {
    backgroundColor: '#F5F5F5',
    height: 35 * d.ratioH,
    width: d.windowSize.width / 5,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    margin: d.windowSize.width * 0.02,
    // marginBottom: d.windowSize.width * 0.04,
  },
  editContainer: {
    backgroundColor: 'gray',
    position: 'absolute',
    width: 14 * d.ratioW,
    height: 14 * d.ratioW,
    borderRadius: 7 * d.ratioW,
    top: d.windowSize.width * 0.02 - 7 * d.ratioW,
    right: d.windowSize.width * 0.02 - 7 * d.ratioW,
    zIndex: 100,
    justifyContent: 'center',
    alignItems: 'center',
    // elevation: 100,
  },
  categoryTextStyle: {
    fontSize: 13 * d.ratioW,
    color: 'rgba(0,0,0,0.7)',
    textAlign: 'center',
    fontFamily: Fonts.regular,
  },
  titleStyle: {
    fontFamily: Fonts.regular,
    fontSize: 16 * d.ratioW,
  },
  sourceContainer: {
    alignItems: 'center',
    width: 80 * d.ratioW,
    marginLeft: 5 * d.ratioW,
    marginBottom: 10 * d.ratioH,
  },
  sourceAvatarStyle: {
    height: 50 * d.ratioH,
    width: 50 * d.ratioH,
    borderRadius: 25 * d.ratioH,
    marginBottom: 5 * d.ratioH,
  },
});

export default styles;
