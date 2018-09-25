import React, { PureComponent } from 'react';
import { View, Text, WebView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';
import { WhiteHeader } from '../../components';
import * as d from '../../utilities/transform';
import { Fonts } from '../../constants';

class Wallet extends PureComponent {
  render() {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1, backgroundColor: '#FFF' }}>
        <WhiteHeader
          leftHeader={<Icon name="ios-arrow-back" size={35 * d.ratioW} color="#757575" />}
          centerHeader={
            <Text style={{ fontFamily: Fonts.regular, fontSize: 16 * d.ratioW }}>Ví tiền</Text>
          }
          onPressLeftHeader={() => navigation.goBack()}
        />
        <WebView source={{ uri: 'https://m.vntimes.app/store' }} />
      </View>
    );
  }
}

Wallet.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

export default Wallet;
