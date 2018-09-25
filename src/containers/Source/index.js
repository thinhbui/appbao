import React, { PureComponent } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  ToastAndroid,
  Platform,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { WhiteHeader } from '../../components';
import * as d from '../../utilities/transform';
import { follow, getFollow, reportPost, getFrame } from '../../services/newsAPI';
import ModalLogIn from '../NewsDetail/ModalLogIn';
import styles from './styles';
import NewsItems from '../News/NewsItems';
import ModalReport from '../News/ModalReport';

class Source extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      follow: false,
      visible: false,
      refreshing: false,
      reportTitle: '',
      reportImage: '',
      idPostReport: '',
      data: [],
    };
    this.item = props.navigation.getParam('item', {});
    this.onEndReachedCalledDuringMomentum = Platform.OS === 'android';
  }

  componentDidMount() {
    this.onCheckFollow();
    this.getNewsFollow(this.item.slug);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user !== this.props.user) {
      this.onCheckFollow();
    }
  }

  onDeletePost = () => {
    const { idPostReport, data } = this.state;
    const index = data.findIndex(item => item.id === idPostReport);
    if (index !== -1) {
      data.splice(index, 1);
      this.setState({ data });
    }
  };

  onOpenModal = () => this.setState({ visible: true });
  onCloseModal = () => this.setState({ visible: false });

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

  onCheckFollow = async () => {
    if (Object.keys(this.props.user.data).length !== 0) {
      const followRes = await getFollow();
      if (followRes.status === 200) {
        this.setState({
          follow: followRes.data.findIndex(item => item.follow_to === this.item.id) !== -1,
        });
      }
    }
  };

  onOpenModalReport = (reportTitle, reportImage, idPostReport) => {
    this.setState({
      visible: true,
      reportTitle,
      reportImage,
      idPostReport,
    });
  };

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
          });
        } else {
          this.setState({ refreshing: false, page: 1 });
        }
      } catch (error) {
        Alert.alert('Thông báo', 'Lỗi! Vui lòng khởi động lại ứng dụng');
        this.setState({ refreshing: false });
      }
    }
  };

  loadMoreNewsFollow = async (id) => {
    const { page, refreshing, data } = this.state;
    if (!refreshing && this.onEndReachedCalledDuringMomentum) {
      this.setState({ refreshing: true });
      try {
        const result = await getFrame(id, page + 1);
        // console.log('NEWS FOLLOW LOAD MORE', result);
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

  render() {
    const { navigation } = this.props;
    const {
      visible, follow, reportImage, reportTitle, idPostReport,
    } = this.state;
    return (
      <View style={styles.container}>
        <WhiteHeader
          leftHeader={<Icon name="ios-arrow-back" size={35 * d.ratioW} color="#757575" />}
          centerHeader={
            <View style={styles.centerHeaderContainer}>
              <View style={styles.sourceContentContainer}>
                <Image
                  source={{ uri: 'https://picsum.photos/200/200' }}
                  style={styles.sourceAvatarStyle}
                />
                <Text style={styles.sourceNameStyle}>{this.item.name}</Text>
              </View>
              <TouchableOpacity
                style={[
                  styles.followButtonContainer,
                  {
                    borderColor: follow ? '#BDBDBD' : '#C21E2B',
                  },
                ]}
                onPress={() => this.onFollow(this.item.id)}
              >
                <Text
                  style={[
                    styles.followButtonTextStyle,
                    {
                      color: follow ? '#BDBDBD' : '#C21E2B',
                    },
                  ]}
                >
                  {follow ? 'Đã theo dõi' : 'Theo dõi'}
                </Text>
              </TouchableOpacity>
            </View>
          }
          onPressLeftHeader={() => navigation.goBack()}
        />

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
          keyExtractor={item => item.id}
          refreshing={this.state.refreshing}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              tintColor="#C21E2B"
              colors={['#C21E2B']}
              onRefresh={() => this.getNewsFollow(this.item.slug)}
            />
          }
          onEndReached={() => this.loadMoreNewsFollow(this.item.slug)}
          onEndReachedThreshold={0.2}
          onMomentumScrollBegin={() => {
            this.onEndReachedCalledDuringMomentum = true;
          }}
        />
        {Object.keys(this.props.user.data).length !== 0 ? (
          <ModalReport
            visible={visible}
            onRef={(ref) => {
              this.modal = ref;
            }}
            onClose={this.onCloseModal}
            onAccept={async (dataReport) => {
              if (dataReport.length > 0) {
                const result = await reportPost(idPostReport, dataReport);
                console.log(result, idPostReport, dataReport);

                if (result.status === 200) {
                  if (Platform.OS === 'android') {
                    ToastAndroid.show('Báo cáo thành công', ToastAndroid.SHORT);
                  }
                  this.onDeletePost();
                }
                this.modal.close();
              }
            }}
            onShow={() => this.modal.open()}
            reportTitle={reportTitle}
            reportImage={reportImage}
            id={idPostReport}
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

Source.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    getParam: PropTypes.func,
  }).isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  user: state.saveUserReducers,
});

export default connect(
  mapStateToProps,
  null,
)(Source);
