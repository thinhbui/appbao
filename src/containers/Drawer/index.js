import React, { PureComponent } from 'react';
import { View, AsyncStorage, ScrollView, Platform, Alert } from 'react-native';
import { GraphRequest, GraphRequestManager, LoginManager } from 'react-native-fbsdk';
import { verticalScale } from 'react-native-size-matters';
import { GoogleSignin, statusCodes } from 'react-native-google-signin';
import moment from 'moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveUserData } from '../../actions';
import styles from './styles';
import * as d from '../../utilities/transform';
import { login, user, lightService } from '../../services/newsAPI';
import Weather from './Weather';
import BodyDrawer from './BodyDrawer';
import User from './User';
import ModalLogIn from './ModalLogIn';

const userInfo = {
  id: 2166367860242361,
  email: 'hoanghuy27297@gmail.com',
  name: 'facebook_2166367860242361',
  social: 'facebook',
  full_name: 'Hoàng Hải Huy',
  avatar: 'https://picsum.photos/200/200',
};

class Drawer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  componentDidMount() {
    console.log(this.props.user);
    this._configureGoogleSignIn();
  }

  onOpenModal = () => this.setState({ visible: true });
  onCloseModal = () => this.setState({ visible: false });

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
            res.email || userInfo.email,
            res.nameId,
            res.social,
            res.name,
            res.avatar,
          );
          console.log('login api result ', result);
          console.log(lightService.defaults.headers.Authorization);
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
    this.modal.close();
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
        userGG.user.photo || userInfo.avatar,
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
    this.modal.close();
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
    const { navigation } = this.props;
    const { visible } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <Weather />
        <ScrollView>
          <View
            style={{
              height: Platform !== 'ios' ? verticalScale(500) : null,
            }}
          >
            <View
              style={[
                styles.customBackGround,
                {
                  /* eslint-disable */
                  backgroundColor: this.props.user.data
                    ? !this.props.user.data.full_name
                      ? '#F1F1F1'
                      : '#C21E2B'
                    : '#F1F1F1',
                  /* eslint-enable */
                },
              ]}
            />
            <User onLogInPress={this.onOpenModal} navigation={navigation} />
          </View>
        </ScrollView>
        <ScrollView
          style={[
            {
              backgroundColor: '#FFF',
              alignSelf: 'center',
              width: '100%',
            },
            {
              /* eslint-disable */
              marginTop: this.props.user.data
                ? !this.props.user.data.full_name
                  ? d.windowSize.height * -0.6
                  : Platform.OS === 'ios'
                    ? d.windowSize.height * -0.48
                    : d.windowSize.height * -0.45
                : d.windowSize.height * -0.6,
              /* eslint-enable */
            },
          ]}
        >
          <BodyDrawer navigation={navigation} />
        </ScrollView>
        <ModalLogIn
          visible={visible}
          onRef={(ref) => {
            this.modal = ref;
          }}
          onClose={this.onCloseModal}
          onShow={() => this.modal.open()}
          onLogInFB={this.loginFacebook}
          onLogInGG={this.signIn}
        />
      </View>
    );
  }
}

Drawer.propTypes = {
  navigation: PropTypes.shape({
    state: PropTypes.object,
    navigate: PropTypes.func,
  }).isRequired,
  user: PropTypes.object.isRequired,
  saveUserData: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: state.saveUserReducers,
  weather: state.getWeatherReducers,
  currentWeather: state.getCurrentWeatherReducers,
});

const mapDispatchToProps = dispatch => ({
  saveUserData: data => dispatch(saveUserData(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Drawer);
