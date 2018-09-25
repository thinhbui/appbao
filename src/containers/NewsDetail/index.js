import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  TextInput,
  Animated,
  FlatList,
  Keyboard,
  ActivityIndicator,
  ToastAndroid,
  Alert,
} from 'react-native';
import { ShareDialog } from 'react-native-fbsdk';
import moment from 'moment';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import ViewOverflow from 'react-native-view-overflow';
import PropTypes from 'prop-types';
import TextInputState from 'react-native/lib/TextInputState';
import Icon from 'react-native-vector-icons/Feather';
import Icons from 'react-native-vector-icons/SimpleLineIcons';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import HTMLView from 'react-native-htmlview';
import { saveUserData, changeFontSize } from '../../actions';
import { WhiteHeader } from '../../components';
import styles from './styles';
import Comment from '../../components/Comment';
import * as d from '../../utilities/transform';
import {
  getNewsDetail,
  getComment,
  comment,
  like,
  follow,
  getFollow,
  getHotNews,
} from '../../services/newsAPI';
import AutoHeightWebView from './AutoHeightWebView';
import Suggestion from '../../components/Suggestion';
import ModalLogIn from './ModalLogIn';
import ModalFont from './ModalFont';
import { Fonts } from '../../constants';

class NewsDetail extends Component {
  constructor(props) {
    super(props);
    this.item = props.navigation.getParam('item', '');
    this.title = props.navigation.getParam('title', '');
    this.state = {
      loading: true,
      write: false,
      news: {},
      comment: [],
      isLiked: false,
      visible: false,
      fontVisible: false,
      headerVisible: false,
      follow: false,
      content: '',
      fontContent: this.props.fontSizeRedux.data,
      hotNews: [],
    };
    console.log(props.user);
  }
  componentDidMount() {
    this.getNewDetail();
    this.getHotNews();
    this.animatedIsPress = new Animated.Value(0);
    console.log(this.props.fontSizeRedux, 16 * d.ratioW);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.fontSizeRedux !== this.props.fontSizeRedux) {
      this.setState({ fontContent: nextProps.fontSizeRedux.data });
    }
  }

  onOpenModal = () => this.setState({ visible: true });
  onCloseModal = () => this.setState({ visible: false });

  onOpenFontModal = () => this.setState({ fontVisible: true });
  onCloseFontModal = () => this.setState({ fontVisible: false });

  onShare = async () => {
    const { news } = this.state;
    if (Object.keys(this.props.user.data).length !== 0) {
      if (this.props.user.data.name.split('_')[0] === 'facebook') {
        const shareLinkContent = {
          contentType: 'link',
          contentUrl: `https://vntimes.app/${news.slug}/c/${news.id}.html`,
          contentDescription: 'Wow, check out this great site!',
        };
        try {
          const canShow = await ShareDialog.canShow(shareLinkContent);
          console.log(canShow);
          let result = '';
          if (canShow) {
            result = await ShareDialog.show(shareLinkContent);
            console.log(result);
            if (result.isCancelled) {
              Alert.alert('KHÔNG THÀNH CÔNG', 'Bạn đã huỷ chia sẻ bài viết này.');
            } else if (Platform.OS === 'android') {
              ToastAndroid.show('Chia sẻ thành công', ToastAndroid.SHORT);
            } else {
              Alert.alert(
                'THÀNH CÔNG',
                'Bạn đã chia sẻ thành công bài viết này lên trang Facebook cá nhân.',
              );
            }
          } else {
            Alert.alert('KHÔNG THÀNH CÔNG', 'Đã có lỗi xảy ra, bạn vui lòng thử lại sau.');
          }
        } catch (error) {
          console.log('SHARE ERROR ', error);
          Alert.alert('KHÔNG THÀNH CÔNG', 'Chia sẻ không thành công, bạn vui lòng thử lại sau.');
        }
      } else {
        Alert.alert('KHÔNG THÀNH CÔNG', 'Tính năng này chỉ thích hợp với các tài khoản Facebook');
      }
    } else {
      this.onOpenModal();
    }
  };

  onComment = async () => {
    const { news } = this.state;
    if (Object.keys(this.props.user.data).length !== 0) {
      const cmt = await comment(news.id, this._textInput._lastNativeText);
      const commentRes = await getComment(this.item.id);
      // console.log('comment', cmt);

      if (cmt.data) {
        if (Platform.OS === 'android') {
          ToastAndroid.show('Bình luận thành công', ToastAndroid.SHORT);
        }
        this.setState({
          comment: commentRes.data.data.filter(item => item.parent_id === null),
          content: '',
        });
        this.props.user.data.point = this.props.user.data.point + cmt.data.point_increase;
        this.props.saveUserData(this.props.user.data);
      } else {
        ToastAndroid.show('Bình luận thất bại', ToastAndroid.SHORT);
      }
      this.setState({ write: false, news }, () => {
        this._textInput.clear();
        console.log('this.state.comment', this.state.comment);
      });
      Keyboard.dismiss();
    } else {
      this.onOpenModal();
    }
  };
  onLike = () => {
    const { news } = this.state;
    if (Object.keys(this.props.user.data).length !== 0) {
      if (!this.state.isLiked) {
        like(this.item.id).then((res) => {
          if (res.status === 200) {
            if (Platform.OS === 'android') ToastAndroid.show('Đã thích', ToastAndroid.SHORT);
            this.likeAnimation();
            this.setState({ isLiked: true });
            this.props.user.data.point = this.props.user.data.point + res.data.point_increase;
            this.props.saveUserData(this.props.user.data);
          }
          this.setState({ news });
        });
      }
    } else {
      this.onOpenModal();
    }
  };

  onGoBack = () => {
    const { navigation } = this.props;
    navigation.goBack();
  };
  onDeleteComment = (id) => {
    const { comment } = this.state;

    const index = comment.findIndex(item => item.id === id);
    if (index !== -1) comment.splice(index, 1);
    this.setState({ comment });
  };
  onSuggestPress = (item) => {
    this.props.navigation.goBack();
    this.props.navigation.navigate('NewsDetail', { item });
  };
  onFollow = async (id) => {
    if (Object.keys(this.props.user.data).length !== 0) {
      const result = await follow(id);
      if (result.status === 200) {
        this.setState({ follow: !this.state.follow });
      }
    } else {
      this.onOpenModal();
    }
  };
  getNewDetail = async () => {
    const res = await getNewsDetail(this.item.id, this.props.user.data.id || '');
    const commentRes = await getComment(this.item.id);
    if (res.status === 200 && commentRes.status === 200) {
      this.setState(
        {
          news: res.data,
          comment: commentRes.data.data.filter(item => item.parent_id === null),
          loading: false,
        },
        () => {
          this.setState({
            isLiked:
              Object.keys(this.props.user.data).length !== 0
                ? this.state.news.post_like.findIndex(item => item.user_id === this.props.user.data.id) !== -1
                : false,
          });
        },
      );
      if (Object.keys(this.props.user.data).length !== 0) {
        const followRes = await getFollow();
        if (followRes.status === 200) {
          this.setState({
            follow:
              followRes.data.findIndex(item => item.follow_to === res.data.crawl_frame.id) !== -1,
          });
        }
      }
    } else {
      Alert.alert('KHÔNG THÀNH CÔNG', 'Đã có lỗi xảy ra, bạn vui lòng thử lại sau');
    }
  };

  getHotNews = async () => {
    const result = await getHotNews();
    if (result.status === 200) {
      this.setState({ hotNews: [...result.data] });
    }
  };

  getTime = () => {
    const createdAt = this.state.news.created_at;
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
    return `${moment(now, 'YYYY-MM-DD HH:mm:ss').diff(createdAt, 'days')} ngày`;
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

  likeAnimation = () => {
    Animated.timing(this.animatedIsPress, {
      toValue: 0,
      duration: 200,
    }).start(() => {
      Animated.timing(this.animatedIsPress, {
        toValue: 1,
        duration: 500,
      }).start(() => {
        Animated.timing(this.animatedIsPress, {
          toValue: 0,
          duration: 300,
        }).start();
      });
    });
  };

  likeAnimationView = () => {
    const animationStyle = {
      opacity: this.animatedIsPress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
      }),
      top: this.animatedIsPress.interpolate({
        inputRange: [0, 1],
        outputRange: [5 * d.ratioW, -10 * d.ratioH],
      }),
    };
    return (
      <Animated.View style={animationStyle}>
        <Text
          style={{
            fontSize: 14 * d.ratioW,
            color: '#C21E2B',
            fontFamily: Fonts.regular,
          }}
        >
          +1
        </Text>
      </Animated.View>
    );
  };

  render() {
    const {
      type, navigation, title, user,
    } = this.props;
    const {
      loading,
      write,
      news,
      comment,
      isLiked,
      visible,
      headerVisible,
      follow,
      content,
      fontVisible,
      fontContent,
      hotNews,
    } = this.state;
    console.log(news);

    const titleStyles = {
      p: [
        styles.titleTextStyle,
        {
          fontSize: 20 * d.ratioW,
          fontFamily: Fonts.regular,
        },
      ],
    };
    return (
      <View style={{ flex: 1 }} onStartShouldSetResponderCapture={this.handleCapture}>
        <WhiteHeader
          leftHeader={
            <Icon
              name="chevron-left"
              size={35 * d.ratioW}
              color="#757575"
              style={{ left: -10 * d.ratioW }}
            />
          }
          onPressLeftHeader={this.onGoBack}
          centerHeader={
            headerVisible ? (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  left: -10 * d.ratioW,
                  width: '90%',
                  alignItems: 'center',
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image source={{ uri: 'https://picsum.photos/30/30' }} style={styles.avatar} />
                  <Text
                    style={[
                      styles.userNameStyle,
                      {
                        fontSize: 16 * d.ratioW,
                        fontFamily: Fonts.regular,
                        marginTop: 5 * d.ratioH,
                      },
                    ]}
                  >
                    {news.crawl_frame.name} • {this.getTime()}
                  </Text>
                </View>
                <TouchableOpacity
                  style={[styles.subscribe, { borderColor: follow ? '#BDBDBD' : '#C21E2B' }]}
                  onPress={() => this.onFollow(news.crawl_frame.id)}
                >
                  <Text
                    style={{
                      color: follow ? '#BDBDBD' : '#C21E2B',
                      fontSize: 12 * d.ratioW,
                      fontFamily: Fonts.regular,
                    }}
                  >
                    {follow ? 'Đã theo dõi' : 'Theo dõi'}
                  </Text>
                </TouchableOpacity>
              </View>
            ) : null
          }
          rightHeader={<IconMaterial name="format-annotation-plus" size={30 * d.ratioW} />}
          onPressRightHeader={() => this.onOpenFontModal()}
        />
        {loading ? (
          <ActivityIndicator color="#C21E2B" size="large" />
        ) : (
          <View style={{ flex: 1 }}>
            <KeyboardAwareScrollView
              resetScrollToCoords={{ x: 0, y: 0 }}
              contentContainerStyle={{ flex: 1 }}
              scrollEnabled={false}
            >
              <View style={styles.contentContainer}>
                <ScrollView
                  style={styles.scrollview}
                  keyboardShouldPersistTaps="always"
                  onScroll={(e) => {
                    if (e.nativeEvent.contentOffset.y > this.header) {
                      if (!headerVisible) this.setState({ headerVisible: true });
                    } else if (headerVisible) {
                      this.setState({ headerVisible: false });
                    }
                  }}
                  ref={(ref) => {
                    this.scrollView = ref;
                  }}
                  scrollEventThrottle={100}
                  showsVerticalScrollIndicator={false}
                >
                  <View style={styles.titleContainer}>
                    <HTMLView value={`<p>${news.title}</p>`} stylesheet={titleStyles} />
                    <View
                      style={styles.avatarContainer}
                      onLayout={(e) => {
                        this.header = e.nativeEvent.layout.y + e.nativeEvent.layout.height;
                      }}
                    >
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image
                          source={{ uri: 'https://picsum.photos/30/30' }}
                          style={styles.avatar}
                        />
                        <View>
                          <Text
                            style={[
                              styles.userNameStyle,
                              {
                                fontSize: 16 * d.ratioW,
                                fontFamily: Fonts.regular,
                                marginTop: Platform.OS === 'ios' ? 5 * d.ratioH : null,
                              },
                            ]}
                          >
                            {news.crawl_frame.name} • {this.getTime()}
                          </Text>
                        </View>
                      </View>
                      <TouchableOpacity
                        style={[styles.subscribe, { borderColor: follow ? '#BDBDBD' : '#C21E2B' }]}
                        onPress={() => this.onFollow(news.crawl_frame.id)}
                      >
                        <Text
                          style={{
                            color: follow ? '#BDBDBD' : '#C21E2B',
                            fontSize: 12 * d.ratioW,
                            fontFamily: Fonts.regular,
                          }}
                        >
                          {follow ? 'Đã theo dõi' : 'Theo dõi'}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <AutoHeightWebView html={news.content} fontSize={fontContent} />
                  <View style={styles.likeShareContainer}>
                    <View style={{ alignItems: 'center' }}>
                      {this.likeAnimationView()}
                      <TouchableOpacity
                        style={[
                          styles.likeContainer,
                          { borderColor: isLiked ? '#C21E2B' : 'gray' },
                        ]}
                        onPress={this.onLike}
                      >
                        <Icons
                          name="like"
                          size={22 * d.ratioW}
                          color={isLiked ? '#C21E2B' : 'gray'}
                        />
                      </TouchableOpacity>
                    </View>
                    <View style={{ width: 30 * d.ratioW }} />
                    <TouchableOpacity style={styles.shareContainer} onPress={this.onShare}>
                      <Icons name="social-facebook" size={22 * d.ratioW} color="gray" />
                    </TouchableOpacity>
                  </View>
                  <View>
                    <View style={styles.suggestionContainer}>
                      <View style={styles.customLineStyle} />
                      <View style={{ backgroundColor: '#fff', position: 'absolute' }}>
                        <Text style={{ fontFamily: Fonts.regular, margin: 5 }}>Đề xuất hay</Text>
                      </View>
                    </View>
                    <FlatList
                      data={news.relate && news.relate[0].post !== null ? news.relate : hotNews}
                      renderItem={({ item }) => {
                        if (item.post && item.relationship_id) {
                          return (
                            <Suggestion
                              item={item.post}
                              onPress={() => this.onSuggestPress(item.post)}
                            />
                          );
                        }
                        return <Suggestion item={item} onPress={() => this.onSuggestPress(item)} />;
                      }}
                      keyExtractor={item => `${item.id}`}
                      style={{ width: '100%' }}
                    />
                  </View>
                  <View style={styles.suggestionContainer}>
                    <View style={styles.customLineStyle} />
                    <View style={{ backgroundColor: '#fff', position: 'absolute' }}>
                      <Text style={{ fontFamily: Fonts.regular, margin: 5 }}>
                        Bình luận
                      </Text>
                    </View>
                  </View>
                  {comment.length === 0 && (
                    <View
                      style={{ width: '100%', alignItems: 'center', marginBottom: 15 * d.ratioH }}
                    >
                      <Text style={{ fontFamily: Fonts.regular }}>Chưa có bình luận nào</Text>
                    </View>
                  )}
                  <FlatList
                    onLayout={(e) => {
                      this.commentLayout = e.nativeEvent.layout.y;
                    }}
                    data={comment}
                    extraData={this.state}
                    renderItem={({ item }) => (
                      <Comment
                        block
                        canDelete={item.user_id === user.data.id}
                        comment={item}
                        navigation={this.props.navigation}
                        onPress={() => this.props.navigation.navigate('CommentDetail', { item })}
                        onDelete={this.onDeleteComment}
                      />
                    )}
                    keyExtractor={(item, index) => index.toString()}
                    style={{ marginBottom: 15 * d.ratioH }}
                  />
                </ScrollView>
              </View>
              <View style={styles.footerContainer}>
                <View style={styles.comment}>
                  <View style={styles.textInput}>
                    <Icons
                      name="pencil"
                      size={18 * d.ratioW}
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
                      style={{
                        fontFamily: Fonts.regular,
                        flex: 1,
                        padding: 0,
                        justifyContent: 'center',
                      }}
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
                          margin: 5,
                          color: '#fff',
                          fontSize: 14 * d.ratioW,
                          fontFamily: Fonts.regular,
                        }}
                      >
                        Gửi
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <View style={{ flexDirection: 'row' }}>
                      <TouchableOpacity
                        style={styles.commentContainer1}
                        onPress={() => {
                          this.scrollView.scrollTo({ x: 0, y: this.commentLayout, animated: true });
                        }}
                      >
                        {comment.length > 0 && (
                          <View style={styles.commentQuantity}>
                            <Text style={styles.cmt}>{comment.length}</Text>
                          </View>
                        )}
                        <Icons name="bubble" size={18} color="gray" />
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.commentContainer} onPress={this.onShare}>
                        <Icons
                          name="share-alt"
                          size={18}
                          color="gray"
                          style={{ bottom: 1 * d.ratioH, marginRight: 5 * d.ratioW }}
                        />
                        <Text style={styles.itemText}>Chia sẻ</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              </View>
            </KeyboardAwareScrollView>
          </View>
        )}
        <ModalLogIn
          visible={visible}
          onRef={(ref) => {
            this.modal = ref;
          }}
          onClose={this.onCloseModal}
          onLogIn={() => this.modal.close()}
          onShow={() => this.modal.open()}
        />
        <ModalFont
          visible={fontVisible}
          onRef={(ref) => {
            this.modalFont = ref;
          }}
          onClose={this.onCloseFontModal}
          onShow={() => this.modalFont.open()}
          // onChangeFontSize={value => this.props.changeFontSize(value)}
        />
      </View>
    );
  }
}

NewsDetail.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    getParam: PropTypes.func,
  }).isRequired,
  user: PropTypes.object.isRequired,
  saveUserData: PropTypes.func.isRequired,
  changeFontSize: PropTypes.func.isRequired,
  fontSizeRedux: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  user: state.saveUserReducers,
  fontSizeRedux: state.changeFontSizeReducer,
});

const mapDispatchToProps = dispatch => ({
  saveUserData: data => dispatch(saveUserData(data)),
  changeFontSize: data => dispatch(changeFontSize(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewsDetail);
