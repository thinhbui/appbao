import { Platform } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import * as d from '../../utilities/transform';
import { Fonts } from '../../constants';
import { isGalaxy } from '../../utilities/device';

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
    alignItems: 'center',
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
    // paddingVertical: 3 * d.ratioH,
    height: 25 * d.ratioH,
    paddingHorizontal: 10 * d.ratioW,
    borderWidth: 1,
    borderRadius: 5 * d.ratioW,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerContainer: {
    height: isGalaxy() ? 40 * d.ratioH : 50 * d.ratioH,
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
  },
  commentContainer1: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: 50 * d.ratioH,
    marginRight: 20 * d.ratioW,
  },
  commentQuantity: {
    position: 'absolute',
    // width: 10 * d.ratioW,
    height: 12 * d.ratioW,
    paddingHorizontal: 3 * d.ratioW,
    borderRadius: 8 * d.ratioW,
    backgroundColor: '#C21E2B',
    top: 12 * d.ratioH,
    left: d.ratioW * 8,
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
  itemText: {
    fontWeight: '200',
    color: 'gray',
    fontSize: 12 * d.ratioW,
    fontFamily: Fonts.regular,
  },
  contentTextStyle: {
    fontWeight: Platform.OS === 'ios' ? '500' : '400',
    fontSize: 14 * d.ratioW,
    fontFamily: Fonts.regular,
    textAlign: 'left',
    color: '#000',
  },
  contentBoldTextStyle: {
    fontWeight: Platform.OS === 'ios' ? 'bold' : '600',
    fontSize: 18 * d.ratioW,
    fontFamily: Fonts.regular,
    color: '#000',
  },
  titleTextStyle: {
    fontWeight: Platform.OS === 'ios' ? 'bold' : '600',
    color: '#000',
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
    // fontWeight: '600',
    marginBottom: 3 * d.ratioH,
  },
  timeCreatedStyle: {
    color: '#BDBDBD',
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
    alignItems: 'flex-end',
  },
  likeContainer: {
    height: 35 * d.ratioH,
    width: d.windowSize.width * 0.28,
    borderRadius: 20 * d.ratioH,
    borderWidth: 1,
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
    height: 1 * d.ratioH,
    backgroundColor: 'gray',
  },
  commentInputTextIconStyle: {
    alignSelf: 'center',
    marginRight: 10 * d.ratioW,
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
});

export default styles;
