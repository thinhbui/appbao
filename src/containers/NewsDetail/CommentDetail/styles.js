import { Platform } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import * as d from '../../../utilities/transform';
import { Fonts } from '../../../constants';

const styles = ScaledSheet.create({
  scrollview: {
    backgroundColor: '#FFF',
  },
  title: {
    fontSize: 22 * d.ratioW,
    paddingTop: 20 * d.ratioH,
    fontWeight: 'bold',
    fontFamily: Fonts.regular,
  },
  avatarContainer: {
    paddingVertical: 5 * d.ratioH,
    flexDirection: 'row',
    marginVertical: 10 * d.ratioH,
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 15 * d.ratioW,
  },
  avatar: {
    width: 30 * d.ratioW,
    height: 30 * d.ratioW,
    borderRadius: 15 * d.ratioW,
    right: 5 * d.ratioW,
  },
  name: {
    color: '#BDBDBD',
    fontWeight: '700',
    fontSize: 12 * d.ratioW,
    marginBottom: 3 * d.ratioH,
    fontFamily: Fonts.regular,
  },
  subscribe: {
    backgroundColor: 'transparent',
    paddingVertical: 3 * d.ratioH,
    paddingHorizontal: 10 * d.ratioW,
    borderWidth: 1,
    borderColor: '#C21E2B',
    borderRadius: 5,
    justifyContent: 'center',
  },
  footerContainer: {
    height: 50 * d.ratioH,
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  comment: {
    paddingHorizontal: 15 * d.ratioW,
    height: '100%',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eaeaea',
  },
  textInput: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: 50 * d.ratioH,
    paddingHorizontal: 10 * d.ratioW,
  },
  commentQuantity: {
    position: 'absolute',
    // width: 10 * d.ratioW,
    height: 10 * d.ratioW,
    paddingHorizontal: 3 * d.ratioW,
    borderRadius: 8 * d.ratioW,
    backgroundColor: '#C21E2B',
    top: 12 * d.ratioH,
    right: d.ratioW * 5,
    zIndex: 100,
    elevation: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cmt: {
    color: '#fff',
    fontSize: 6 * d.ratioW,
    fontFamily: Fonts.regular,
  },
  itemText: {
    fontWeight: '200',
    color: '#000',
    fontSize: 12 * d.ratioW,
    fontFamily: Fonts.regular,
  },
  contentTextStyle: {
    fontWeight: Platform.OS === 'ios' ? '500' : '400',
    fontSize: 14 * d.ratioW,
    textAlign: 'left',
    color: '#000',
    fontFamily: Fonts.regular,
  },
  contentBoldTextStyle: {
    fontWeight: Platform.OS === 'ios' ? 'bold' : '600',
    fontSize: 18 * d.ratioW,
    color: '#000',
    fontFamily: Fonts.regular,
  },
  titleTextStyle: {
    fontWeight: Platform.OS === 'ios' ? 'bold' : '600',
    fontSize: 20 * d.ratioW,
    color: '#000',
    fontFamily: Fonts.regular,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  scrollViewContainer: {
    marginHorizontal: 10 * d.ratioW,
    backgroundColor: '#FFF',
  },
  headerContainer: {
    width: '100%',
    marginBottom: 20 * d.ratioH,
  },
  userDetailContainer: {
    paddingVertical: 5 * d.ratioH,
    flexDirection: 'row',
    marginTop: 10 * d.ratioH,
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 15 * d.ratioW,
  },
  avatarStyle: {
    width: 30 * d.ratioW,
    height: 30 * d.ratioW,
    borderRadius: 15 * d.ratioW,
    right: 5 * d.ratioW,
  },
  userNameStyle: {
    color: '#BDBDBD',
    fontWeight: '700',
    fontSize: 12 * d.ratioW,
    marginBottom: 3 * d.ratioH,
    fontFamily: Fonts.regular,
  },
  timeCreatedStyle: {
    color: '#BDBDBD',
    fontSize: 10 * d.ratioW,
    fontFamily: Fonts.regular,
  },
  followButtonContainer: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#C21E2B',
    paddingVertical: 3 * d.ratioH,
    paddingHorizontal: 5 * d.ratioW,
    borderRadius: 5,
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 10 * d.ratioW,
    backgroundColor: '#FFF',
  },
  titleContainer: {
    width: '100%',
    marginBottom: 20 * d.ratioH,
    paddingTop: 10 * d.ratioH,
  },
  likeShareContainer: {
    flexDirection: 'row',
    width: d.windowSize.width * 0.9,
    marginTop: 20 * d.ratioH,
    justifyContent: 'center',
  },
  likeContainer: {
    height: 35 * d.ratioH,
    width: d.windowSize.width * 0.28,
    borderRadius: 20 * d.ratioH,
    borderWidth: 1,
    borderColor: 'gray',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareContainer: {
    height: 35 * d.ratioH,
    width: d.windowSize.width * 0.28,
    borderRadius: 20 * d.ratioH,
    borderWidth: 1,
    borderColor: 'gray',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  suggestionContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50 * d.ratioH,
  },
  customLineStyle: {
    width: d.windowSize.width * 0.6,
    height: d.ratioH,
    backgroundColor: 'gray',
  },
  commentInputTextIconStyle: {
    margin: 5,
    marginLeft: 8 * d.ratioW,
  },
  sentContainer: {
    backgroundColor: '#C21E2B',
    borderRadius: 3,
    marginLeft: 10 * d.ratioW,
    paddingHorizontal: 5 * d.ratioW,
    height: 30 * d.ratioH,
    alignItems: 'center',
    justifyContent: 'center',
  },
  replyCommentStyle: {
    marginRight: 10 * d.ratioW,
    fontSize: 12 * d.ratioW,
    fontWeight: Platform.OS === 'ios' ? '700' : '500',
    color: '#9E9E9E',
    fontFamily: Fonts.regular,
  },
});

export default styles;
