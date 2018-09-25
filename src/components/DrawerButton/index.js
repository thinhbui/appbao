import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

const DrawerButton = ({
  icon, onPress, text, customContainerStyle,
}) => (
  <TouchableOpacity style={[styles.container, customContainerStyle]} onPress={onPress}>
    <View>{icon}</View>
    <Text style={styles.textStyle}>{text}</Text>
  </TouchableOpacity>
);

DrawerButton.propTypes = {
  icon: PropTypes.any.isRequired, //eslint-disable-line
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  customContainerStyle: PropTypes.object,
};

DrawerButton.defaultProps = {
  onPress: () => {},
  customContainerStyle: {},
};

export default DrawerButton;
