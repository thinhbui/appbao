import React, { PureComponent } from 'react';
import { View, Text, Platform } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import * as d from '../../../utilities/transform';

const K_TO_C = 274.15;

class Weather extends PureComponent {
  render() {
    const currentTemp = this.props.currentWeather.data.main.temp;
    console.log(this.props.weather);

    const tempRange = this.props.weather.data.list[0].main;
    return (
      <View style={styles.weatherContainer}>
        <View style={styles.currentTempContainer}>
          <Text style={styles.currentTempTextStyle}>
            {this.props.currentWeather.data
              ? parseInt(currentTemp - K_TO_C) /* eslint-disable-line */
              : '--'}
          </Text>
          <Text style={styles.tempIconStyle}>˚</Text>
          <Text
            style={[
              styles.currentTempTextStyle,
              {
                right: Platform.OS === 'ios' ? 18 * d.ratioW : 8 * d.ratioW,
              },
            ]}
          >
            C
          </Text>
        </View>
        <View style={styles.detailsContainer}>
          <View style={styles.generalDetailContainer}>
            <Icon name="ios-cloud" size={25} color="#81B3F9" />
            <Text style={styles.textGeneralDetailStyle} numberOfLines={1} ellipsizeMode="tail">
              {this.props.currentWeather.data.weather[0].main}
            </Text>
          </View>
          <Text style={styles.locationTextStyle}>{this.props.currentWeather.data.name}</Text>
        </View>
        <Text style={styles.rangeTempStyle}>
          {this.props.currentWeather.data
            ? parseInt(tempRange.temp_min - K_TO_C) /* eslint-disable-line */
            : '--'}
          {' - '}
          {this.props.currentWeather.data
            ? parseInt(tempRange.temp_max - K_TO_C) /* eslint-disable-line */
            : '--'}
          ˚C
        </Text>
      </View>
    );
  }
}

Weather.propTypes = {
  weather: PropTypes.object.isRequired,
  currentWeather: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  weather: state.getWeatherReducers,
  currentWeather: state.getCurrentWeatherReducers,
});

export default connect(
  mapStateToProps,
  null,
)(Weather);
