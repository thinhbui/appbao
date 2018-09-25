import { StyleSheet, Platform } from 'react-native';
import * as d from '../../utilities/transform';
import { Fonts } from '../../constants';

const HEIGHT = (d.windowSize.width - d.windowSize.width * 0.06) * 0.75;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoContainer: {
    paddingHorizontal: d.windowSize.width * 0.03,
    paddingVertical: d.windowSize.height * 0.01,
    backgroundColor: '#FFF',
  },
  imageVideo: {
    width: '100%',
    height: HEIGHT,
  },
  playButton: { position: 'absolute', alignSelf: 'center', marginTop: HEIGHT / 2 },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: d.windowSize.height * 0.01,
  },
  commentText: {
    fontSize: 11 * d.ratioW,
    color: '#BDBDBD',
    marginBottom: d.windowSize.height * 0.003,
    fontFamily: Fonts.regular,
  },
  titleSnippet: {
    marginTop: d.windowSize.height * 0.01,
    fontSize: 16 * d.ratioW,
    fontFamily: Fonts.regular,
  },
  followTabBar: {
    height: 50 * d.ratioH,
    width: d.windowSize.width,
    borderBottomColor: 'rgba(0,0,0,0.1)',
    borderBottomWidth: 0.7,
    alignItems: 'center',
    paddingHorizontal: 10 * d.ratioW,
    flexDirection: 'row',
  },
  followTabBarTextStyle: {
    fontSize: 14 * d.ratioW,
    marginRight: 10 * d.ratioW,
    color: '#000',
    fontFamily: Fonts.regular,
  },
  frameAvatarStyle: {
    height: 38 * d.ratioW,
    width: 38 * d.ratioW,
    borderRadius: 19 * d.ratioW,
    marginHorizontal: 5 * d.ratioW,
  },
  warningContainer: {
    height: d.windowSize.height * 0.8,
    alignItems: 'center',
    marginTop: 20 * d.ratioH,
  },
  warningTextStyle: {
    fontFamily: Fonts.regular,
    color: '#000',
    fontSize: 18 * d.ratioW,
  },
});

export default styles;
