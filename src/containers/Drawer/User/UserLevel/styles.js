import * as d from '../../../../utilities/transform';
import { Fonts } from '../../../../constants';

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  linearGradientContainer: {
    width: d.windowSize.width,
    height: d.windowSize.height * 0.1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTextStyle: {
    color: '#FFF',
    fontSize: 18 * d.ratioW,
    marginLeft: d.windowSize.width * 0.2,
    fontFamily: Fonts.regular,
  },
  headerPointTextStyle: {
    fontSize: 20 * d.ratioW,
    fontWeight: 'bold',
    fontFamily: Fonts.regular,
  },
  userDetailContainer: {
    flexDirection: 'row',
  },
  avatarStyle: {
    height: d.windowSize.height * 0.1,
    width: d.windowSize.height * 0.1,
    borderRadius: d.windowSize.height * 0.05,
    marginHorizontal: d.windowSize.width * 0.085,
    top: d.windowSize.height * -0.05,
  },
  nameStyle: {
    fontSize: 16 * d.ratioW,
    color: '#BDBDBD',
    marginVertical: d.windowSize.height * 0.012,
    fontFamily: Fonts.regular,
  },
  expTextStyle: {
    fontSize: 16 * d.ratioW,
    color: '#5293B5',
    fontFamily: Fonts.regular,
  },
  expPointStyle: {
    fontSize: 16 * d.ratioW,
    color: '#FDDA69',
    fontFamily: Fonts.regular,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: d.windowSize.width,
    padding: d.windowSize.width * 0.03,
    justifyContent: 'space-between',
  },
  introduceButtonStyle: {
    padding: d.windowSize.width * 0.015,
    borderRadius: 20 * d.ratioW,
    borderWidth: 1,
    borderColor: '#FCD56B',
  },
  giftButton: {
    padding: d.windowSize.width * 0.015,
    borderRadius: 20 * d.ratioW,
    borderWidth: 1,
    borderColor: '#FA6467',
  },
  introduceButtonTextStyle: {
    fontSize: 14 * d.ratioW,
    color: '#FCD56B',
    fontFamily: Fonts.regular,
  },
  giftButtonTextStyle: {
    fontSize: 14 * d.ratioW,
    color: '#FA6467',
    fontFamily: Fonts.regular,
  },
  progressContainer: {
    width: d.windowSize.width,
    paddingHorizontal: d.windowSize.width * 0.06,
    paddingVertical: d.windowSize.width * 0.03,
  },
  progressHeaderContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginBottom: d.windowSize.height * 0.01,
  },
  progressLevelStyle: {
    fontSize: 14 * d.ratioW,
    color: '#BDBDBD',
    fontFamily: Fonts.regular,
  },
  progressDescriptionStyle: {
    fontSize: 16 * d.ratioW,
    color: '#BDBDBD',
    marginTop: d.windowSize.height * 0.02,
    alignSelf: 'center',
    fontFamily: Fonts.regular,
  },
  progressPointStyle: {
    color: '#FCD56B',
  },
  footerContainer: {
    marginTop: d.windowSize.height * 0.05,
  },
  footerDescriptionStyle: {
    color: '#BDBDBD',
    marginLeft: d.windowSize.width * 0.06,
    marginBottom: d.windowSize.height * 0.02,
  },
  tableRowContainer: {
    flexDirection: 'row',
    width: d.windowSize.width,
  },
  firstColumn: {
    paddingVertical: d.windowSize.height * 0.015,
    flex: 3 / 7,
    borderTopWidth: 0.3,
    borderColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondColumn: {
    paddingVertical: d.windowSize.height * 0.015,
    flex: 1 / 7,
    borderLeftWidth: 0.3,
    borderRightWidth: 0.3,
    borderTopWidth: 0.3,
    borderColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTable: {
    fontSize: 15 * d.ratioW,
    textAlign: 'center',
    color: '#BDBDBD',
    fontFamily: Fonts.regular,
  },
  tableContent: {
    fontSize: 15 * d.ratioW,
    textAlign: 'center',
    color: '#000',
    fontFamily: Fonts.regular,
  },
};

export default styles;
