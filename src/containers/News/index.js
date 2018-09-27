import React, { PureComponent } from 'react';
import {
  View,
  FlatList,
  RefreshControl,
  Alert,
  Image,
  Text,
  TouchableOpacity,
  Platform,
  ToastAndroid,
  ScrollView,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { debounce } from 'lodash';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import moment from 'moment';
import NewsItems from './NewsItems';
import { getNewsByCategory, getAds, reportPost, getFrame, getVideos } from '../../services/newsAPI';
import videoData from './videoData';
import * as d from '../../utilities/transform';
import ModalReport from './ModalReport';
import ModalLogIn from '../NewsDetail/ModalLogIn';
import styles from './styles';
import { Fonts } from '../../constants';
import { getFollowApi } from '../../actions';

const ITEM_HEIGHT = d.windowSize.height * 0.245 + 50 * d.ratioH;

class News extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      refreshing: false,
      page: 1,
      visible: false,
      reportTitle: '',
      reportImage: '',
      id: '',
      done: false,
      pageSlug: '',
      pageId: 0,
    };
    this.data = [];
    this.adsIndex = this.getRandomInt(4) + 6;
    this.getNews = debounce(this.getNews, 100);
    this.loadMore = debounce(this.loadMore, 100);
    this.onEndReachedCalledDuringMomentum = Platform.OS === 'android';
  }
  componentDidMount() {
    if (this.props.isFocused) {
      this.getAds();
    }
  }

  componentWillReceiveProps(nextProps) {
    const { data } = this.state;
    if (nextProps.isFocused && data.length === 0) {
      if (nextProps.item.id === 123) {
        this.getFollow();
      } else {
        this.getAds();
      }
    }
  }

  onDeletePost = () => {
    const { id, data } = this.state;
    const index = data.findIndex(item => item.id === id);
    if (index !== -1) {
      data.splice(index, 1);
      this.setState({ data });
    }
  };
  onOpenModal = () => {
    this.setState({ visible: true });
  };
  onOpenModalReport = (reportTitle, reportImage, id) => {
    this.setState({
      visible: true,
      reportTitle,
      reportImage,
      id,
    });
  };
  onCloseModal = () => this.setState({ visible: false });

  onRenderFollowPost = () => {
    if (!this.props.user.data.id) {
      return (
        <View style={styles.warningContainer}>
          <Text style={styles.warningTextStyle}>Bạn chưa đăng nhập</Text>
        </View>
      );
    } else if (Object.keys(this.props.getFollow.data).length !== 0) {
      return (
        <View style={{ flex: 1 }}>
          <View style={styles.followTabBar}>
            <Icon name="chevron-right" size={30 * d.ratioW} color="#C21E2B" />
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {this.props.getFollow.data &&
                this.props.getFollow.data.map((e, i) => (
                  <TouchableOpacity key={i.toString()} onPress={() => this.setPageSlug(i)}>
                    <Image
                      source={{ uri: e.avatar || 'https://picsum.photos/200/200' }}
                      style={[
                        styles.frameAvatarStyle,
                        {
                          borderWidth: 1.5 * d.ratioH,
                          borderColor: this.state.pageId === i ? '#C21E2B' : 'transparent',
                        },
                      ]}
                    />
                  </TouchableOpacity>
                ))}
            </ScrollView>
          </View>
          <FlatList
            removeClippedSubviews
            data={this.state.data}
            extraData={this.state}
            renderItem={({ item }) => (
              <NewsItems
                item={item}
                user={this.props.user}
                onReport={() => this.onOpenModalReport(item.title, item.image, item.id)}
              />
            )}
            keyExtractor={item => item.id.toString()}
            getItemLayout={this.getItemLayout}
            refreshing={this.state.refreshing}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                tintColor="#C21E2B"
                colors={['#C21E2B']}
                onRefresh={() => this.getNewsFollow(this.state.pageSlug)}
              />
            }
            onEndReached={() => this.loadMoreNewsFollow(this.state.pageSlug)}
            onEndReachedThreshold={0.2}
            onMomentumScrollBegin={() => {
              this.onEndReachedCalledDuringMomentum = true;
            }}
          />
        </View>
      );
    }
    return (
      <View style={styles.warningContainer}>
        <Text style={styles.warningTextStyle}>Chưa theo dõi nguồn nào</Text>
      </View>
    );
  };

  getItemLayout = (data, index) => ({ length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index });

  getAds = async () => {
    const result = await getAds();
    if (result.status === 200) {
      this.ads = result.data[0].child;
    } else this.ads = [];

    this.getNews();
  };

  setPageSlug = (index) => {
    this.setState({ pageSlug: this.props.getFollow.data[index].follow.slug, pageId: index }, () => {
      this.setState({ data: [] }, () => {
        this.getNewsFollow(this.state.pageSlug);
      });
    });
  };

  getRandomInt = max => Math.round(Math.random() * Math.floor(max));
  getNewsFollow = async (id) => {
    const { page, refreshing } = this.state;
    if (!refreshing) {
      this.setState({ refreshing: true });
      try {
        const result = await getFrame(id, page);
        console.log('NEWS FOLLOW', result);
        if (result.status === 200) {
          this.setState({
            data: result.data.data,
            refreshing: false,
            page: 1,
            done: true,
          });
        } else {
          this.setState({ done: true, refreshing: false, page: 1 });
        }
      } catch (error) {
        Alert.alert('Thông báo', 'Lỗi! Vui lòng khởi động lại ứng dụng');
        this.setState({ refreshing: false, done: true });
      }
    }
  };

  getFollow = async () => {
    if (this.props.user.data.id) {
      await this.props.getFollowApi();
      await this.setState({ pageSlug: this.props.getFollow.data[this.state.pageId].follow.slug });
      await this.getNewsFollow(this.state.pageSlug);
    }
  };

  getNews = async () => {
    const { page, refreshing } = this.state;
    console.log('getNews', this.props.item);

    if (!refreshing) {
      this.setState({ refreshing: true });
      if (this.props.item.id === 11) {
        const result = await getVideos(page);
        console.log(result);

        if (result.status === 200) this.setState({ data: result.data.data, refreshing: false });
        // this.setState({ data: videoData.items, refreshing: false, done: true });
        // else this.setState({ refreshing: false, done: true });
      } else {
        this.random = this.getRandomInt(4) + 6;
        getNewsByCategory(this.props.item.id, page, this.props.user.data.id)
          .then((res) => {
            if (res.status === 200) {
              console.log('getNewsByCategory', res.data);
              const data = [...res.data.data];
              if (this.ads.length >= page && data.length > 0) {
                data.splice(this.random, 0, { ...this.ads[page - 1] });
              }
              this.setState({ data: null }, () => {
                this.setState({
                  data,
                  refreshing: false,
                  page: 1,
                  done: true,
                });
              });
            } else this.setState({ refreshing: false, page: 1, done: true });
          })
          .catch((err) => {
            console.log('get news error ', err);
            Alert.alert('Thông báo', 'Lỗi! Vui lòng khởi động lại ứng dụng');
            this.setState({ refreshing: false, done: true });
          });
      }
    }
  };

  getTime = (item) => {
    const createdAt = item.created_at;
    const now = moment().format('YYYY-MM-DD HH:mm:ss');
    const duration = moment(now, 'YYYY-MM-DD HH:mm:ss').diff(createdAt, 'seconds');
    const minute = 3600;
    const hour = 86400;
    if (duration < 60) {
      return ` • ${moment(now, 'YYYY-MM-DD HH:mm:ss').diff(createdAt, 'seconds')} giây`;
    } else if (duration < minute) {
      return ` • ${moment(now, 'YYYY-MM-DD HH:mm:ss').diff(createdAt, 'minutes')} phút`;
    } else if (duration > minute && duration < hour) {
      return ` • ${moment(now, 'YYYY-MM-DD HH:mm:ss').diff(createdAt, 'hours')} giờ`;
    }
    return ` • ${moment(now, 'YYYY-MM-DD HH:mm:ss').diff(createdAt, 'days')} ngày`;
  };

  loadMoreNewsFollow = async (id) => {
    const { page, refreshing, data } = this.state;
    if (!refreshing && this.onEndReachedCalledDuringMomentum) {
      this.setState({ refreshing: true });
      try {
        const result = await getFrame(id, page + 1);
        console.log('NEWS FOLLOW LOAD MORE', result);
        if (result.status === 200) {
          this.setState({
            data: [...data, ...result.data.data],
            refreshing: false,
            page: page + 1,
          });
        } else {
          this.setState({ refreshing: false });
        }
      } catch (error) {
        Alert.alert('Thông báo', 'Lỗi! Vui lòng khởi động lại ứng dụng');
        this.setState({ refreshing: false });
      }
      this.onEndReachedCalledDuringMomentum = Platform.OS === 'android';
    }
  };

  loadMore = () => {
    const { page, refreshing, data } = this.state;
    console.log('loadMore');

    if (!refreshing && this.onEndReachedCalledDuringMomentum) {
      this.setState({ refreshing: true });
      getNewsByCategory(this.props.item.id, page + 1, this.props.user.data.id)
        .then((res) => {
          if (res.status === 200) {
            const dataRes = [...res.data.data];
            if (this.ads.length >= page) {
              dataRes.splice(this.random, 0, { ...this.ads[page - 1] });
            }
            this.setState({ data: [...data, ...dataRes], refreshing: false, page: page + 1 });
          } else this.setState({ refreshing: false });
        })
        .catch((err) => {
          Alert.alert('LỖI TẢI MỚI DỮ LIỆU', 'Lỗi! Vui lòng khởi động lại ứng dụng');
          console.log('load more', err);
          this.setState({ refreshing: false });
        });
      this.onEndReachedCalledDuringMomentum = Platform.OS === 'android';
    }
  };

  renderItem = ({ item, index }) => {
    if (!item.youtube) {
      return (
        <View>
          <NewsItems
            item={item}
            tabId={this.props.item.id}
            index={index}
            user={this.props.user}
            onReport={() => this.onOpenModalReport(item.title, item.image, item.id)}
          />
        </View>
      );
    }
    return (
      <TouchableOpacity
        style={styles.videoContainer}
        activeOpacity={1}
        onPress={() => this.props.navigation.navigate('VideoDetail', { item: this.state.data })}
      >
        <View>
          <Image
            source={{
              uri: item.image || 'https://picsum.photos/200/200',
            }}
            style={styles.imageVideo}
          />
          <Icon name="play" size={35 * d.ratioW} color="#FFF" style={styles.playButton} />
        </View>
        <Text style={styles.titleSnippet}>{item.title}</Text>
        <View style={styles.infoContainer}>
          <Text style={{ fontFamily: Fonts.regular, fontSize: 11 * d.ratioW, color: '#BDBDBD' }}>
            {item.crawl_frame ? item.crawl_frame.name : ''}
            {this.getTime(item)}
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <Icon
              name="message-square"
              size={15 * d.ratioW}
              color="#BDBDBD"
              style={{ marginLeft: 25 * d.ratioW }}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const { type } = this.props;
    const {
      data, refreshing, visible, reportImage, reportTitle, id, done,
    } = this.state;

    return (
      <View style={styles.container}>
        {this.props.item.id === 123 ? (
          this.onRenderFollowPost()
        ) : (
          <FlatList
            removeClippedSubviews
            data={data}
            extraData={this.state}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => `${item.id}${index}`}
            refreshing={refreshing}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                tintColor="#C21E2B"
                colors={['#C21E2B']}
                onRefresh={this.getNews}
              />
            }
            getItemLayout={this.getItemLayout}
            onEndReached={this.loadMore}
            onEndReachedThreshold={0.3}
            onMomentumScrollBegin={() => {
              this.onEndReachedCalledDuringMomentum = true;
            }}
          />
        )}

        {data &&
          data.length === 0 &&
          done &&
          !refreshing && (
            <View style={{ height: d.windowSize.height * 0.8, alignItems: 'center' }}>
              <Text style={{ fontFamily: Fonts.regular, color: '#000', fontSize: 18 }}>
                Chưa có bài viết nào
              </Text>
            </View>
          )}
        {Object.keys(this.props.user.data).length !== 0 ? (
          <ModalReport
            visible={visible}
            onRef={(ref) => {
              this.modal = ref;
            }}
            onClose={this.onCloseModal}
            onAccept={async (dataReport) => {
              if (dataReport.length > 0) {
                const result = await reportPost(id, dataReport);
                if (result.status === 200) {
                  ToastAndroid.show('Báo cáo thành công', ToastAndroid.SHORT);
                  this.onDeletePost();
                }
                this.modal.close();
              }
            }}
            onShow={() => this.modal.open()}
            reportTitle={reportTitle}
            reportImage={reportImage}
            id={id}
          />
        ) : (
          <ModalLogIn
            visible={visible}
            onRef={(ref) => {
              this.modal = ref;
            }}
            onClose={this.onCloseModal}
            onLogIn={() => this.modal.close()}
            onShow={() => this.modal.open()}
          />
        )}
      </View>
    );
  }
}

News.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    isFocused: PropTypes.func,
  }).isRequired,
  user: PropTypes.object.isRequired,
  getFollowApi: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  // categories: state.categories,
  // news: state.news,
  user: state.saveUserReducers,
  getFollow: state.getFollowReducers,
});
const mapDispatchToProps = dispatch => ({
  // getNews: categoryId => dispatch(getNewsData(categoryId)),
  getFollowApi: () => dispatch(getFollowApi()),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNavigation(News));
