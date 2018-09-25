import React, { PureComponent } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import PropTypes from 'prop-types';
import * as Progress from 'react-native-progress';
import { connect } from 'react-redux';
import { WhiteHeader } from '../../../../components';
import * as d from '../../../../utilities/transform';
import styles from './styles';

class UserLevel extends PureComponent {
  render() {
    const { navigation, user } = this.props;
    return (
      <View style={styles.container}>
        <WhiteHeader
          leftHeader={<Icon name="ios-arrow-back" size={35 * d.ratioW} color="#757575" />}
          onPressLeftHeader={() => navigation.navigate('NewsTab')}
        />
        <ScrollView>
          <LinearGradient
            colors={['#7BD4F9', '#8EB0F9']}
            style={styles.linearGradientContainer}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.headerTextStyle}>
              Hôm nay bạn có <Text style={styles.headerPointTextStyle}>{user.data.point}</Text> điểm
            </Text>
          </LinearGradient>
          <View style={styles.userDetailContainer}>
            <Image source={{ uri: user.data.avatar }} style={styles.avatarStyle} />
            <View>
              <Text style={styles.nameStyle}>{user.data.full_name}</Text>
              <Text style={styles.expTextStyle}>
                Điểm kinh nghiệm: <Text style={styles.expPointStyle}>{user.data.exp}</Text>
              </Text>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.introduceButtonStyle}
              onPress={() => navigation.navigate('LevelIntroduction')}
            >
              <Text style={styles.introduceButtonTextStyle}>Giới thiệu cấp bậc</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.giftButton}>
              <Text style={styles.giftButtonTextStyle}>Quyền lợi thăng cấp</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.progressContainer}>
            <View style={styles.progressHeaderContainer}>
              <Text style={styles.progressLevelStyle}>Cấp 1</Text>
              <Text style={styles.progressLevelStyle}>Cấp 2</Text>
            </View>
            <Progress.Bar
              progress={user.data.point / 100}
              width={d.windowSize.width * 0.9}
              color="#FBCF43"
              unfilledColor="#F4F4F4"
              borderWidth={0}
              borderRadius={0}
            />
            <Text style={styles.progressDescriptionStyle}>
              Để thăng cấp, bạn cần thêm{' '}
              <Text style={styles.progressPointStyle}>{100 - user.data.point}</Text> điểm
            </Text>
          </View>
          <View style={styles.footerContainer}>
            <Text style={styles.footerDescriptionStyle}>Cách tích luỹ kinh nghiệm</Text>
            <View>
              <View style={styles.tableRowContainer}>
                <View style={styles.firstColumn}>
                  <Text style={styles.headerTable}>Thao tác</Text>
                </View>
                <View style={styles.secondColumn}>
                  <Text style={styles.headerTable}>Exp</Text>
                </View>
                <View style={styles.firstColumn}>
                  <Text style={styles.headerTable}>Chi tiết</Text>
                </View>
              </View>
              <View style={styles.tableRowContainer}>
                <View style={styles.firstColumn}>
                  <Text style={styles.tableContent}>Bình luận</Text>
                </View>
                <View style={styles.secondColumn}>
                  <Text style={styles.tableContent}>+1</Text>
                </View>
                <View style={styles.firstColumn}>
                  <Text style={styles.headerTable}>Mỗi ngày tối đa 5 điểm</Text>
                </View>
              </View>
              <View style={styles.tableRowContainer}>
                <View style={styles.firstColumn}>
                  <Text style={styles.tableContent}>Gửi cho bạn bè</Text>
                </View>
                <View style={styles.secondColumn}>
                  <Text style={styles.tableContent}>+2</Text>
                </View>
                <View style={styles.firstColumn}>
                  <Text style={styles.headerTable}>Mỗi ngày tối đa 20 điểm</Text>
                </View>
              </View>
              <View style={styles.tableRowContainer}>
                <View style={styles.firstColumn}>
                  <Text style={styles.tableContent}>Mỗi 5 phút đọc tin tức</Text>
                </View>
                <View style={styles.secondColumn}>
                  <Text style={styles.tableContent}>+3</Text>
                </View>
                <View style={styles.firstColumn}>
                  <Text style={styles.headerTable}>Mỗi ngày tối đa 60 điểm</Text>
                </View>
              </View>
              <View style={[styles.tableRowContainer, {marginBottom: 20 * d.ratioH}]}>
                <View style={[styles.firstColumn, { borderBottomWidth: 0.3 }]}>
                  <Text style={styles.tableContent}>Mời bạn bè tải app</Text>
                </View>
                <View style={[styles.secondColumn, { borderBottomWidth: 0.3 }]}>
                  <Text style={styles.tableContent}>+20</Text>
                </View>
                <View style={[styles.firstColumn, { borderBottomWidth: 0.3 }]}>
                  <Text style={styles.headerTable}>Không giới hạn</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

UserLevel.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = state => ({
  user: state.saveUserReducers,
});

export default connect(
  mapStateToProps,
  null,
)(UserLevel);
