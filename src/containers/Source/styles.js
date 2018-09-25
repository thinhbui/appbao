import * as d from '../../utilities/transform';
import { Fonts } from '../../constants';

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  centerHeaderContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 10 * d.ratioW,
  },
  sourceContentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sourceAvatarStyle: {
    height: 30 * d.ratioH,
    width: 30 * d.ratioH,
    borderRadius: 15 * d.ratioH,
  },
  sourceNameStyle: {
    fontSize: 16 * d.ratioW,
    color: 'rgba(0,0,0,0.7)',
    textAlign: 'center',
    fontFamily: Fonts.regular,
    marginLeft: 10 * d.ratioW,
  },
  followButtonContainer: {
    paddingHorizontal: 5 * d.ratioW,
    height: 30 * d.ratioH,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
  },
  followButtonTextStyle: {
    fontSize: 12 * d.ratioW,
    fontFamily: Fonts.regular,
  },
};

export default styles;
