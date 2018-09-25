import React, { PureComponent } from 'react';
import { Modal, View, Text, TouchableOpacity, Alert, AsyncStorage, Platform } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Slider from 'react-native-slider';
import * as d from '../../../utilities/transform';
import { saveUserData, changeFontSize } from '../../../actions';
import DialogBox from './DialogBox';
import styles from './styles';

class ModalFont extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.fontSizeRedux.data || 16 * d.ratioW,
    };
  }
  render() {
    const {
      visible, onRef, onClose, onShow, onChangeFontSize,
    } = this.props;
    return (
      <Modal
        style={styles.modalContainer}
        visible={visible}
        onRequestClose={() => {}}
        onShow={onShow}
        transparent
      >
        <DialogBox onRef={onRef} onClose={onClose}>
          <View style={styles.wrapper}>
            <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
              <Text style={styles.smallTextStyle}>Nhỏ</Text>
              <Text style={styles.mediumTextStyle}>Vừa</Text>
              <Text style={styles.largeTextStyle}>Lớn</Text>
            </View>
            <View style={{ height: 10 * d.ratioH, width: '100%', marginBottom: 10 * d.ratioH }}>
              <Slider
                value={this.state.value}
                onSlidingComplete={(value) => {
                  this.setState({ value });
                  this.props.changeFontSize(value);
                }}
                maximumTrackTintColor="#EF9A9A"
                thumbTintColor="#C21E2B"
                minimumTrackTintColor="#C21E2B"
                minimumValue={12 * d.ratioW}
                maximumValue={20 * d.ratioW}
                step={4 * d.ratioW}
              />
            </View>
          </View>
        </DialogBox>
      </Modal>
    );
  }
}

ModalFont.propTypes = {
  visible: PropTypes.bool.isRequired,
  onRef: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onShow: PropTypes.func.isRequired,
  changeFontSize: PropTypes.func.isRequired,
};

ModalFont.defaultProps = {};

const mapStateToProps = state => ({
  fontSizeRedux: state.changeFontSizeReducer,
});

const mapDispatchToProps = dispatch => ({
  saveUserData: data => dispatch(saveUserData(data)),
  changeFontSize: data => dispatch(changeFontSize(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ModalFont);
