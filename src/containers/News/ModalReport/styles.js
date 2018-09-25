import { ScaledSheet } from 'react-native-size-matters';
import * as d from '../../../utilities/transform';
import { Fonts } from '../../../constants';

const styles = ScaledSheet.create({
  modalContainer: {
    backgroundColor: 'red',
    width: 100 * d.ratioW,
    height: 100 * d.ratioH,
  },
  reportHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 250 * d.ratioW,
    paddingBottom: 15 * d.ratioH,
    borderBottomWidth: 0.3,
    borderColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
  },
  hidePostTextStyle: {
    fontSize: 14 * d.ratioW,
    color: '#000',
    marginLeft: 5 * d.ratioW,
    fontFamily: Fonts.regular,
  },
  postDetailContainer: {
    width: 250 * d.ratioW,
    paddingVertical: 15 * d.ratioH,
    borderBottomWidth: 0.3,
    borderColor: 'rgba(0,0,0,0.3)',
    flexDirection: 'row',
  },
  postTitleStyle: {
    fontSize: 14 * d.ratioW,
    color: '#000',
    maxWidth: 200 * d.ratioW,
    fontFamily: Fonts.regular,
  },
  postImageStyle: {
    height: 40 * d.ratioH,
    width: 40 * d.ratioH,
    marginHorizontal: 10 * d.ratioW,
  },
  reportContainer: {
    width: 250 * d.ratioW,
    paddingVertical: 15 * d.ratioH,
  },
  descriptionStyle: {
    fontSize: 13 * d.ratioW,
    color: '#BDBDBD',
    marginBottom: 10 * d.ratioH,
    fontFamily: Fonts.regular,
  },
  reportsButtonContainer: {
    flexDirection: 'row',
    width: 250 * d.ratioW,
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  reportButtonStyle: {
    borderWidth: 0.3,
    paddingVertical: 5 * d.ratioW,
    width: '48%',
    borderRadius: 5 * d.ratioW,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10 * d.ratioH,
  },
  acceptButtonContainer: {
    backgroundColor: '#C21E2B',
    borderRadius: 5 * d.ratioW,
    width: 250 * d.ratioW,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5 * d.ratioH,
    marginBottom: 10 * d.ratioH,
  },
  acceptButtonStyle: {
    color: '#FFF',
    fontSize: 14 * d.ratioW,
    fontFamily: Fonts.regular,
  },
});

export default styles;
