import { StyleSheet, Platform } from 'react-native';
// import * as d from '/../../utilities/transform';
import * as d from '../../utilities/transform';
import { Fonts } from '../../constants';

// import { ratioH } from '../../utilities/transform';

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    width: d.windowSize.width,
    height: 50 * d.ratioH,
    alignItems: 'center',
    borderBottomColor: '#efefef',
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  centerHeader: {
    flex: 5,
    height: 30 * d.ratioH,
  },
  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    borderRadius: 4,
    backgroundColor: '#efefef',
    height: 30 * d.ratioH,
  },
  textInput: {
    flex: 1,
    lineHeight: 25 * d.ratioH,
    borderRadius: 4,
    fontSize: 16 * d.ratioH,
    padding: Platform.OS === 'ios' ? null : 0,
    fontFamily: Fonts.regular,
  },
});

export default styles;
