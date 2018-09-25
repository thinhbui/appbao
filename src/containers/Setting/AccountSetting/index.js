import React, { PureComponent } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  AsyncStorage,
  Platform,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';
import { saveUserData } from '../../../actions';
import { WhiteHeader } from '../../../components';
import * as d from '../../../utilities/transform';
import styles from './styles';
import { Fonts } from '../../../constants';

const avatar = 'https://picsum.photos/200/200';

class AccountSetting extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      onEdit: false,
    };
  }

  onEditProfile = () => {
    this.setState({ onEdit: !this.state.onEdit });
  };

  onRenderDetail = (detail) => {
    if (this.state.onEdit) {
      return (
        <TextInput
          placeholder={detail}
          style={{
            paddingVertical: Platform.OS === 'ios' ? null : d.windowSize.height * -0.1,
            width: d.windowSize.width * 0.7,
            top: Platform.OS === 'ios' ? null : d.windowSize.height * -0.007,
          }}
          underlineColorAndroid="transparent"
          clearTextOnFocus
        />
      );
    }
    return <Text style={styles.buttonDescriptionStyle}>{detail}</Text>;
  };

  onCancel = () => {
    if (this.state.onEdit) {
      this.setState({ onEdit: false });
    } else {
      this.props.navigation.goBack();
    }
  };

  render() {
    const { navigation, user } = this.props;
    const { onEdit } = this.state;
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>
          <WhiteHeader
            leftHeader={
              <Icon
                name={onEdit ? 'ios-close' : 'ios-arrow-back'}
                size={35 * d.ratioW}
                color={onEdit ? '#C21E2B' : '#757575'}
              />
            }
            centerHeader="Sửa đổi thông tin"
            rightHeader={
              <Text
                style={{ fontFamily: Fonts.regular, color: '#C21E2B', fontSize: 17 * d.ratioW }}
              >
                {onEdit ? 'Lưu' : 'Sửa'}
              </Text>
            }
            onPressLeftHeader={this.onCancel}
            onPressRightHeader={this.onEditProfile}
          />
          <TouchableOpacity style={styles.avatarContainer}>
            <Image source={{ uri: user.data.avatar || avatar }} style={styles.avatarStyle} />
          </TouchableOpacity>
          <ScrollView>
            <View style={styles.container}>
              <TouchableOpacity style={styles.buttonContainer}>
                <Text style={styles.buttonNameStyle}>Nickname</Text>
                {this.onRenderDetail(user.data.full_name)}
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonContainer}>
                <Text style={styles.buttonNameStyle}>Email</Text>
                {this.onRenderDetail(user.data.email)}
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

AccountSetting.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    goBack: PropTypes.func,
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
)(AccountSetting);
