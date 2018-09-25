import React, { PureComponent } from 'react';
import { View, AsyncStorage, Alert, Platform } from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';
import axios from 'axios';
import { connect } from 'react-redux';
import {
  saveUserData,
  getWeatherData,
  getCurrentWeatherData,
  saveLevel,
  getFollowApi,
  category,
} from '../../actions';
import { Header } from '../../components';
import { getWeatherApi, getCurrentWeatherApi } from '../../services';
import { oauth, user } from '../../services/newsAPI';
import { StorageTypes } from '../../constants';
import { getSuccessCategories } from '../../actions/category';

const accessTokenExpireDuration = 1296000;
const refreshTokenExpireDuration = 2592000;

class Loading extends PureComponent {
  componentDidMount() {
    console.log('componentDidMount', this.props);
    // AsyncStorage.removeItem('token');
    // if (Platform.OS === 'android') {
    // this.onCheckUser();
    // oauth();
    // this.onGetData();
    // } else {
    this.onLoad();
    // }
  }

  onLoad = async () => {
    await oauth();
    await this.onGetData();
  };

  onGetData = async () => {
    try {
      // get data
      // await this.onGetLevel();

      await this.getStorage();

      const userStorage = JSON.parse(await AsyncStorage.getItem('user'));
      const currentWeather = await getCurrentWeatherApi();
      const weather = await getWeatherApi();
      // get Category

      // save data to redux
      if (userStorage) {
        const userApi = await user();
        if (userApi.status === 200) {
          await this.props.saveUserData(userApi.data);
        } else {
          await this.props.saveUserData(userStorage);
        }
      }
      await this.props.getCurrentWeatherData(currentWeather.data);
      await this.props.getWeatherData(weather.data);

      // save data to async storage
      await AsyncStorage.setItem('weather', JSON.stringify(weather.data));
      // console.log(this.props.user);
      await this.props.getFollowApi();
      await this.props.getLevel();

      // if (this.props.user.data && this.props.weather) {
      this.props.navigation.navigate('Drawer');
      // }
    } catch (error) {
      console.log(error);
      // Alert.alert('LỖI', 'Đã có lỗi xảy ra. Bạn vui lòng thử lại.');
      const weather = await AsyncStorage.getItem('weather');
      if (!weather) {
        await this.props.getWeatherData(JSON.parse(weather));
      }
    }
  };
  getStorage = async () => {
    const result = await AsyncStorage.getItem(StorageTypes.CATEGORIES);
    if (result) {
      const categoryStorage = JSON.parse(result);
      this.props.dispatch(getSuccessCategories(categoryStorage));
    } else {
      await this.props.getCategories();
    }
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header />
      </View>
    );
  }
}

Loading.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
  saveUserData: PropTypes.func.isRequired,
  getWeatherData: PropTypes.func.isRequired,
  getCategories: PropTypes.func.isRequired,
  // user: PropTypes.object.isRequired,
  // weather: PropTypes.object.isRequired,
  getCurrentWeatherData: PropTypes.func.isRequired,
  getLevel: PropTypes.func.isRequired,
  getFollowApi: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: state.saveUserReducers,
  weather: state.getWeatherReducers,
  currentWeather: state.getCurrentWeatherReducers,
  level: state.levelReducers,
  category: state.category,
});

const mapDispatchToProps = dispatch => ({
  saveUserData: data => dispatch(saveUserData(data)),
  getCurrentWeatherData: data => dispatch(getCurrentWeatherData(data)),
  getWeatherData: data => dispatch(getWeatherData(data)),
  getCategories: () => dispatch(category()),
  getLevel: () => dispatch(saveLevel()),
  getFollowApi: () => dispatch(getFollowApi()),
  dispatch,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Loading);
