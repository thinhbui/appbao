import React from 'react';
import { Modal, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';
import { DialogBox } from '../../../components';
import styles from './styles';
import * as d from '../../../utilities/transform';

const ModalLogIn = ({
  visible, onRef, onClose, onLogInFB, onLogInGG, onShow,
}) => (
  <Modal
    style={styles.modalContainer}
    visible={visible}
    onRequestClose={() => {}}
    onShow={onShow}
    transparent
  >
    <DialogBox
      onRef={onRef}
      title="Vui lòng đăng nhập"
      description="Đọc tin tức, nhận tiền mặt"
      descriptionCustomStyle={{ color: '#F8C25C' }}
      onClose={onClose}
    >
      <TouchableOpacity
        style={[
          styles.logInButtonContainer,
          {
            borderColor: '#466BAE',
          },
        ]}
        onPress={onLogInFB}
      >
        <Icon
          name="logo-facebook"
          color="#466BAE"
          size={30 * d.ratioH}
          style={{
            marginRight: 10 * d.ratioW,
          }}
        />
        <Text style={styles.logInFBStyle}>Đăng nhập với Facebook</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.logInButtonContainer,
          {
            borderColor: '#CB453D',
          },
        ]}
        onPress={onLogInGG}
      >
        <Icon
          name="logo-google"
          color="#CB453D"
          size={30}
          style={{
            marginRight: 10 * d.ratioW,
          }}
        />
        <Text style={styles.logInGGStyle}>Đăng nhập với Google</Text>
      </TouchableOpacity>
    </DialogBox>
  </Modal>
);

ModalLogIn.propTypes = {
  visible: PropTypes.bool.isRequired,
  onRef: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onLogInFB: PropTypes.func.isRequired,
  onLogInGG: PropTypes.func.isRequired,
};

export default ModalLogIn;
