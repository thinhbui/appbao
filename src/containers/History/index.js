import React, { PureComponent } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  FlatList,
  Alert,
  ToastAndroid,
  RefreshControl,
  Platform,
} from 'react-native';
import { debounce } from 'lodash';

import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { WhiteHeader } from '../../components';
import * as d from '../../utilities/transform';
import NewsItems from '../News/NewsItems';
import { getHistory, reportPost } from '../../services/newsAPI';
import ModalReport from '../News/ModalReport';
import { Fonts } from '../../constants';

class History extends PureComponent {
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
    };
    this.data = [];
    this.getHistory = debounce(this.getHistory, 100);
    this.loadMore = debounce(this.loadMore, 100);
    this.onEndReachedCalledDuringMomentum = Platform.OS === 'android';
  }
  componentDidMount() {
    this.getHistory();
  }
  onOpenModalReport = (reportTitle, reportImage, id) => {
    this.setState({
      visible: true,
      reportTitle,
      reportImage,
      id,
    });
  };
  onCloseModal = () => this.setState({ visible: false });
  getHistory = () => {
    const { page, refreshing } = this.state;
    if (!refreshing) {
      this.setState({ refreshing: true });

      getHistory(page)
        .then((res) => {
          console.log('history', res);

          if (res.status === 200) {
            this.setState({ refreshing: false, data: res.data.data });
          } else this.setState({ refreshing: false, page: 1 });
        })
        .catch((err) => {
          console.log('get news error ', err);
          Alert.alert('Thông báo', 'Lỗi! Vui lòng khởi động lại ứng dụng');
          this.setState({ refreshing: false });
        });
    }
  };
  loadMore = () => {
    const { page, refreshing, data } = this.state;
    if (!refreshing && this.onEndReachedCalledDuringMomentum) {
      this.setState({ refreshing: true });
      getHistory(page + 1)
        .then((res) => {
          if (res.status === 200) {
            this.setState({ data: [...data, ...res.data.data], refreshing: false, page: page + 1 });
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
  renderItem = ({ item }) => (
    <NewsItems
      item={{ ...item.post, post_image: [item.post.image] }}
      user={this.props.user}
      onReport={() => this.onOpenModalReport(item.post.title, item.post.image, item.post_id)}
    />
  );
  render() {
    const { navigation, user } = this.props;
    const {
      visible, reportTitle, reportImage, refreshing, id, data,
    } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: '#FFF' }}>
        <WhiteHeader
          leftHeader={<Icon name="ios-arrow-back" size={35 * d.ratioW} color="#757575" />}
          centerHeader={
            <Text style={{ fontFamily: Fonts.regular, fontSize: 16 * d.ratioW, color: '#000' }}>
              Lịch sử
            </Text>
          }
          onPressLeftHeader={() => navigation.goBack()}
        />
        {!user.data ? (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontFamily: Fonts.regular, fontSize: 16 * d.ratioW, color: '#000' }}>
              Bạn cần đăng nhập để sử dụng tính năng này
            </Text>
          </View>
        ) : (
          <View>
            <FlatList
              style={{ marginBottom: 50 * d.ratioH }}
              removeClippedSubviews
              data={data}
              extraData={this.state}
              renderItem={this.renderItem}
              keyExtractor={(item, index) => index.toString()}
              refreshing={refreshing}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  tintColor="#C21E2B"
                  colors={['#C21E2B']}
                  onRefresh={this.getNews}
                />
              }
              onEndReached={this.loadMore}
              onEndReachedThreshold={data.length > 10 ? 0.2 : -1}
              onMomentumScrollBegin={() => {
                this.onEndReachedCalledDuringMomentum = true;
              }}
            />
          </View>
        )}
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
      </View>
    );
  }
}

History.propTypes = {
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
)(History);
