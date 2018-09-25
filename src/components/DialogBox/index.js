import React, { PureComponent } from 'react';
import { View, Text, TouchableWithoutFeedback, Animated } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import * as d from '../../utilities/transform';

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
    const {
      width,
      title,
      description,
      children,
      descriptionCustomStyle,
      customStyle,
      containerCustomStyle,
      topAnimation,
    } = this.props;
    const { animation, isShow } = this.state;
    const animationStyle = {
      top: animation.interpolate({
        inputRange: [0, 1],
        outputRange: [topAnimation, 0],
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
        <Animated.View style={[styles.dialogStyle, { width }, animationStyle, customStyle]}>
          {title &&
            description && (
              <View>
                <Text style={styles.titleStyle}>{title}</Text>
                <Text style={[styles.descriptionStyle, descriptionCustomStyle]}>{description}</Text>
              </View>
            )}
          <View>{children}</View>
        </Animated.View>
      </View>
    ) : null;
  }
}

DialogBox.propTypes = {
  width: PropTypes.number,
  title: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.any, // eslint-disable-line
  onRef: PropTypes.func.isRequired,
  descriptionCustomStyle: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  customStyle: PropTypes.object,
  containerCustomStyle: PropTypes.object,
  topAnimation: PropTypes.number,
};

DialogBox.defaultProps = {
  title: null,
  description: null,
  width: 300 * d.ratioW,
  children: null,
  descriptionCustomStyle: {},
  customStyle: {},
  containerCustomStyle: {},
  topAnimation: 800,
};
