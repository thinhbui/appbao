import { ScaledSheet } from 'react-native-size-matters';
import * as d from '../../utilities/transform';
import { Fonts } from '../../constants';

const styles = ScaledSheet.create({
  container: {
    paddingHorizontal: 15 * d.ratioW,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.1)',
    marginTop: 10 * d.ratioW,
    backgroundColor: '#FFF',
  },
  buttonContainer: {
    paddingVertical: 13 * d.ratioW,
    borderBottomWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.1)',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    flexDirection: 'row',
  },
  privacyButtonContainer: {
    paddingVertical: 13 * d.ratioW,
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    flexDirection: 'row',
  },
  logOutContainer: {
    paddingHorizontal: 10 * d.ratioW,
    paddingVertical: 13 * d.ratioW,
    borderWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.1)',
    backgroundColor: '#FFF',
    marginTop: 10 * d.ratioW,
  },
  buttonNameStyle: {
    fontSize: 15 * d.ratioW,
    fontFamily: Fonts.regular,
  },
  buttonDescriptionStyle: {
    fontSize: 15 * d.ratioW,
    fontFamily: Fonts.regular,
    color: '#757575',
  },
});

export default styles;
