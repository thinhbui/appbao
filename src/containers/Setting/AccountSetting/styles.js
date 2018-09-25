import { ScaledSheet } from 'react-native-size-matters';
import * as d from '../../../utilities/transform';
import { Fonts } from '../../../constants';

const styles = ScaledSheet.create({
  container: {
    paddingHorizontal: 15 * d.ratioW,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.1)',
    marginTop: 10 * d.ratioH,
    backgroundColor: '#FFF',
  },
  buttonContainer: {
    paddingVertical: 13 * d.ratioH,
    borderBottomWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.1)',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    flexDirection: 'row',
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
  avatarContainer: {
    alignSelf: 'center',
    marginVertical: d.windowSize.height * 0.02,
  },
  avatarStyle: {
    height: d.windowSize.height * 0.1,
    width: d.windowSize.height * 0.1,
    borderRadius: d.windowSize.height * 0.05,
  },
});

export default styles;
