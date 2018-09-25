import React from 'react';
import { View, TouchableOpacity, StatusBar, Text } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

const WhiteHeader = ({
  leftHeader,
  centerHeader,
  rightHeader,
  onPressLeftHeader,
  onPressRightHeader,
  customContainerStyle,
}) => (
  <View style={[styles.container, customContainerStyle]}>
    <StatusBar backgroundColor="transparent" barStyle="dark-content" />
    <View style={styles.headerComponent}>
      <TouchableOpacity onPress={onPressLeftHeader} style={styles.leftHeaderStyle}>
        {leftHeader}
      </TouchableOpacity>
      <View style={styles.centerHeaderStyle}>
        {/* <Text style={styles.centerHeaderTextStyle}>{centerHeader}</Text> */}
        {centerHeader}
      </View>
      <TouchableOpacity onPress={onPressRightHeader} style={styles.rightHeaderStyle}>
        {rightHeader}
      </TouchableOpacity>
    </View>
  </View>
);

WhiteHeader.propTypes = {
  leftHeader: PropTypes.any, // eslint-disable-line
  centerHeader: PropTypes.any, // eslint-disable-lines
  rightHeader: PropTypes.any, // eslint-disable-line
  onPressLeftHeader: PropTypes.func,
  onPressRightHeader: PropTypes.func,
  customContainerStyle: PropTypes.object,
};

WhiteHeader.defaultProps = {
  leftHeader: null,
  centerHeader: null,
  rightHeader: null,
  onPressLeftHeader: () => {},
  onPressRightHeader: () => {},
  customContainerStyle: {},
};

export default WhiteHeader;
