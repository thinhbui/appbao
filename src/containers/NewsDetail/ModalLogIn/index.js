import React, { PureComponent } from 'react';
import { Modal, Text, TouchableOpacity, Alert, AsyncStorage, Platform } from 'react-native';
import { connect } from 'react-redux';
import { GraphRequest, GraphRequestManager, LoginManager } from 'react-native-fbsdk';
import { GoogleSignin, statusCodes } from 'react-native-google-signin';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import PropTypes from 'prop-types';
import * as d from '../../../utilities/transform';
import { saveUserData } from '../../../actions';
import { login, user } from '../../../services/newsAPI';
import { DialogBox } from '../../../components';
import styles from './styles';

const avatar = 'https://picsum.photos/200/200';

class ModalLogIn extends PureComponent {
  componentDidMount() {
    this._configureGoogleSignIn();
  }

  onSaveUserInfo = (result, userResult) => {
    AsyncStorage.setItem('user', JSON.stringify(userResult.data));
    const tokenObject = {
      accessToken: `${result.data.token_type} ${result.data.access_token}`, //eslint-disable-line
      expireDate: moment()
        .add(1296000, 'seconds')
        .format('DD/MM/YYYY HH:mm:ss'),
      refreshToken: result.data.refresh_token, // eslint-disable-line
    };
    AsyncStorage.setItem('token', JSON.stringify(tokenObject));
    console.log('login storage', tokenObject);
    this.props.saveUserData(userResult.data);
    console.log(this.props.user);
  };

  getUserFBInfo = () => {
    const infoRequest = new GraphRequest('me?fields=id,name,email', null, async (err, res) => {
      if (err) {
        Alert.alert(
          'KHÔNG THÀNH CÔNG',
          'Chưa thể lấy được thông tin. Bạn vui lòng đăng nhập lại. Xin cảm ơn!',
        );
      } else {
        console.log(res);

        console.log('USER ', res);
        res.nameId = `facebook_${res.id}`;
        res.social = 'facebook';
        res.avatar = `http://graph.facebook.com/${res.id}/picture?type=large`;
        try {
          const result = await login(
            res.id,
            res.email,
            res.nameId,
            res.social,
            res.name,
            res.avatar,
          );
          console.log('login api result ', result);
          if (result.status === 200) {
            const userResult = await user();
            console.log('user api result ', userResult);
            userResult.social = 'facebook';
            if (userResult.status === 200) {
              userResult.data.social = 'facebook';
              await this.onSaveUserInfo(result, userResult);
            }
          } else {
            Alert.alert('THẤT BẠI', 'Bạn vui lòng thử lại sau');
          }
        } catch (error) {
          console.log('log in fb ', error);
          Alert.alert('THẤT BẠI', 'Bạn vui lòng thử lại sau');
        }
      }
    });
    new GraphRequestManager().addRequest(infoRequest).start();
  };

  _configureGoogleSignIn = () => {
    const configPlatform = {
      ...Platform.select({
        ios: {
          iosClientId: '647738972414-kns87c6cmhgutuab0rnrq4e8o8vfg3f4.apps.googleusercontent.com',
        },
        android: {},
      }),
    };

    GoogleSignin.configure({
      ...configPlatform,
      offlineAccess: false,
    });
  };

  signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userGG = await GoogleSignin.signIn();
      console.log('user gg ', userGG);
      userGG.user.nameId = `google_${userGG.user.id}`;
      userGG.user.social = 'google';
      const result = await login(
        userGG.user.id,
        userGG.user.email,
        userGG.user.nameId,
        userGG.user.social,
        userGG.user.name,
        userGG.user.photo || avatar,
      );

      if (result.status === 200) {
        const userResult = await user();
        console.log('user api result ', userResult);
        if (userResult.status === 200) {
          userResult.data.social = 'google';
          this.onSaveUserInfo(result, userResult);
        }
      }
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        Alert.alert('KHÔNG THÀNH CÔNG', 'Bạn đã huỷ đăng nhập bằng Google');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Alert.alert('ĐANG ĐĂNG NHẬP', 'Hệ thống đang đăng nhập vào tài khoản của bạn.');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('KHÔNG THÀNH CÔNG', 'Đã có lỗi xảy ra, bạn vui lòng thử lại.');
      } else {
        console.log('error google log in', error);
        Alert.alert('KHÔNG THÀNH CÔNG', 'Đã có lỗi xảy ra, bạn vui lòng thử lại.');
      }
    }
  };

  loginFacebook = async () => {
    try {
      const result = await LoginManager.logInWithReadPermissions(['public_profile']);
      if (result.isCancelled) {
        Alert.alert('KHÔNG THÀNH CÔNG', 'Bạn đã huỷ đăng nhập bằng Facebook');
      } else {
        this.getUserFBInfo();
      }
    } catch (error) {
      console.log('error fb log in', error);
      Alert.alert('KHÔNG THÀNH CÔNG', 'Đã có lỗi xảy ra. Bạn vui lòng thử lại.');
    }
  };

  render() {
    const {
      visible, onRef, onClose, onLogIn, onShow,
    } = this.props;
    return (
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
            onPress={() => {
              onLogIn();
              this.loginFacebook();
            }}
          >
            <Icon
              name="logo-facebook"
              color="#466BAE"
              size={30 * d.ratioW}
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
            onPress={() => {
              onLogIn();
              this.signIn();
            }}
          >
            <Icon
              name="logo-google"
              color="#CB453D"
              size={30 * d.ratioW}
              style={{
                marginRight: 10 * d.ratioW,
              }}
            />
            <Text style={styles.logInGGStyle}>Đăng nhập với Google</Text>
          </TouchableOpacity>
        </DialogBox>
      </Modal>
    );
  }
}

ModalLogIn.propTypes = {
  visible: PropTypes.bool.isRequired,
  onRef: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onLogIn: PropTypes.any.isRequired,
  user: PropTypes.object,
  onShow: PropTypes.func.isRequired,
  saveUserData: PropTypes.func.isRequired,
};

ModalLogIn.defaultProps = {
  user: {},
};

const mapDispatchToProps = dispatch => ({
  saveUserData: data => dispatch(saveUserData(data)),
});

export default connect(
  null,
  mapDispatchToProps,
)(ModalLogIn);
