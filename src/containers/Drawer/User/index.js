import React, { PureComponent } from 'react';
import { View, Text, Image, TouchableOpacity, AsyncStorage } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { Icons, Fonts } from '../../../constants';
import styles from './styles';
import * as d from '../../../utilities/transform';
import { updateLevel } from '../../../services/newsAPI';

const avatar = 'https://picsum.photos/200/200';

class User extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      level: 1,
      levelName: 'Nhập ngũ',
    };
  }

  componentDidMount() {
    this.onRenderLevel();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.data.point) {
      this.onRenderLevel();
    }
  }

  onRenderLevel = async () => {
    const { level, user } = this.props;
    const index = level.data.findIndex(e => user.data.point === e.exp);
    const result = await updateLevel();
    console.log('Update level ', result);
    if (index !== -1) {
      this.setState({ level: level.data[index].id, levelName: level.data[index].name });
    } else {
      const otherIndex = level.data.lastIndexOf(e => user.data.point > e.exp);
      if (otherIndex !== -1) {
        this.setState({ level: level.data[otherIndex].id, levelName: level.data[otherIndex].name });
      }
    }
  };

  renderUserInfo = () => {
    const { user, navigation, onLogInPress } = this.props;
    const { level, levelName } = this.state;
    if (Object.keys(this.props.user.data).length !== 0) {
      return (
        <View style={styles.logInContainer}>
          <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate('AccountPage')}>
            <Image source={{ uri: user.data.avatar }} style={styles.avatarStyle} />
          </TouchableOpacity>
          <Text style={styles.userNameStyle}>{user.data.full_name}</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('UserLevel')}
            activeOpacity={1}
            style={{ paddingVertical: 10 * d.ratioH }}
          >
            <Text style={styles.userLevelStyle}>
              Cấp {level} {levelName} >
            </Text>
          </TouchableOpacity>
          <View
            style={{
              width: '65%',
              justifyContent: 'space-between',
              flexDirection: 'row',
              marginTop: d.windowSize.height * 0.03,
            }}
          >
            <View>
              <Image source={Icons.coin} />
              <Text style={styles.coinStyle}>{user.data.coin} Xu</Text>
            </View>
            <View>
              <Image source={Icons.point} />
              <Text style={styles.coinStyle}>{user.data.point} Điểm</Text>
            </View>
          </View>
        </View>
      );
    }
    return (
      <View style={styles.logInContainer}>
        <View style={styles.backgroundIconContainer}>
          <Icon name="ios-contact" size={60 * d.ratioW} style={styles.iconStyle} />
        </View>
        <TouchableOpacity style={styles.logInButtonStyle} onPress={onLogInPress}>
          <Text style={styles.logInTextStyle}>Đăng nhập</Text>
        </TouchableOpacity>
        <Text style={styles.descriptionStyle}>Đọc tin tức, nhận tiền mặt</Text>
      </View>
    );
  };

  render() {
    return <View style={styles.userContainer}>{this.renderUserInfo()}</View>;
  }
}

User.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
  user: PropTypes.object.isRequired,
  onLogInPress: PropTypes.func.isRequired,
  level: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  user: state.saveUserReducers,
  level: state.levelReducers,
});

export default connect(
  mapStateToProps,
  null,
)(User);
