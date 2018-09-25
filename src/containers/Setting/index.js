import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { GoogleSignin } from 'react-native-google-signin';
import Icon from 'react-native-vector-icons/Ionicons';
import { LoginManager } from 'react-native-fbsdk';
import { saveUserData } from '../../actions';
import { WhiteHeader } from '../../components';
import * as d from '../../utilities/transform';
import styles from './styles';
import { logout } from '../../services/newsAPI';
import { Fonts } from '../../constants';
// import { oauth } from '../../services/newsAPI';

class Setting extends PureComponent {
  onLogout = async () => {
    await AsyncStorage.removeItem('user');
    await AsyncStorage.removeItem('token');
    console.log('this.props.user', this.props.user);
    try {
      if (this.props.user.data.name.includes('facebook')) {
        this.onLogOutFB();
      } else {
        this.signOutGG();
      }
      logout();
    } catch (error) {
      console.log(error);
    }

    await this.props.saveUserData({});
    await this.props.navigation.goBack();
    // await oauth();
  };
  onLogOutFB = async () => {
    try {
      await LoginManager.logOut();
    } catch (error) {
      console.log('LOG OUT ', error);
      Alert.alert('KHÔNG THÀNH CÔNG', 'Đăng xuất không thành công, bạn vui lòng thử lại');
    }
  };
  signOutGG = async () => {
    console.log('signOutGG');

    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
    } catch (error) {
      console.error(error);
      Alert.alert('KHÔNG THÀNH CÔNG', 'Đăng xuất không thành công, bạn vui lòng thử lại');
    }
  };
  renderUserInfo = () => {
    const { user, navigation } = this.props;
    if (Object.keys(user.data).length !== 0) {
      return (
        <View>
          <TouchableOpacity style={styles.buttonContainer}>
            <Text style={styles.buttonNameStyle}>Số điện thoại</Text>
            <Text style={styles.buttonDescriptionStyle}>Nhấp vào để liên kết</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer}>
            <Text style={styles.buttonNameStyle}>
              {user.data.name.split('_')[0] === 'facebook'
                ? 'Tài khoản Facebook'
                : 'Tài khoản Google'}
            </Text>
            <Text style={styles.buttonDescriptionStyle}>{this.props.user.data.full_name}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => navigation.navigate('AccountSetting')}
          >
            <Text style={styles.buttonNameStyle}>Cập nhật tài khoản</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return null;
  };

  renderLogOutButton = () => {
    const { user } = this.props;
    if (Object.keys(user.data).length !== 0) {
      return (
        <TouchableOpacity style={styles.logOutContainer} onPress={this.onLogout}>
          <Text style={styles.buttonNameStyle}>Đăng xuất</Text>
        </TouchableOpacity>
      );
    }
    return null;
  };

  render() {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <WhiteHeader
          leftHeader={<Icon name="ios-arrow-back" size={35 * d.ratioW} color="#757575" />}
          centerHeader={
            <Text style={{ fontFamily: Fonts.regular, fontSize: 16 * d.ratioW }}>Cài đặt</Text>
          }
          onPressLeftHeader={() => navigation.goBack()}
        />
        <ScrollView>
          <View style={styles.container}>
            {this.renderUserInfo()}
            <View style={styles.buttonContainer}>
              <Text style={styles.buttonNameStyle}>Phiên bản</Text>
              <Text style={styles.buttonDescriptionStyle}>1.0</Text>
            </View>
            <TouchableOpacity style={styles.privacyButtonContainer}>
              <Text style={styles.buttonNameStyle}>ĐIỀU KHOẢN SỬ DỤNG</Text>
            </TouchableOpacity>
          </View>
          {this.renderLogOutButton()}
        </ScrollView>
      </View>
    );
  }
}

Setting.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
  saveUserData: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  user: state.saveUserReducers,
});

const mapDispatchToProps = dispatch => ({ saveUserData: data => dispatch(saveUserData(data)) });

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Setting);
