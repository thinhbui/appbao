import * as d from '../../../../utilities/transform';
import { Fonts } from '../../../../constants';

const styles = {
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
  commentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: 50 * d.ratioH,
    paddingHorizontal: 10 * d.ratioW,
  },
  itemText: {
    fontWeight: '200',
    color: '#BDBDBD',
    fontSize: 12 * d.ratioW,
    fontFamily: Fonts.regular,
  },
};

export default styles;
