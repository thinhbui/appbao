import React, { PureComponent } from 'react';
import { View, TouchableWithoutFeedback, Animated } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import * as d from '../../../../utilities/transform';

export default class DialogBox extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isShow: false,
      animation: new Animated.Value(0),
    };
    props.onRef(this);
  }

  open = () => {
    this.setState({ isShow: true }, () => {
      Animated.timing(this.state.animation, {
        toValue: 1,
        duration: 200,
      }).start();
    });
  };

  close = () => {
    Animated.timing(this.state.animation, {
      toValue: 0,
      duration: 200,
    }).start(() => {
      this.setState({ isShow: false });
      this.props.onClose();
    });
  };

  render() {
    const { children, customStyle, containerCustomStyle } = this.props;
    const { animation, isShow } = this.state;
    const animationStyle = {
      top: animation.interpolate({
        inputRange: [0, 1],
        outputRange: [900, 0],
      }),
    };
    const overlayAnimationStyle = {
      opacity: animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0.5],
      }),
    };
    return isShow ? (
      <View style={[styles.container, containerCustomStyle]}>
        <TouchableWithoutFeedback onPress={this.close}>
          <Animated.View style={[styles.overlayStyle, overlayAnimationStyle]} />
        </TouchableWithoutFeedback>
        <Animated.View style={[styles.dialogStyle, animationStyle, customStyle]}>
          {children}
        </Animated.View>
      </View>
    ) : null;
  }
}

DialogBox.propTypes = {
  children: PropTypes.any, // eslint-disable-line
  onRef: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  customStyle: PropTypes.object,
  containerCustomStyle: PropTypes.object,
};

DialogBox.defaultProps = {
  children: null,
  customStyle: {},
  containerCustomStyle: {},
};
