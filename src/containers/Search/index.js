import React, { Component } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  FlatList,
  ActivityIndicator,
  Platform,
  ToastAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import styles from './styles';
import NewsItems from '../News/NewsItems';
import { searchPost, reportPost } from '../../services/newsAPI';
import * as d from '../../utilities/transform';
import { Fonts } from '../../constants';
import ModalReport from '../News/ModalReport';
import ModalLogIn from '../NewsDetail/ModalLogIn';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
      data: [],
      searched: false,
      loading: false,
      visible: false,
      reportTitle: '',
      reportImage: '',
      id: '',
    };
  }

  onDeletePost = () => {
    const { id, data } = this.state;
    const index = data.findIndex(item => item._source.id === id);
    if (index !== -1) {
      data.splice(index, 1);
      this.setState({ data });
    }
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

  _onSearch = () => {
    this.setState({ loading: true, searched: false });
    this._textInput.blur();

    searchPost(this.state.keyword, 1, this.props.user.data.id).then((res) => {
      console.log('_onSearch', res);
      if (res.status === 200) {
        this.setState({ data: res.data, loading: false, searched: true });
      }
    });
  };

  _renderItem = ({ item }) => {
    console.log(item);
    // const news = item._source;
    return (
      <NewsItems
        item={{ ...item._source, post_like: [], post_image: [] }}
        keyword={this.state.keyword}
        onReport={() =>
          this.onOpenModalReport(item._source.title, item._source.image, item._source.id)
        }
      />
    );
  };

  renderLeftIcon = () => <Icon name="ios-arrow-back-outline" size={30 * d.ratioW} />;
  render() {
    const {
      keyword, data, loading, searched, visible, id, reportTitle, reportImage,
    } = this.state;
    console.log('this.render, ', data);

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
          marginTop: Platform.OS === 'ios' ? 22 * d.ratioH : null,
        }}
      >
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={{ flex: 1, alignItems: 'center' }}
            onPress={() => this.props.navigation.goBack()}
          >
            <Icon name="ios-arrow-back-outline" size={30 * d.ratioW} />
          </TouchableOpacity>
          <View style={styles.centerHeader}>
            <View style={styles.textInputContainer}>
              <Icon name="ios-search" size={20 * d.ratioW} style={{ margin: 5 }} />
              <TextInput
                ref={ref => (this._textInput = ref)}
                value={keyword}
                style={styles.textInput}
                placeholder="Nhập từ khóa"
                underlineColorAndroid="transparent"
                onChangeText={text => this.setState({ keyword: text })}
              />
              {keyword !== '' && (
                <Icon
                  name="ios-close-circle"
                  size={18 * d.ratioW}
                  style={{ margin: 5 }}
                  onPress={() => this.setState({ keyword: '' })}
                />
              )}
            </View>
          </View>
          <TouchableOpacity style={{ margin: 5 }} onPress={this._onSearch}>
            <Text style={{ fontFamily: Fonts.regular, fontSize: 16 * d.ratioW }}>Tìm kiếm</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1 }}>
          {loading && <ActivityIndicator size="large" color="#C21E2B" />}
          <FlatList
            data={data}
            extraData={this.state}
            renderItem={this._renderItem}
            keyExtractor={(item) => item._id}
          />
          {searched &&
            data.length === 0 && (
              <View style={{ flex: 1, alignItems: 'center' }}>
                <Text>Không tìm thấy bài viết nào</Text>
              </View>
            )}
        </View>
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

const mapStateToProps = state => ({
  user: state.saveUserReducers,
});

export default connect(
  mapStateToProps,
  null,
)(Search);
