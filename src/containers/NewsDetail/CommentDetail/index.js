import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  ToastAndroid,
  Platform,
  Keyboard,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import IconSimple from 'react-native-vector-icons/SimpleLineIcons';
import PropTypes from 'prop-types';
import moment from 'moment';
import Icons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Feather';
import TextInputState from 'react-native/lib/TextInputState';
import { WhiteHeader } from '../../../components';
import { windowSize, ratioH, ratioW } from '../../../utilities/transform';
import styles from './styles';

import { getSubComment, comment, likeComment } from '../../../services/newsAPI';
import Comment from '../../../components/Comment';
import { saveUserData } from '../../../actions';
import { Fonts } from '../../../constants';

class CommentDetail extends Component {
  constructor(props) {
    super(props);
    this.comment = props.navigation.getParam('item', {});
    this.state = {
      isLiked:
        this.comment && props.user
          ? this.comment.comment_like.findIndex(item => item.user_id === props.user.data.id) !== -1
          : false,
      write: false,
      data: [],
      like: this.comment ? this.comment.comment_like.length : 0,
      content: '',
    };
    console.log('this.comment', this.comment);
  }

  componentDidMount() {
    this.getSubComment();
  }
  onComment = async () => {
    if (this.props.user.data) {
      const cmt = await comment(
        this.comment.post_id,
        this._textInput._lastNativeText,
        this.comment.id,
      );
      if (cmt.data) {
        if (Platform.OS === 'android') {
          ToastAndroid.show('Bình luận thành công', ToastAndroid.SHORT);
          this.props.user.data.point = this.props.user.data.point + cmt.data.point_increase;
          this.props.saveUserData(this.props.user.data);
        }
        this.setState({ content: '' });
        this.getSubComment();
        this.props.user.data.point = this.props.user.data.point + cmt.data.point_increase;
        this.props.saveUserData(this.props.user.data);
      } else {
        ToastAndroid.show('Bình luận thất bại', ToastAndroid.SHORT);
      }
      this.setState({ write: false }, () => {
        this._textInput.clear();
      });
      Keyboard.dismiss();
    } else Alert.alert('Thông báo', 'Vui lòng đăng nhập để sử dụng tính năng này');
  };

  onDeleteComment = (id) => {
    const { data } = this.state;

    const index = data.findIndex(item => item.id === id);
    if (index !== -1) data.splice(index, 1);
    this.setState({ data });
  };
  getSubComment = () => {
    getSubComment(this.comment.id).then((res) => {
      if (res.status === 200) {
        this.setState({ data: res.data.sub_comment });
      }
    });
  };

  getTime = () => {
    const createdAt = this.comment.created_at;
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
  handleCapture = (e) => {
    const focusField = TextInputState.currentlyFocusedField();
    const { target } = e.nativeEvent;
    if (focusField != null && target !== focusField) {
      if (target !== this._textInput) {
        Keyboard.dismiss();
      }
    }
  };

  likeComment = async () => {
    if (!this.state.isLiked) {
      const result = await likeComment(this.comment.id);
      console.log('like comment ', result);
      if (result.status === 200) {
        this.setState({ isLiked: true, like: this.state.like + 1 });
      }
    } else ToastAndroid.show('Đã thích', ToastAndroid.SHORT);
  };
  render() {
    const { navigation, item } = this.props;
    const {
      isLiked, write, like, data, content,
    } = this.state;

    return (
      <View
        style={{ flex: 1, backgroundColor: '#FFF' }}
        onStartShouldSetResponderCapture={this.handleCapture}
      >
        <WhiteHeader
          leftHeader={<Icons name="ios-arrow-back" size={35 * ratioW} color="#757575" />}
          onPressLeftHeader={() => navigation.goBack()}
          centerHeader={
            <Text style={{ fontFamily: Fonts.regular, fontSize: 16 * ratioW, color: '#000' }}>
              Chi tiết
            </Text>
          }
        />
        <KeyboardAwareScrollView
          resetScrollToCoords={{ x: 0, y: 0 }}
          contentContainerStyle={{ flex: 1 }}
          scrollEnabled={false}
        >
          <ScrollView style={{ flex: 1 }}>
            <View
              style={{
                width: '100%',
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  paddingTop: 10 * ratioH,
                  backgroundColor: '#fff',
                  paddingHorizontal: windowSize.width * 0.02,
                }}
              >
                <Image
                  source={{
                    uri:
                      (this.comment && this.comment.user.avatar) || 'https://picsum.photos/200/200',
                  }}
                  style={{
                    width: 30 * ratioH,
                    height: 30 * ratioH,
                    borderRadius: 5 * ratioH,
                    marginRight: 10 * ratioW,
                  }}
                />
                <View style={{ width: '100%' }}>
                  <Text
                    style={{
                      fontSize: 16 * ratioW,
                      color: '#000',
                      marginBottom: 10 * ratioH,
                      width: '90%',
                      fontFamily: Fonts.regular,
                    }}
                  >
                    {this.comment.content}
                    <Text
                      style={{ fontFamily: Fonts.regular, fontSize: 12 * ratioW, color: '#BDBDBD' }}
                    >
                      {' • '}
                      {(this.comment.user && this.comment.user.full_name) || 'Chim sẻ đi nắng'}
                      {' • '}
                      {this.getTime()}
                    </Text>
                  </Text>
                  <View style={{ flexDirection: 'row', marginTop: 10 * ratioH }}>
                    <TouchableOpacity onPress={() => this._textInput.focus()}>
                      <Text style={styles.replyCommentStyle}>
                        {this.comment.reply === 0 ? `${this.comment.reply} câu trả lời` : 'Trả lời'}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.onLike} style={{ flexDirection: 'row' }}>
                      <Text
                        style={{
                          color: isLiked ? '#C21E2B' : '#BDBDBD',
                          fontSize: 12 * ratioW,
                          marginRight: 5 * ratioW,
                          fontFamily: Fonts.regular,
                        }}
                      >
                        Thích
                      </Text>
                      <IconSimple
                        name="heart"
                        size={12 * ratioW}
                        color={isLiked ? '#C21E2B' : '#BDBDBD'}
                        style={{ marginTop: 3 * ratioH }}
                      />
                      <Text
                        style={{
                          color: isLiked ? '#C21E2B' : '#BDBDBD',
                          fontSize: 12 * ratioW,
                          marginLeft: 5 * ratioW,
                          fontFamily: Fonts.regular,
                        }}
                      >
                        {like}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <FlatList
                style={{
                  // padding: windowSize.width * 0.02,
                  backgroundColor: '#fff',
                  paddingLeft: windowSize.width * 0.02 + 60 * ratioW,
                  paddingTop: 10 * ratioH,
                  paddingRight: windowSize.width * 0.02,
                }}
                data={data}
                renderItem={({ item }) => (
                  <Comment
                    sub
                    canDelete={item.user_id === this.props.user.data.id}
                    comment={item}
                    onDelete={this.onDeleteComment}
                    navigation={this.props.navigation}
                  />
                )}
                keyExtractor={(item, index) => index.toString()}
                showsHorizontalScrollIndicator={false}
              />
            </View>
          </ScrollView>
          <View style={styles.footerContainer}>
            <View style={styles.comment}>
              <View style={styles.textInput}>
                <IconSimple
                  name="pencil"
                  size={18 * ratioW}
                  color="gray"
                  style={styles.commentInputTextIconStyle}
                />
                <TextInput
                  ref={(ref) => {
                    this._textInput = ref;
                  }}
                  value={content}
                  onChangeText={value => this.setState({ content: value })}
                  onBlur={() => {
                    if (!content) this.setState({ write: false });
                  }}
                  underlineColorAndroid="transparent"
                  style={{ flex: 1, padding: 0, justifyContent: 'center' }}
                  placeholder="Viết bình luận..."
                  placeholderTextColor="gray"
                  onFocus={() => this.setState({ write: true })}
                  autoCorrect={false}
                />
              </View>
              {write ? (
                <TouchableOpacity style={styles.sentContainer} onPress={this.onComment}>
                  <Text
                    style={{
                      fontFamily: Fonts.regular,
                      margin: 5,
                      color: '#fff',
                      fontSize: 12 * ratioW,
                    }}
                  >
                    Gửi
                  </Text>
                </TouchableOpacity>
              ) : (
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity
                    style={styles.commentContainer}
                    onPress={() => {
                      // this.scrollView.scrollTo({ x: 0, y: this.commentLayout, animated: true });
                    }}
                  >
                    {comment.length > 0 && (
                      <View style={styles.commentQuantity}>
                        <Text style={styles.cmt}>{data.length}</Text>
                      </View>
                    )}
                    <IconSimple name="bubble" size={18 * ratioW} color="gray" />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

CommentDetail.propTypes = {
  saveUserData: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  user: state.saveUserReducers,
});
const mapDispatchToProps = dispatch => ({
  saveUserData: data => dispatch(saveUserData(data)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CommentDetail);
