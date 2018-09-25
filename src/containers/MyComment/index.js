import React, { PureComponent } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/Feather';
import { connect } from 'react-redux';
import { WhiteHeader } from '../../components';
import { myComment } from '../../services/newsAPI';
import styles from './styles';
import * as d from '../../utilities/transform';
import { Fonts } from '../../constants';

class MyComment extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
      refreshing: false,
      isLike: false,
    };
  }

  componentDidMount() {
    this.onGetMyComment();
  }

  onGetMyComment = async () => {
    const comments = await myComment();
    if (comments.status === 200) {
      this.setState({ data: comments.data.data, loading: false });
    }
  };

  onPress = (id) => {
    const item = { id };
    this.props.navigation.navigate('NewsDetail', { item });
  };

  onRenderComment = () => {
    const { loading, data, refreshing } = this.state;

    if (loading) {
      return <ActivityIndicator color="#C21E2B" size="large" />;
    }
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.commentContainer}
              activeOpacity={1}
              onPress={() => this.onPress(item.post_id)}
            >
              <View style={styles.wrapper}>
                <Image source={{ uri: item.user.avatar }} style={styles.avatarStyle} />
                <View style={styles.contentWrapper}>
                  <View style={styles.userDetailContainer}>
                    <Text style={styles.userNameStyle}>{item.user.full_name}</Text>
                    <Text style={styles.timeStyle}>{item.created_at}</Text>
                  </View>
                  <Text style={styles.contentStyle}>{item.content}</Text>
                  <View style={styles.postContainer}>
                    <Image
                      source={{ uri: item.post.image || 'https://picsum.photos/200/200' }}
                      style={styles.postImageStyle}
                    />
                    <View style={styles.postTitleContainer}>
                      <Text
                        numberOfLines={2}
                        ellipsizeMode="tail"
                        style={{ fontFamily: Fonts.regular,fontSize: 14 * d.ratioW, color: 'rgba(0,0,0,0.7)' }}
                      >
                        {item.post.title ||
                          'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.'}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.footerContainer}>
                    <Text style={styles.footerTextStyle}>
                      {item.sub_comment.length || 0} Đáp lại
                    </Text>
                    <TouchableOpacity>
                      <Text style={styles.footerTextStyle}>
                        <Icons
                          name="thumbs-up"
                          size={15}
                          color={this.state.isLiked ? '#C21E2B' : '#BDBDBD'}
                        />{' '}
                        {item.comment_likes || 0}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
          refreshing={refreshing}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              tintColor="#C21E2B"
              colors={['#C21E2B']}
              onRefresh={this.onGetMyComment}
            />
          }
        />
      </View>
    );
  };

  render() {
    const { navigation, user } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <WhiteHeader
          leftHeader={<Icon name="ios-arrow-back" size={35 * d.ratioW} color="#757575" />}
          centerHeader={<Text style={styles.centerHeaderStyle}>Bình luận của tôi</Text>}
          onPressLeftHeader={() => navigation.goBack()}
        />
        {!user.data ? (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={styles.centerHeaderStyle}>Bạn cần đăng nhập để sử dụng tính năng này</Text>
          </View>
        ) : (
          this.onRenderComment()
        )}
      </View>
    );
  }
}

MyComment.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  user: state.saveUserReducers,
});

export default connect(
  mapStateToProps,
  null,
)(MyComment);
