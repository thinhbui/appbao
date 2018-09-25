import * as d from '../../utilities/transform';
import { Fonts } from '../../constants';

const styles = {
  centerHeaderStyle: {
    fontSize: 16 * d.ratioW,
    color: '#000',
    fontFamily: Fonts.regular,
  },
  commentContainer: {
    backgroundColor: '#FFF',
    width: '100%',
    padding: d.windowSize.width * 0.03,
  },
  wrapper: { flexDirection: 'row' },
  avatarStyle: {
    height: d.windowSize.height * 0.05,
    width: d.windowSize.height * 0.05,
    borderRadius: d.windowSize.height * 0.025,
    marginRight: d.windowSize.width * 0.03,
  },
  contentWrapper: { width: '85%' },
  userDetailContainer: {
    justifyContent: 'space-between',
    height: d.windowSize.height * 0.05,
  },
  userNameStyle: {
    fontSize: 12 * d.ratioW,
    color: '#296EA4',
    fontFamily: Fonts.regular,
  },
  timeStyle: {
    fontSize: 10 * d.ratioW,
    color: '#BDBDBD',
    fontFamily: Fonts.regular,
  },
  contentStyle: {
    marginVertical: d.windowSize.height * 0.02,
    fontFamily: Fonts.regular,
  },
  postContainer: { flexDirection: 'row', flex: 1 },
  postImageStyle: {
    height: d.windowSize.height * 0.07,
    width: d.windowSize.height * 0.07,
  },
  postTitleContainer: {
    height: d.windowSize.height * 0.07,
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingLeft: 10 * d.ratioW,
    justifyContent: 'center',
  },
  footerContainer: {
    flex: 1,
    marginTop: d.windowSize.height * 0.015,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerTextStyle: { fontSize: 10 * d.ratioW, color: '#BDBDBD' },
};

export default styles;
