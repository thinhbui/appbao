import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, Image, Alert, ToastAndroid } from 'react-native';
import IconSimple from 'react-native-vector-icons/SimpleLineIcons';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import styles from './styles';
import { deleteComment, likeComment } from '../../services/newsAPI';
import * as d from '../../utilities/transform';
import { Fonts } from '../../constants';

class Comment extends PureComponent {
  state = {
    isLiked:
      this.comment && this.props.user
        ? this.comment.comment_like.findIndex(item => item.id === this.props.user.data.id) !== -1
        : false,
    commentLike: (this.props.comment.comment_like && this.props.comment.comment_like.length) || '',
  };
  onCheckCommentDetail = () => {
    this.props.navigation.navigate('CommentDetail', { item: this.props.comment });
  };
  onLike = async () => {
    const result = await likeComment(this.props.comment.id);
    console.log(result);

    if (result.status === 200 && result.data) {
      this.setState({ isLiked: true, commentLike: this.state.commentLike + 1 });
      ToastAndroid.show('Đã thích', ToastAndroid.SHORT);
    } else {
      ToastAndroid.show('Không thành công!', ToastAndroid.SHORT);
    }
  };
  onDelete = () => {
    Alert.alert('Thông báo', 'Bạn có muốn xóa không', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'OK',
        onPress: () => {
          deleteComment(this.props.comment.id).then((res) => {
            if (res.status === 200) {
              Alert.alert('Xóa thành công');
              this.props.onDelete(this.props.comment.id);
            } else {
              Alert.alert('Xóa không thành công');
            }
          });
        },
        style: 'cancel',
      },
    ]);
  };

  getTime = () => {
    const createdAt = this.props.comment.created_at;
    const now = moment().format('YYYY-MM-DD HH:mm:ss');
    const duration = moment(now, 'YYYY-MM-DD HH:mm:ss').diff(createdAt, 'seconds');
    const minute = 3600;
    const hour = 86400;
    if (duration < 60) {
      return `${moment(now, 'YYYY-MM-DD HH:mm:ss').diff(createdAt, 'seconds')} giây`;
    } else if (duration < minute) {
      return `${moment(now, 'YYYY-MM-DD HH:mm:ss').diff(createdAt, 'minutes')} phút`;
    } else if (duration > minute && duration < hour) {
      return `${moment(now, 'YYYY-MM-DD HH:mm:ss').diff(createdAt, 'hours')} giờ`;
    }
    return moment(createdAt, 'YYYY-MM-DD HH:mm:ss').format('HH:mm DD-MM-YYYY');
  };

  render() {
    const { isLiked, commentLike } = this.state;
    const {
      comment, canDelete, block, sub, mainFontSize, otherFontSize,
    } = this.props;

    return (
      <TouchableOpacity
        style={{ width: '100%', paddingHorizontal: 10 * d.ratioW }}
        activeOpacity={block ? 1 : null}
        onPress={this.onCheckCommentDetail}
      >
        <View style={styles.container}>
          <Image
            source={{
              uri: (comment.user && comment.user.avatar) || 'https://picsum.photos/50/50',
            }}
            style={!sub ? styles.avatar : styles.subAvatar}
          />
          <View style={{ width: '100%' }}>
            <Text
              style={{
                fontSize: mainFontSize,
                color: '#000',
                marginBottom: 10 * d.ratioH,
                fontFamily: Fonts.regular,
                width: '90%',
              }}
            >
              {comment.content}
              <Text style={{ fontSize: otherFontSize, color: '#BDBDBD', fontFamily: Fonts.regular }}>
                {' • '}
                {(comment.user && comment.user.full_name) || 'Chim sẻ đi nắng'}
                {' • '}
                {this.getTime()}
              </Text>
            </Text>
            <View style={{ flexDirection: 'row', marginTop: 10 * d.ratioH }}>
              {!sub && (
                <TouchableOpacity onPress={this.onCheckCommentDetail}>
                  <Text style={styles.replyCommentStyle}>
                    {comment.reply === 0 ? `${comment.reply} câu trả lời` : 'Trả lời'}
                  </Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity onPress={this.onLike} style={{ flexDirection: 'row' }}>
                <Text
                  style={{
                    color: isLiked ? '#C21E2B' : '#BDBDBD',
                    fontSize: otherFontSize,
                    marginRight: 5 * d.ratioW,
                fontFamily: Fonts.regular,
              }}
                >
                  Thích
                </Text>
                <IconSimple
                  name="heart"
                  size={otherFontSize}
                  color={isLiked ? '#C21E2B' : '#BDBDBD'}
                  style={{ marginTop: 3 * d.ratioH }}
                />
                <Text
                  style={{
                    color: isLiked ? '#C21E2B' : '#BDBDBD',
                    fontSize: otherFontSize,
                    marginLeft: 5 * d.ratioW,
                  }}
                >
                  {commentLike}
                </Text>
              </TouchableOpacity>
              {canDelete && (
                <TouchableOpacity onPress={this.onDelete}>
                  <Text
                    style={{
                      color: '#3881f7',
                      marginHorizontal: sub ? null : 5 * d.ratioW,
                      fontSize: otherFontSize,
                fontFamily: Fonts.regular,
              }}
                  >
                    Xóa
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
        {!sub && <View style={styles.card} />}
      </TouchableOpacity>
    );
  }
}

Comment.propTypes = {
  canDelete: PropTypes.bool,
  block: PropTypes.bool,
  comment: PropTypes.object.isRequired,
  sub: PropTypes.bool,
  onDelete: PropTypes.func,
  user: PropTypes.object.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
  mainFontSize: PropTypes.number,
  otherFontSize: PropTypes.number,
};

Comment.defaultProps = {
  canDelete: false,
  block: false,
  sub: false,
  onDelete: () => {},
  mainFontSize: 16 * d.ratioW,
  otherFontSize: 12 * d.ratioW,
};
const mapStateToProps = state => ({
  user: state.saveUserReducers,
});

export default connect(
  mapStateToProps,
  null,
)(Comment);
