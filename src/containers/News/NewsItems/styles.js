import { Platform } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import * as d from '../../../utilities/transform';
import Fonts from '../../../constants/Fonts';

const styles = ScaledSheet.create({
  container: {
    width: d.windowSize.width,
    backgroundColor: 'transparent',
    paddingHorizontal: 10 * d.ratioW,
    // height: d.windowSize.width * 0.25,
    // marginTop: -d.ratioH,
  },
  card: {
    width: '100%',
    borderBottomWidth: 0.7,
    borderColor: '#000',
    marginTop: 10 * d.ratioH,
  },
  imageContainer: {
    width: d.windowSize.width * 0.3,
    height: d.windowSize.width * 0.2,
    marginBottom: 40 * d.ratioH,
  },
  image: {
    width: d.windowSize.width * 0.3,
    height: d.windowSize.width * 0.23,
    borderRadius: 3 * d.ratioW,
    paddingRight: 10 * d.ratioW,
    marginVertical: d.windowSize.height * 0.015,
  },
  image2: {
    width: d.windowSize.width * 0.3,
    height: d.windowSize.width * 0.2,
    borderRadius: 3,
  },
  title: {
    fontSize: 16 * d.ratioW,
    fontWeight: '500',
    flex: 1,
    marginLeft: 10 * d.ratioW,
    marginTop: 10 * d.ratioH,
    fontFamily: Fonts.regular,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5 * d.ratioH,
    marginBottom: 8 * d.ratioH,
    justifyContent: 'space-between',
    flex: 1,
  },
  state: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    // bottom: d.windowSize.width * 0.05,
  },
  iconContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleTextStyle: {
    fontSize: 17 * d.ratioW,
    // fontFamily: Fonts.regular,
    width: d.windowSize.width * 0.6,
    marginLeft: 10 * d.ratioW,
    marginTop: d.windowSize.height * 0.01,
    // height: d.windowSize.width * 0.175,
    color: '#000',
    fontFamily: Fonts.regular,
  },
  titleText2Style: {
    fontSize: 17 * d.ratioW,
    width: '100%',
    marginLeft: 5 * d.ratioW,
    marginTop: 3 * d.ratioH,
    color: '#000',
    fontFamily: Fonts.regular,
  },
  titleContainer: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 8 * d.ratioH,
  },
  title3ImagesContainer: {
    width: '100%',
  },
  imagesContainer: {
    flexDirection: 'row',
    width: d.windowSize.width * 0.95,
    justifyContent: 'space-between',
    marginTop: 5 * d.ratioH,
  },
  image3: {
    marginLeft: d.windowSize.width * 0.33,
    bottom: 0,
    position: 'absolute',
  },
  sponsorText: {
    fontFamily: Fonts.regular,
    marginLeft: 5 * d.ratioW,
    fontSize: 12 * d.ratioW,
    color: '#BDBDBD',
  },
  adsState: {
    borderWidth: 0.8,
    borderRadius: 2,
    borderColor: '#BDBDBD',
    paddingHorizontal: 3 * d.ratioW,
  },
  cardContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    marginLeft: 10 * d.ratioW,
    width: d.windowSize.width * 0.63,
    // marginBottom: 8 * d.ratioH,
  },
});

export default styles;
