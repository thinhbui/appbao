import { ScaledSheet } from 'react-native-size-matters';
import * as d from '../../../utilities/transform';
import { Fonts } from '../../../constants';

const styles = ScaledSheet.create({
  infoContainer: {
    marginVertical: 10 * d.ratioH,
    paddingLeft: 10 * d.ratioW,
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
  commentContainer1: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: 50 * d.ratioH,
    marginRight: 40 * d.ratioW,
  },
  commentQuantity: {
    position: 'absolute',
    // width: 10 * d.ratioW,
    height: 10 * d.ratioW,
    paddingHorizontal: 3 * d.ratioW,
    borderRadius: 8 * d.ratioW,
    backgroundColor: '#C21E2B',
    top: 12 * d.ratioH,
    left: d.ratioW * 5,
    zIndex: 100,
    elevation: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cmt: {
    color: '#fff',
    fontSize: 9 * d.ratioW,
    fontFamily: Fonts.regular,
  },
  commentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: 50 * d.ratioH,
    marginRight: 10 * d.ratioW,
  },
  itemText: {
    fontWeight: '200',
    color: '#BDBDBD',
    fontSize: 14 * d.ratioW,
    fontFamily: Fonts.regular,
  },
  thumbnailStyle: {
    width: '100%',
    height: d.windowSize.height,
  },
  titleStyle: {
    fontFamily: Fonts.regular,
    color: '#fff',
    fontSize: 18 * d.ratioW,
  },
  frameStyle: {
    fontFamily: Fonts.regular,
    fontSize: 14 * d.ratioW,
    color: '#E0E0E0',
    marginVertical: 5 * d.ratioH,
  },
  commentWrapper: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  commentPartContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarStyle: {
    width: 30 * d.ratioW,
    height: 30 * d.ratioW,
    borderRadius: 5 * d.ratioW,
    marginRight: 10 * d.ratioW,
  },
  commentTextStyle: {
    fontFamily: Fonts.regular,
    fontSize: 14 * d.ratioW,
    color: '#BDBDBD',
  },
});

export default styles;
