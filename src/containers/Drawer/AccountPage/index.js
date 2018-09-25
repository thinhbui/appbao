import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, Image, Platform } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { WhiteHeader } from '../../../components';
import * as d from '../../../utilities/transform';
import { Fonts } from '../../../constants';

const avatar = 'https://picsum.photos/200/200';

class AccountPage extends PureComponent {
  onGoBack = () => {
    const { navigation } = this.props;
    navigation.goBack();
  };

  onGoToAccountSetting = () => {
    const { navigation } = this.props;
    navigation.navigate('AccountSetting');
  };

  render() {
    const { user } = this.props;
    return (
      <View style={{ flex: 1, backgroundColor: '#FFF' }}>
        <WhiteHeader
          leftHeader={<Icon name="ios-arrow-back" size={35 * d.ratioW} color="#FFF" />}
          rightHeader={
            <Text
              style={{
                color: '#FFF',
                fontSize: 16 * d.ratioW,
                marginTop: Platform.OS === 'ios' ? d.windowSize.height * 0.005 : null,
                fontFamily: Fonts.regular,
              }}
            >
              Sửa đổi
            </Text>
          }
          onPressLeftHeader={this.onGoBack}
          onPressRightHeader={this.onGoToAccountSetting}
          customContainerStyle={{ backgroundColor: '#C21E2B' }}
        />
        <View
          style={{
            marginVertical: d.windowSize.height * 0.02,
            marginLeft: d.windowSize.width * 0.03,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Image
            source={{ uri: user.data.avatar || avatar }}
            style={{
              height: d.windowSize.height * 0.1,
              width: d.windowSize.height * 0.1,
              borderRadius: d.windowSize.height * 0.05,
              marginRight: d.windowSize.width * 0.03,
            }}
          />
          <View>
            <Text>{user.data.full_name}</Text>
            <Text style={{ fontFamily: Fonts.regular, color: '#929292' }}>Độ hot {'\t\t'} 0</Text>
          </View>
        </View>
        <Text style={{ fontFamily: Fonts.regular, marginLeft: d.windowSize.width * 0.03 }}>
          Followers 0 {'\t\t'} Theo dõi 0
        </Text>
      </View>
    );
  }
}

AccountPage.propTypes = {
  user: PropTypes.shape({
    data: PropTypes.object,
    avatar: PropTypes.string,
    full_name: PropTypes.string,
  }).isRequired,
  navigation: PropTypes.shape({
    goBack: PropTypes.func,
    navigate: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = state => ({
  user: state.saveUserReducers,
});

export default connect(
  mapStateToProps,
  null,
)(AccountPage);
