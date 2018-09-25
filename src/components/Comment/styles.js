import { Platform } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import * as d from '../../utilities/transform';
import { Fonts } from '../../constants';

const styles = ScaledSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#FFF',
    flexDirection: 'row',
    marginVertical: 15 * d.ratioH,
  },
  card: {
    width: '100%',
    height: d.ratioH,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  avatar: {
    width: 30 * d.ratioW,
    height: 30 * d.ratioW,
    borderRadius: 5 * d.ratioW,
    marginRight: 10 * d.ratioW,
  },
  subAvatar: {
    width: 20 * d.ratioW,
    height: 20 * d.ratioW,
    borderRadius: 5 * d.ratioW,
    marginRight: 10 * d.ratioW,
  },
  name: {
    color: '#4480e2',
    fontSize: 14 * d.ratioW,
    fontFamily: Fonts.regular,
  },
  headerCommentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // height: 40 * d.ratioH,
    justifyContent: 'space-between',
  },
  likeStyle: {
    margin: 5,
  },
  footerCommentContainer: {
    paddingLeft: 50 * d.ratioH,
  },
  commentContentStyle: {
    marginHorizontal: 10 * d.ratioW,
    color: '#000',
  },
  replyCommentContainer: {
    flexDirection: 'row',
  },
  replyCommentStyle: {
    marginRight: 10 * d.ratioW,
    fontSize: 12 * d.ratioW,
    fontWeight: Platform.OS === 'ios' ? '700' : '500',
    fontFamily: Fonts.regular,
    color: '#9E9E9E',
  },
});

export default styles;
