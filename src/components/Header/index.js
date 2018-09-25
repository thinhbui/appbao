import React from 'react';
import { View, TouchableOpacity, StatusBar, Text } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

const Header = ({
  leftHeader,
  centerHeader,
  rightHeader,
  onPressLeftHeader,
  centerStyles,
  containerStyle,
}) => (
  <View style={[styles.container, containerStyle]}>
    <StatusBar barStyle="light-content" />
    <View style={styles.headerComponent}>
      <TouchableOpacity onPress={onPressLeftHeader}>{leftHeader}</TouchableOpacity>
      <View style={centerStyles}>{centerHeader}</View>
      <View>{rightHeader}</View>
    </View>
  </View>
);

Header.propTypes = {
  leftHeader: PropTypes.any, // eslint-disable-line
  centerHeader: PropTypes.any, // eslint-disable-lines
  rightHeader: PropTypes.any, // eslint-disable-line
  onPressLeftHeader: PropTypes.func,
  centerStyles: PropTypes.any, // eslint-disable-line
  containerStyle: PropTypes.any, // eslint-disable-line
};

Header.defaultProps = {
  leftHeader: null,
  centerHeader: null,
  rightHeader: null,
  onPressLeftHeader: () => {},
};

export default Header;
