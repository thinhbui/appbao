import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';
import { WhiteHeader } from '../../components';
import * as d from '../../utilities/transform';
import { Fonts } from '../../constants';

class Notification extends PureComponent {
  render() {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1, backgroundColor: '#FFF' }}>
        <WhiteHeader
          leftHeader={<Icon name="ios-arrow-back" size={35 * d.ratioW} color="#757575" />}
          centerHeader={
            <Text style={{ fontFamily: Fonts.regular, fontSize: 16 * d.ratioW }}>Thông báo</Text>
          }
          onPressLeftHeader={() => navigation.goBack()}
        />
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontFamily: Fonts.regular, fontSize: 16 * d.ratioW, color: '#000' }}>
            Tính năng này đang trong giai đoạn phát triển.
          </Text>
        </View>
      </View>
    );
  }
}

Notification.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

export default Notification;
